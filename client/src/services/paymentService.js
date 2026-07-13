import api from "./api/api";

export const createOrder = async (payload) => {   
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