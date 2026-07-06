import axios from "axios";

const API = "http://localhost:5000/api";

export const getTickets = async (params) => {
  const { data } = await axios.get(`${API}/tickets`, {
    params,
    withCredentials: true,
  });

  return data; // ✅ Return the full response
};

export const getTicketById = async (id) => {
  const { data } = await axios.get(`${API}/tickets/${id}`, {
    withCredentials: true,
  });
  return data.ticket;
};

export const createTicket = async (ticketData) => {
  const { data } = await axios.post(
    `${API}/tickets`,
    ticketData,
    {
      withCredentials: true,
    }
  );

  return data;
};

export const updateTicket = async (id, ticketData) => {
  const { data } = await axios.put(
    `${API}/tickets/${id}`,
    ticketData,
    {
      withCredentials: true,
    }
  );

  return data;
};

export const updateTicketStatus = async (id, status) => {
  const { data } = await axios.patch(
    `${API}/tickets/${id}/status`,
    { status },
    {
      withCredentials: true,
    }
  );

  return data;
};

export const deleteTicket = async (id) => {
  const { data } = await axios.delete(
    `${API}/tickets/${id}`,
    {
      withCredentials: true,
    }
  );

  return data;
};