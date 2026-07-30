import api from "@services/api/api";

export const getAllFeedback = () => {
	return api.get("/admin/feedback", {
		withCredentials: true,
	});
};

export const reviewFeedback = (id) => {
	return api.put(`/admin/feedback/${id}/review`, {}, {
		withCredentials: true,
	});
};

export const deleteFeedback = (id) => {
	return api.delete(`/admin/feedback/${id}`, {
		withCredentials: true,
	});
};
