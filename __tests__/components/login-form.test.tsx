import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { LoginForm } from "../../src/components/login-form";

jest.mock("../../src/components/secure-word", () => {
  return ({ auth }: { auth: any }) => {
    return <div>SecureWord:{auth?.username}</div>;
  };
});

jest.mock("../../src/components/password-form", () => {
  return ({ auth }: { auth: any }) => {
    return <div>PasswordForm</div>;
  };
});

describe("LoginForm", () => {
  beforeEach(() => {
    (global as any).fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("renders form controls", () => {
    render(<LoginForm />);
    expect(screen.getByLabelText("Name")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /submit/i })).toBeInTheDocument();
  });

  it("shows secure word on successful submit", async () => {
    const mockAuth = {
      issuedAt: Date.now(),
      username: "testuser",
      secureWord: "token",
    };
    (global as any).fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockAuth,
    });

    render(<LoginForm />);

    fireEvent.change(screen.getByLabelText("Name"), {
      target: { value: "testuser" },
    });
    fireEvent.click(screen.getByRole("button", { name: /submit/i }));

    expect(await screen.findByText("SecureWord:testuser")).toBeInTheDocument();
  });

  it("displays server error message when response is not ok", async () => {
    (global as any).fetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ message: "User not found" }),
    });

    render(<LoginForm />);

    fireEvent.change(screen.getByLabelText("Name"), {
      target: { value: "unknown" },
    });
    fireEvent.click(screen.getByRole("button", { name: /submit/i }));

    expect(await screen.findByText("User not found")).toBeInTheDocument();
  });

  it("displays network error message on fetch rejection", async () => {
    (global as any).fetch.mockRejectedValueOnce(new Error("Network failure"));

    render(<LoginForm />);

    fireEvent.change(screen.getByLabelText("Name"), {
      target: { value: "any" },
    });
    fireEvent.click(screen.getByRole("button", { name: /submit/i }));

    expect(await screen.findByText(/Network failure/)).toBeInTheDocument();
  });
});
