import { useEffect, useState } from "react";

import adminReportService from "@services/admin/adminReportService";

import ReportToolbar from "./ReportToolbar";
import PaymentFilters from "./PaymentFilters";
import PaymentReportTable from "./PaymentReportTable";
import Pagination from "@/utils/pagination";

import {
  exportPaymentToExcel,
  exportPaymentToPDF,
} from "@/utils/reportExports";

const DEFAULT_FILTERS = {
  search: "",
  paymentStatus: "",
  fromDate: "",
  toDate: "",
  page: 1,
  limit: 10,
  sortBy: "updatedAt",
  sortOrder: "desc",
};

const PaymentTab = () => {
  const [payments, setPayments] = useState([]);
  const [pagination, setPagination] = useState({});
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPayments();
  }, [filters]);

  const fetchPayments = async () => {
    try {
      setLoading(true);

      const response =
        await adminReportService.getPaymentReport(filters);

      setPayments(response.data?.payments || []);
      setPagination(response.data?.pagination || {});
    } catch (error) {
      console.error(error);
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
        prev.sortBy === sortBy &&
        prev.sortOrder === "asc"
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
        onSearch={(value) =>
          updateFilters({ search: value })
        }
        onExcelExport={() =>
          exportPaymentToExcel(payments)
        }
        onPdfExport={() =>
          exportPaymentToPDF(payments)
        }
      />

      <PaymentFilters
        filters={filters}
        onChange={updateFilters}
      />

      <PaymentReportTable
        payments={payments}
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

export default PaymentTab;