import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    notifications: [],
    notification: null,
    stats: {
        total: 0,
        draft: 0,
        scheduled: 0,
        sent: 0,
        failed: 0,
        cancelled: 0,
    },
    loading: false,
    error: null,

    pagination: {
        total: 0,
        page: 1,
        limit: 10,
        totalPages: 1,
    },
};

const notificationSlice = createSlice({
    name: "notification",

    initialState,

    reducers: {
        setLoading(state, action) {
            state.loading = action.payload;
        },

        setNotifications(state, action) {
            state.notifications = action.payload.notifications;
            state.pagination = action.payload.pagination;
            state.error = null;
        },

        setNotification(state, action) {
            state.notification = action.payload;
            state.error = null;
        },

        setStats(state, action) {
            state.stats = action.payload;
            state.error = null;
        },

        setError(state, action) {
            state.error = action.payload;
            state.loading = false;
        },

        clearNotification(state) {
            state.notification = null;
        },

        clearError(state) {
            state.error = null;
        },
    },
});

export const {
    setLoading,
    setNotifications,
    setNotification,
    setStats,
    setError,
    clearNotification,
    clearError,
} = notificationSlice.actions;

export default notificationSlice.reducer;