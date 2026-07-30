import api from "@services/api/api";

const API = "/admin/reports";

class AdminReportService {
	async getSummary(filters = {}) {
		const response = await api.get(`${API}/summary`, {
			params: filters,
		});

		return response.data;
	}

	async getRevenueReport(filters = {}) {
		const response = await api.get(`${API}/revenue`, {
			params: filters,
		});

		return response.data;
	}

	async getBookingReport(filters = {}) {
		const response = await api.get(`${API}/bookings`, {
			params: filters,
		});

		return response.data;
	}

	async getPaymentReport(filters = {}) {
		const response = await api.get(`${API}/payments`, {
			params: filters,
		});

		return response.data;
	}

	async getAnalyticsDashboard(filters = {}) {
		const response = await api.get(`${API}/analytics`, {
			params: filters,
		});

		return response.data;
	}
}

export default new AdminReportService();
