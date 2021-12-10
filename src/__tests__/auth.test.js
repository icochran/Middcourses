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
  // test the other case in CardGrid.test.js

  test("Secured login displays NavBar", async()=>{
    useSession.mockReturnValue([{user: {name:"someone"}}, false]);
    render(<SecureItem />);
    fetchMock.flush(true);
    expect(screen.getAllByTestId("navBar").length === 1).toBeTruthy();
  });

  test("Insecure access is denied", async ()=>{
    useSession.mockReturnValue([undefined , false]);
    render(<SecureItem />);
    fetchMock.flush(false);

    expect(screen.getByText("You are not logged in")).toBeInTheDocument();

  });
})