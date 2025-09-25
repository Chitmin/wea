import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import HamburgerMenu from "../../src/components/hamburger-menu";
import "@testing-library/jest-dom";

jest.mock("next/link", () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => {
    return <a href={href}>{children}</a>;
  };
});

describe("HamburgerMenu", () => {
  const items = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
  ];

  it("renders without crashing", () => {
    render(<HamburgerMenu items={items} />);
  });

  it("renders menu items", async () => {
    render(<HamburgerMenu items={items} />);
    const openMenuButton = screen.getByRole("button", { name: /Open menu/i });

    // Click the button to open the sheet
    fireEvent.click(openMenuButton);

    expect(await screen.findByText("Home")).toBeInTheDocument();
    expect(await screen.findByText("About")).toBeInTheDocument();
  });
});
