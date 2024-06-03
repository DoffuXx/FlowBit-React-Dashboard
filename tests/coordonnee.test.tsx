/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { fetchCoordonnee, updateCoordonne } from "../src/api/coordonnee";

// Mock the API calls
jest.mock("../src/api/coordonnee", () => ({
  fetchCoordonnee: jest.fn(),
  updateCoordonne: jest.fn(),
}));

describe("ContactDetailes Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the loading component initially", async () => {
    (fetchCoordonnee as jest.Mock).mockImplementation(
      (_setCoordonnee: any, setLoading: any, _setError: any) => {
        setLoading(true);
      },
    );

    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  });

  it("renders fetched data", async () => {
    const mockData = {
      numero: "1234567890",
      email: "test@example.com",
      localisation: "123 Test St",
      facebook: "testfacebook",
      instagram: "testinstagram",
      twitter: "testtwitter",
    };

    (fetchCoordonnee as jest.Mock).mockImplementation(
      (setCoordonnee: any, setLoading: any, _setError: any) => {
        setCoordonnee(mockData);
        setLoading(false);
      },
    );

    await waitFor(() =>
      expect(screen.getByDisplayValue("1234567890")).toBeInTheDocument(),
    );
    expect(screen.getByDisplayValue("test@example.com")).toBeInTheDocument();
    expect(screen.getByDisplayValue("123 Test St")).toBeInTheDocument();
    expect(screen.getByDisplayValue("testfacebook")).toBeInTheDocument();
    expect(screen.getByDisplayValue("testinstagram")).toBeInTheDocument();
    expect(screen.getByDisplayValue("testtwitter")).toBeInTheDocument();
  });

  it("shows error when fields are empty on submit", async () => {
    fireEvent.click(screen.getByText(/Modifier/i));

    await waitFor(() =>
      expect(
        screen.getByText(/Veuillez remplir tous les champs/i),
      ).toBeInTheDocument(),
    );
  });

  it("calls updateCoordonne with correct data", async () => {
    const mockData = {
      numero: "1234567890",
      email: "test@example.com",
      localisation: "123 Test St",
      facebook: "testfacebook",
      instagram: "testinstagram",
      twitter: "testtwitter",
    };

    (fetchCoordonnee as jest.Mock).mockImplementation(
      (setCoordonnee: any, setLoading: any, _setError: any) => {
        setCoordonnee(mockData);
        setLoading(false);
      },
    );

    await waitFor(() =>
      expect(screen.getByDisplayValue("1234567890")).toBeInTheDocument(),
    );

    fireEvent.change(screen.getByLabelText(/Numéro de téléphone/i), {
      target: { value: "0987654321" },
    });
    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: "updated@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/Localisation/i), {
      target: { value: "456 Updated St" },
    });
    fireEvent.change(screen.getByLabelText(/Facebook/i), {
      target: { value: "updatedfacebook" },
    });
    fireEvent.change(screen.getByLabelText(/Instagram/i), {
      target: { value: "updatedinstagram" },
    });
    fireEvent.change(screen.getByLabelText(/Twitter/i), {
      target: { value: "updatedtwitter" },
    });

    fireEvent.click(screen.getByText(/Modifier/i));

    await waitFor(() =>
      expect(updateCoordonne).toHaveBeenCalledWith({
        numero: "0987654321",
        email: "updated@example.com",
        localisation: "456 Updated St",
        facebook: "updatedfacebook",
        instagram: "updatedinstagram",
        twitter: "updatedtwitter",
      }),
    );
  });

  it("displays success message on successful update", async () => {
    const mockData = {
      numero: "1234567890",
      email: "test@example.com",
      localisation: "123 Test St",
      facebook: "testfacebook",
      instagram: "testinstagram",
      twitter: "testtwitter",
    };

    (fetchCoordonnee as jest.Mock).mockImplementation(
      (setCoordonnee: any, setLoading: any, _setError: any) => {
        setCoordonnee(mockData);
        setLoading(false);
      },
    );

    await waitFor(() =>
      expect(screen.getByDisplayValue("1234567890")).toBeInTheDocument(),
    );

    fireEvent.change(screen.getByLabelText(/Numéro de téléphone/i), {
      target: { value: "0987654321" },
    });
    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: "updated@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/Localisation/i), {
      target: { value: "456 Updated St" },
    });
    fireEvent.change(screen.getByLabelText(/Facebook/i), {
      target: { value: "updatedfacebook" },
    });
    fireEvent.change(screen.getByLabelText(/Instagram/i), {
      target: { value: "updatedinstagram" },
    });
    fireEvent.change(screen.getByLabelText(/Twitter/i), {
      target: { value: "updatedtwitter" },
    });

    fireEvent.click(screen.getByText(/Modifier/i));

    await waitFor(() =>
      expect(updateCoordonne).toHaveBeenCalledWith({
        numero: "0987654321",
        email: "updated@example.com",
        localisation: "456 Updated St",
        facebook: "updatedfacebook",
        instagram: "updatedinstagram",
        twitter: "updatedtwitter",
      }),
    );
  });

  it("displays success message on successful update", async () => {
    const mockData = {
      numero: "1234567890",
      email: "test@example.com",
      localisation: "123 Test St",
      facebook: "testfacebook",
      instagram: "testinstagram",
      twitter: "testtwitter",
    };

    (fetchCoordonnee as jest.Mock).mockImplementation(
      (setCoordonnee: any, setLoading: any, _setError: any) => {
        setCoordonnee(mockData);
        setLoading(false);
      },
    );

    await waitFor(() =>
      expect(screen.getByDisplayValue("1234567890")).toBeInTheDocument(),
    );

    fireEvent.click(screen.getByText(/Modifier/i));

    await waitFor(() =>
      expect(
        screen.getByText(/Coordonnée modifié avec succès/i),
      ).toBeInTheDocument(),
    );
  });
});
