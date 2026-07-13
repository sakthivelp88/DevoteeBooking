import api from "./api/api";

export const getAllFeedback = () => {
    return api.get("/feedback/admin", {
        withCredentials: true,
    });
};

export const reviewFeedback = (id) => {
    return api.put(`/feedback/admin/${id}/review`, {}, {
        withCredentials: true,
    });
};

export const deleteFeedback = (id) => {
    return api.delete(`/feedback/admin/${id}`, {
        withCredentials: true,
    });
};