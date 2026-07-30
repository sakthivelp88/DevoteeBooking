import { useEffect, useState } from "react";

import adminReportService from "@/features/admin/services/adminReportService";

import SummaryCards from "./SummaryCards";
import MonthlyRevenueChart from "./MonthlyRevenueChart";
import PaymentStatusPieChart from "./PaymentStatusPieChart";
import TopTemplesChart from "./TopTemplesChart";

const AnalyticsDashboard = () => {
    const [analytics, setAnalytics] = useState({
        summary: {},
        monthlyRevenue: [],
        paymentStatus: [],
        topTemples: [],
    });

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchAnalytics();
    }, []);

    const fetchAnalytics = async () => {
        try {
            setLoading(true);

            const response = await adminReportService.getAnalyticsDashboard();

            setAnalytics(response?.data || {
                summary: {},
                monthlyRevenue: [],
                paymentStatus: [],
                topTemples: [],
            });
        } catch (error) {
            console.error("Failed to fetch analytics:", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="py-10 text-center text-gray-500">
                Loading analytics...
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <SummaryCards summary={analytics.summary} />

            <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
                <MonthlyRevenueChart data={analytics.monthlyRevenue} />
                <PaymentStatusPieChart data={analytics.paymentStatus} />
            </div>

            <TopTemplesChart data={analytics.topTemples} />
        </div>
    );
};

export default AnalyticsDashboard;