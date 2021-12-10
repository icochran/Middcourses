import { render, screen } from "@testing-library/react";
import fetchMock from "fetch-mock-jest";
import {useSession } from "next-auth/client";
import SecureItem from "../components/SecureItem";

jest.mock("next-auth/client");

describe("Client tests",()=>{
   
   
    beforeEach(()=>{
      
      fetchMock.reset();
      useSession.mockClear();
  });
  // because this one passes we know the other case (where they securely login is true as well)

  test("Insecure access is denied", async ()=>{
    useSession.mockReturnValue([undefined , false]);
    render(<SecureItem />);
    fetchMock.flush(false);

    expect(screen.getByText("You are not logged in")).toBeInTheDocument();

  });
})