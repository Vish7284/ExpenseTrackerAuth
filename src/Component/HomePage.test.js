import HomePage from "./HomePage";
import { render, screen } from "@testing-library/react";

describe("serching tests",()=>{

    test("searching welcome text", () => {
        render(<HomePage/>);
        const welcomeText = screen.getByText("Welcome to the Home page",{exact:false});
        expect(welcomeText).toBeInTheDocument();
    });
})
