import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import CommandPalette from "./CommandPalette";

const openPalette = () => fireEvent.keyDown(window, { key: "k", ctrlKey: true });

describe("CommandPalette", () => {
  it("is closed until Ctrl/Cmd+K is pressed", () => {
    render(<CommandPalette />);
    expect(screen.queryByPlaceholderText(/type a command/i)).toBeNull();
    openPalette();
    expect(screen.getByPlaceholderText(/type a command/i)).toBeInTheDocument();
  });

  it("filters commands as you type and shows an empty state", () => {
    render(<CommandPalette />);
    openPalette();
    const input = screen.getByPlaceholderText(/type a command/i);

    fireEvent.change(input, { target: { value: "leetcode" } });
    expect(screen.getByText("View LeetCode Profile")).toBeInTheDocument();
    expect(screen.queryByText("View GitHub")).toBeNull();

    fireEvent.change(input, { target: { value: "zzzz" } });
    expect(screen.getByText(/no results found/i)).toBeInTheDocument();
  });

  it("closes on Escape", async () => {
    render(<CommandPalette />);
    openPalette();
    expect(screen.getByPlaceholderText(/type a command/i)).toBeInTheDocument();
    fireEvent.keyDown(window, { key: "Escape" });
    await waitFor(() => expect(screen.queryByPlaceholderText(/type a command/i)).toBeNull());
  });
});
