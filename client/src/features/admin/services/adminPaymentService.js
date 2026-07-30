import api from "@services/api/api"

const API = "/admin/payments";

export const getPayments = async (params = {}) => {
	const response = await api.get(API, {
		params,
		withCredentials: true,
	});

	return response.data;
};

export const getPaymentById = async (id) => {
	const response = await api.get(`${API}/${id}`, {
		withCredentials: true,
	});

	return response.data;
};

export const updatePayment = async (id, data) => {
	const response = await api.put(`${API}/${id}`, data, {
		withCredentials: true,
	});

	return response.data;
};
