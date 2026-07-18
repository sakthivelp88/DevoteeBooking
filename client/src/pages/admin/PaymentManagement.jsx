import { useEffect, useMemo, useState } from "react";

import PaymentCards from "@components/payment/PaymentCards";
import PaymentFilters from "@components/payment/PaymentFilters";
import PaymentTable from "@components/payment/PaymentTable";
import PaymentDetailsModal from "@components/payment/PaymentDetailsModal";
import PaymentReceiptModal from "@components/payment/PaymentReceiptModal";
import { exportPaymentsToExcel, exportPaymentsToPDF,} from "@/utils/paymentExport";
import { getPayments, getPaymentById,} from "@services/admin/adminPaymentService";
import { getPaymentStatistics } from "@/utils/paymentStatistics";

const PaymentManagement = () => {
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isReceiptOpen, setIsReceiptOpen] = useState(false);

    const [filters, setFilters] = useState({
        search: "",
        status: "All",
    });

    const [selectedPayment, setSelectedPayment] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [detailsLoading, setDetailsLoading] = useState(false);

    useEffect(() => {
        fetchPayments();
    }, []);

    const fetchPayments = async () => {
        try {
            setLoading(true);

            const data = await getPayments();

            setPayments(data.payments || []);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    // creating useMemo for PaymentStatistics.js
    const statistics = useMemo(
        () => getPaymentStatistics(payments),
        [payments]
    );

    const filteredPayments = useMemo(() => {
        return payments.filter((payment) => {
            const search = filters.search.toLowerCase();

            const matchesSearch =
                payment.bookingNumber?.toLowerCase().includes(search) ||
                payment.paymentId?.toLowerCase().includes(search) ||
                payment.devoteeName?.toLowerCase().includes(search);

            const matchesStatus =
                filters.status === "All" ||
                payment.status === filters.status;

            return matchesSearch && matchesStatus;
        });
    }, [payments, filters]);

    const handleViewDetails = async (paymentId) => {
        try {
            setDetailsLoading(true);

            const { payment } = await getPaymentById(paymentId);

            setSelectedPayment(payment);
            setIsModalOpen(true);
        } catch (error) {
            console.error(error);
        } finally {
            setDetailsLoading(false);
        }
    };

    const closeModal = () => {
        setSelectedPayment(null);
        setIsModalOpen(false);
    };

    return (
        <div className="space-y-6">
            <PaymentCards statistics={statistics} />

            <PaymentFilters
                filters={filters}
                setFilters={setFilters}
                canExport={filteredPayments.length > 0}
                onExportExcel={() => exportPaymentsToExcel(filteredPayments)}
                onExportPDF={() => exportPaymentsToPDF(filteredPayments)}
            />

            <PaymentTable
                payments={filteredPayments}
                loading={loading}
                onView={handleViewDetails}
            />

            <PaymentDetailsModal
                isOpen={isModalOpen}
                payment={selectedPayment}
                loading={detailsLoading}
                onClose={closeModal}
                onViewReceipt={() => setIsReceiptOpen(true)}
            />

            <PaymentReceiptModal
                isOpen={isReceiptOpen}
                payment={selectedPayment}
                onClose={() => setIsReceiptOpen(false)}
            />
        </div>
    );
};

export default PaymentManagement;