import "@testing-library/jest-dom/vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import BloodRequestCard from "./BloodRequestCard";
import DonorCard from "./DonorCard";
import Hero from "./Hero";
import Navbar from "./Navbar";

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

describe("Navbar", () => {
  it("provides links to the main page sections", () => {
    render(<Navbar />);

    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute(
      "href",
      "#home"
    );
    expect(
      screen.getByRole("link", { name: "Blood Requests" })
    ).toHaveAttribute("href", "#requests");
  });
});

describe("Hero", () => {
  it("introduces the service and links to donors", () => {
    render(<Hero />);

    expect(
      screen.getByRole("heading", { name: /Find Blood\.\s*Save Lives\./ })
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Find a Donor" })).toHaveAttribute(
      "href",
      "#donors"
    );
  });
});

describe("DonorCard", () => {
  it("shows donor details and an initial avatar", () => {
    render(
      <DonorCard
        name="Asha Rao"
        bloodGroup="O+"
        location="Bengaluru"
      />
    );

    expect(screen.getByRole("heading", { name: "Asha Rao" })).toBeInTheDocument();
    expect(screen.getByText("A", { selector: ".donor-avatar" })).toBeInTheDocument();
    expect(screen.getByText("O+")).toBeInTheDocument();
    expect(screen.getByText("Bengaluru")).toBeInTheDocument();
  });

  it("prompts to contact the selected donor", () => {
    const alertSpy = vi.spyOn(window, "alert").mockImplementation(() => {});
    render(<DonorCard name="Asha Rao" bloodGroup="O+" location="Bengaluru" />);

    fireEvent.click(screen.getByRole("button", { name: "Contact Donor" }));

    expect(alertSpy).toHaveBeenCalledWith("Contacting Asha Rao");
  });
});

describe("BloodRequestCard", () => {
  it("highlights emergency requests", () => {
    render(
      <BloodRequestCard
        bloodGroup="AB-"
        hospital="City Hospital"
        urgency="Emergency"
      />
    );

    expect(screen.getByText("Emergency")).toHaveClass("urgency", "emergency");
    expect(screen.getByText("AB-")).toBeInTheDocument();
    expect(screen.getByText("City Hospital")).toBeInTheDocument();
  });

  it("uses the high-priority style for non-emergency requests", () => {
    render(
      <BloodRequestCard
        bloodGroup="B+"
        hospital="General Hospital"
        urgency="High"
      />
    );

    expect(screen.getByText("High")).toHaveClass("urgency", "high");
  });
});
