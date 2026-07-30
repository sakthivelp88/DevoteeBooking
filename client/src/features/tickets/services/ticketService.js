import api from "@/services/api/api";

export const getTickets = async (params) => {
	const { data } = await api.get(`/tickets`, {
		params,
		withCredentials: true,
	});

	return data; // Return the full response
};

export const getTicketById = async (id) => {
	const { data } = await api.get(`/tickets/${id}`, {
		withCredentials: true,
	});
	return data.ticket;
};

export const createTicket = async (ticketData) => {
	const { data } = await api.post(
		`/tickets`,
		ticketData,
		{
			withCredentials: true,
		}
	);

	return data;
};

export const updateTicket = async (id, ticketData) => {
	const { data } = await api.put(
		`/tickets/${id}`,
		ticketData,
		{
			withCredentials: true,
		}
	);

	return data;
};

export const updateTicketStatus = async (id, status) => {
	const { data } = await api.patch(
		`/tickets/${id}/status`,
		{ status },
		{
			withCredentials: true,
		}
	);

	return data;
};

export const deleteTicket = async (id) => {
	const { data } = await api.delete(
		`/tickets/${id}`,
		{
			withCredentials: true,
		}
	);

	return data;
};
