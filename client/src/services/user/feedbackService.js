import api from "@/services/api/api";

export const submitFeedback = (data) => {
  return api.post("/feedback", data, {
    withCredentials: true,
  });
};