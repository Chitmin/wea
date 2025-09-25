import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";

const pushMock = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: pushMock }),
}));

jest.mock("crypto-js", () => ({
  SHA256: (input: string) => ({ toString: () => `hashed-${input}` }),
}));

import PasswordForm from "../../src/components/password-form";

describe("PasswordForm", () => {
  const auth = {
    issuedAt: Date.now(),
    username: "testuser",
    secureWord: "token",
  };

  beforeEach(() => {
    (global as any).fetch = jest.fn();
    pushMock.mockClear();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("renders form controls", () => {
    render(<PasswordForm auth={auth} />);
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
  });

  it("submits and navigates on success", async () => {
    (global as any).fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({}),
    });

    render(<PasswordForm auth={auth} />);

    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "mypassword" },
    });

    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() =>
      expect((global as any).fetch).toHaveBeenCalledWith(
        "/api/login",
        expect.objectContaining({
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: auth.username,
            hashedPassword: "hashed-mypassword",
            secureWord: auth.secureWord,
          }),
        })
      )
    );

    await waitFor(() =>
      expect(pushMock).toHaveBeenCalledWith(`/mfa?username=${auth.username}`)
    );
  });

  it("displays server error message when response is not ok", async () => {
    (global as any).fetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ message: "Invalid credentials" }),
    });

    render(<PasswordForm auth={auth} />);

    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "bad" },
    });
    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    expect(await screen.findByText("Invalid credentials")).toBeInTheDocument();
    expect(pushMock).not.toHaveBeenCalled();
  });

  it("displays network error message on fetch rejection", async () => {
    (global as any).fetch.mockRejectedValueOnce(new Error("Network failure"));

    render(<PasswordForm auth={auth} />);

    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "any" },
    });
    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    expect(await screen.findByText(/Network failure/)).toBeInTheDocument();
    expect(pushMock).not.toHaveBeenCalled();
  });
});
