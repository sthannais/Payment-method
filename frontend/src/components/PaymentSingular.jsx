import { useParams } from "react-router-dom";
import { getPaymentMethods } from "../helper/getPaymentMethods";
import { useEffect, useState } from "react";
import "../styles/PaymentSingular.css";

const PaymentSingular = () => {
  const { id } = useParams();
  const [getPayment, setGetPayment] = useState("");
  console.log(getPayment);

  //Funcion que devuelve un unico elemento a partir del ID.
  const dataPayment = async () => {
    let dataPaymentSingular = await getPaymentMethods();
    const result = dataPaymentSingular.find((data) => data.id === parseInt(id));
    setGetPayment(result);
  };

  useEffect(() => {
    dataPayment();
  }, []);

  return (
    <>
      <h1 className="text-center container mt-4">Card Data</h1>
      {getPayment && (
        <ul className="bg-light datasCard">
          <h6 className="pt-4">Brand:</h6>
          <li className="list-group-item item1">{getPayment.brand}</li>
          <h6>Created At:</h6>
          <li className="list-group-item item2">{getPayment.created_at}</li>
          <h6>Last:</h6>
          <li className="list-group-item item3">{getPayment.last4}</li>
          <h6>Type:</h6>
          <li className="list-group-item item4">{getPayment.type}</li>
        </ul>
      )}
    </>
  );
};

export default PaymentSingular;
