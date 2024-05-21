import { render, screen } from "@testing-library/react";
import MainHeader from "../components/Layout/MainHeader";
import Counter from "../components/Counter";
import Header from "../components/Header";
import UserProfile from "../components/UserProfile";
import userEvent from "@testing-library/user-event";

describe("Task tests--", () => {
  test("Check ReduxCart --", () => {
    render(<MainHeader />);
    const mainHeaderText = screen.getByText("ReduxCart", { exact: false });
    expect(mainHeaderText).toBeInTheDocument();
  });
  test("check IncreaseBY5", () => {
    render(<Counter />);
    const counterText = screen.getByText("Increment", { exact: false });
    expect(counterText).toBeInTheDocument();
  });
  test("MyProdect", () => {
    render(<Header />);
    const headerText = screen.getByText("My Account");
    expect(headerText).toBeInTheDocument();
  });
  test("profile", () => {
    render(<UserProfile />);
    const userText = screen.getByText(/'My user Profile'/);
    expect(userText).toBeInTheDocument();
  });

  test("render cartButton to be click",()=>{
    render(<Header/>);
    const buttonElement = screen.getByRole("button");
    userEvent.click(buttonElement);
    const buttonclick = screen.getByText("ReduxAuth",{exact:false});
    expect(buttonclick).toBeInTheDocument();
  })
});
