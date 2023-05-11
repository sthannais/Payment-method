export const getPaymentMethods = async () => {
  let result = await fetch("http://localhost:3000/payment_methods");
  const data = await result.json();
  return data.data;
};
