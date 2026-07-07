import api from "./api";

export const createOrder = async (payload) => {
   console.log("paymentService payload:", payload);
  const { data } = await api.post(
    "/payment/create-order",
    payload
  );

  return data;
};

export const verifyPayment = async (payload) => {
  const { data } = await api.post(
    "/payment/verify",
    payload
  );

  return data;
};