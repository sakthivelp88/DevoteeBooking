import axios from "axios";

const API =
  "http://localhost:5000/api/payment";

export const createOrder = async (
  ticketId,
  quantity
) => {
  const response = await axios.post(
    `${API}/create-order`,
    {
      ticketId,
      quantity,
    },
    {
      withCredentials: true,
    }
  );

  return response.data;
};

export const verifyPayment = async (
  paymentData
) => {
  const response = await axios.post(
    `${API}/verify`,
    paymentData,
    {
      withCredentials: true,
    }
  );

  return response.data;
};