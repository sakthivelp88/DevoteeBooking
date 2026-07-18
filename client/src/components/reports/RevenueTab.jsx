import { useEffect, useState } from "react";

import adminReportService from "@services/admin/adminReportService";

import ReportToolbar from "./ReportToolbar";
import RevenueFilters from "./RevenueFilters";
import RevenueReportTable from "./RevenueReportTable";
import Pagination from "@/utils/pagination";

import {
  exportRevenueToExcel,
  exportRevenueToPDF,
} from "@/utils/reportExports";

const DEFAULT_FILTERS = {
  search: "",
  paymentStatus: "",
  fromDate: "",
  toDate: "",
  page: 1,
  limit: 10,
  sortBy: "createdAt",
  sortOrder: "desc",
};

const RevenueTab = () => {
  const [revenue, setRevenue] = useState([]);
  const [pagination, setPagination] = useState({});
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchRevenue();
  }, [filters]);

  const fetchRevenue = async () => {
    try {
      setLoading(true);

      const response = await adminReportService.getRevenueReport(filters);

      setRevenue(response.data?.revenue || []);
      setPagination(response.data?.pagination || {});
    } catch (error) {
      console.error("Failed to fetch revenue report:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateFilters = (values) => {
    setFilters((prev) => ({
      ...prev,
      ...values,
      page: 1,
    }));
  };

  const handleSort = (sortBy) => {
    setFilters((prev) => ({
      ...prev,
      sortBy,
      sortOrder:
        prev.sortBy === sortBy && prev.sortOrder === "asc"
          ? "desc"
          : "asc",
    }));
  };

  const handlePageChange = (page) => {
    setFilters((prev) => ({
      ...prev,
      page,
    }));
  };

  return (
    <div className="space-y-6">
      <ReportToolbar
        searchTerm={filters.search}
        onSearch={(value) => updateFilters({ search: value })}
        onExcelExport={() => exportRevenueToExcel(revenue)}
        onPdfExport={() => exportRevenueToPDF(revenue)}
      />

      <RevenueFilters
        filters={filters}
        onChange={updateFilters}
      />

      <RevenueReportTable
        data={revenue}
        loading={loading}
        sortBy={filters.sortBy}
        sortOrder={filters.sortOrder}
        onSort={handleSort}
      />

      <Pagination
        pagination={pagination}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default RevenueTab;