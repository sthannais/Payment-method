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

import { React, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { saveAs } from "file-saver";
import Papa from "papaparse";
import { getPaymentMethods } from "../helper/getPaymentMethods";
import "../styles/PaymentMethod.css";

export const PaymentMethod = () => {
  const [paymentMethodsCount, setPaymentMethodsCount] = useState();
  const [paymentMethods, setpaymentMethods] = useState();
  const [isLoading, setIsLoading] = useState(0);
  const [type, setType] = useState(0);
  const [valueInput, setValueInput] = useState("");
  const [evenNumber, setEvenNumber] = useState("");

  const handleChange = (event) => {
    setValueInput(event.target.value);
    setType(event.target.value);
  };

  //Esta funcion filtra por medio del ID y obtiene el nuevo arreglo sin el mismo.
  const handleClickDelete = (id) => {
    const filter = paymentMethods.filter((data) => data.id !== parseInt(id));
    setpaymentMethods(filter);
    setPaymentMethodsCount(filter.length);
    setEvenNumber(numberPar(filter));
  };

  const exportToCSV = (data, filename) => {
    // Convierte los datos a CSV
    const csv = Papa.unparse(data);

    // Crea un archivo Blob con el contenido CSV
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });

    // Guarda el archivo CSV en el dispositivo del usuario
    saveAs(blob, filename);
  };

  const handleExport = () => {
    const dataToExport = paymentMethods;

    exportToCSV(dataToExport, "my-data.csv");
  };

  //Funcion que filtra los ultimos 4 digitos que son par
  const numberPar = (filter) => {
    return filter.filter((data) => parseInt(data.last4) % 2 === 0);
  };

  //Funcion que invoca la API y trae los datos y filtra en el input el tipo de metodo de pago (debito o credito).
  const getPayment = async () => {
    let filter = await getPaymentMethods();
    filter = filter.filter((data) => data.type.includes(valueInput));
    const evenNUmber = numberPar(filter);
    console.log(evenNUmber, "chiqui");
    setEvenNumber(evenNUmber);
    setPaymentMethodsCount(filter.length);
    setpaymentMethods(filter);
    setIsLoading(1);
    setType(type);
    return filter;
  };

  useEffect(() => {
    setPaymentMethodsCount(0);
    getPayment("");
  }, [type]);

  return (
    <>
      <h1 className="titleContainer text-center">PAYMENT METHODS</h1>
      {isLoading && (
        <div className="container">
          <p className="text-center mt-4 pt-4">Total: {paymentMethodsCount}</p>
          <p className="text-center">
            Total ending in an even number: {evenNumber.length}{" "}
          </p>
          <div className="inputContainer">
            <input
              type="text"
              value={valueInput}
              onChange={handleChange}
            ></input>
            <button onClick={handleExport}>Exportar datos a CSV</button>
          </div>

          <hr />
          <ul className="list-group">
            {paymentMethods.map((element, i) => {
              return (
                <>
                  <ul key={i}>
                    <li className="list-group-item list">
                      <strong>Brand:</strong> {element.brand}. &nbsp;&nbsp;
                      <strong>Last:</strong>
                      {element.last4}. &nbsp;&nbsp; <strong>Created At:</strong>
                      {element.created_at}.
                    </li>
                    <div className="viewDelete">
                      <Link className="view" to={`view/${element.id}`}>
                        Ver
                      </Link>
                      &nbsp;&nbsp;
                      <Link
                        className="delete"
                        onClick={() => handleClickDelete(element.id)}
                      >
                        Eliminar
                      </Link>
                    </div>
                  </ul>
                </>
              );
            })}
          </ul>
        </div>
      )}
    </>
  );
};
