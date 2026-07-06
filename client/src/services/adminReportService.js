import api from "./api";

class AdminReportService {
    async getSummary(filters = {}) {
        const response = await api.get("/admin/reports/summary", {
            params: filters,
        });

        return response.data;
    }

    async getRevenueReport(filters = {}) {
        const response = await api.get("/admin/reports/revenue", {
            params: filters,
        });

        return response.data;
    }

    async getBookingReport(filters = {}) {
        const response = await api.get("/admin/reports/bookings", {
            params: filters,
        });

        return response.data;
    }

    async getPaymentReport(filters = {}) {
        const response = await api.get("/admin/reports/payments", {
            params: filters,
        });

        return response.data;
    }

    async getAnalyticsDashboard(filters = {}) {
        const response = await api.get("/admin/reports/analytics", {
            params: filters,
        });

        return response.data;
    }
}

export default new AdminReportService();