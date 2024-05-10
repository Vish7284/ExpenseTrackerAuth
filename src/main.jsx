import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom/cjs/react-router-dom.min.js";
import ExpenseContextProvider from "./store/ExpenseContextProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ExpenseContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ExpenseContextProvider>
  </React.StrictMode>
);
