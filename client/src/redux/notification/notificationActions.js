import {
    getAdminNotifications,
    getAdminNotificationById,
    createAdminNotification,
    updateAdminNotification,
    deleteAdminNotification,
    cancelAdminNotification,
    getAdminNotificationStats,
} from "@/features/admin/services/adminNotificationService";

import {
    setLoading,
    setNotifications,
    setNotification,
    setStats,
    setError,
} from "./notificationSlice";

// Get all notifications
export const fetchNotifications =
    (params = {}) =>
        async (dispatch) => {
            try {
                dispatch(setLoading(true));

                const data = await getAdminNotifications(params);

                dispatch(setNotifications(data));
            } catch (error) {
                dispatch(
                    setError(
                        error.response?.data?.message || error.message
                    )
                );
            } finally {
                dispatch(setLoading(false));
            }
        };

// Get notification by ID
export const fetchNotificationById =
    (id) =>
        async (dispatch) => {
            try {
                dispatch(setLoading(true));

                const data = await getAdminNotificationById(id);

                dispatch(setNotification(data.notification));
            } catch (error) {
                dispatch(
                    setError(
                        error.response?.data?.message || error.message
                    )
                );
            } finally {
                dispatch(setLoading(false));
            }
        };

// Create notification
export const addNotification =
    (payload) =>
        async (dispatch) => {
            try {
                dispatch(setLoading(true));

                const data = await createAdminNotification(payload);

                await dispatch(fetchNotifications());

                return data;
            } catch (error) {
                dispatch(
                    setError(
                        error.response?.data?.message || error.message
                    )
                );
                throw error;
            } finally {
                dispatch(setLoading(false));
            }
        };

// Update notification
export const editNotification =
    (id, payload) =>
        async (dispatch) => {
            try {
                dispatch(setLoading(true));

                const data = await updateAdminNotification(
                    id,
                    payload
                );

                await dispatch(fetchNotifications());

                return data;
            } catch (error) {
                dispatch(
                    setError(
                        error.response?.data?.message || error.message
                    )
                );
                throw error;
            } finally {
                dispatch(setLoading(false));
            }
        };

// Delete notification
export const removeNotification =
    (id) =>
        async (dispatch) => {
            try {
                dispatch(setLoading(true));

                const data = await deleteAdminNotification(id);

                await dispatch(fetchNotifications());

                return data;
            } catch (error) {
                dispatch(
                    setError(
                        error.response?.data?.message || error.message
                    )
                );
                throw error;
            } finally {
                dispatch(setLoading(false));
            }
        };

// Cancel notification
export const cancelNotification =
    (id) =>
        async (dispatch) => {
            try {
                dispatch(setLoading(true));

                const data = await cancelAdminNotification(id);

                await dispatch(fetchNotifications());

                return data;
            } catch (error) {
                dispatch(
                    setError(
                        error.response?.data?.message || error.message
                    )
                );
                throw error;
            } finally {
                dispatch(setLoading(false));
            }
        };

// Get statistics
export const fetchNotificationStats =
    () =>
        async (dispatch) => {
            try {
                const data = await getAdminNotificationStats();

                dispatch(setStats(data.stats));
            } catch (error) {
                dispatch(
                    setError(
                        error.response?.data?.message || error.message
                    )
                );
            }
        };