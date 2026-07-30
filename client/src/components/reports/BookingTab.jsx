import { useEffect, useState, useCallback } from "react";

import adminReportService from "@/features/admin/services/adminReportService";

import BookingFilters from "./BookingFilters";
import BookingReportTable from "./BookingReportTable";
import Pagination from "@/utils/pagination";

import ReportToolbar from "./ReportToolbar";
import {
  exportBookingToExcel,
  exportBookingToPDF,
} from "@/utils/reportExports";

const DEFAULT_FILTERS = {
  search: "",
  bookingStatus: "",
  paymentStatus: "",
  fromDate: "",
  toDate: "",
  page: 1,
  limit: 10,
  sortBy: "createdAt",
  sortOrder: "desc",
};

const BookingTab = () => {
  const [bookings, setBookings] = useState([]);
  const [pagination, setPagination] = useState({});
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);

        const response = await adminReportService.getBookingReport(filters);

        setBookings(response.data.bookings);
        setPagination(response.data.pagination);
      } catch (error) {
        console.error("Failed to load booking report:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [filters]);

  const updateFilters = (values) => {
    setFilters((prev) => ({
      ...prev,
      ...values,
      page: 1,
    }));
  };

  const handlePageChange = (page) => {
    setFilters((prev) => ({
      ...prev,
      page,
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

  return (
    <div className="space-y-6">
      <ReportToolbar
        searchTerm={filters.search}
        onSearch={(value) =>
          updateFilters({
            search: value,
          })
        }
        onExcelExport={() =>
          exportBookingToExcel(bookings)
        }
        onPdfExport={() =>
          exportBookingToPDF(bookings)
        }
      />

      <BookingFilters
        filters={filters}
        onChange={updateFilters}
      />     

      <BookingReportTable
        bookings={bookings}
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

export default BookingTab;