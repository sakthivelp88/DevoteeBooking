import axios from "axios";

const API = "http://localhost:5000/api/admin/payments";

export const getPayments = async (params = {}) => {
  const response = await axios.get(API, {
    params,
    withCredentials: true,
  });

  return response.data;
};

export const getPaymentById = async (id) => {
  const response = await axios.get(`${API}/${id}`, {
    withCredentials: true,
  });

  return response.data;
};

export const updatePayment = async (id, data) => {
  const response = await axios.put(`${API}/${id}`, data, {
    withCredentials: true,
  });

  return response.data;
};