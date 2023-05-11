/**
 * Instructions
 *
 * 1. Show a list of payment methods filtered by type "credit_card".
 * 2. Get the list data from the API when the component is rendered and refresh it automatically every 30 seconds.
 * 3. Show a loading component while getting the list data but only on the first pull.
 * 4. Show the total number of credit cards
 * 5. Show the total number of credit cards ending in an even number (check the "last4" attribute).
 * 6. Implement a button to delete a credit card
 */

import "./App.css";
import { React } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PaymentSingular from "./components/PaymentSingular";
import { PaymentMethod } from "./components/PaymentMethod";

const App = () => {
  return (
    <>
      <Router>
        <div className="mainContainer">
          <Routes>
            <Route path="/" element={<PaymentMethod></PaymentMethod>} />
            <Route
              path="/view/:id"
              element={<PaymentSingular></PaymentSingular>}
            />
          </Routes>
        </div>
      </Router>
    </>
  );
};

export default App;
