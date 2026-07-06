import PaymentStatusBadge from "./PaymentStatusBadge";

const PaymentReceiptModal = ({ isOpen, payment, onClose }) => {
    if (!isOpen || !payment) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="w-full max-w-2xl rounded-xl bg-white shadow-xl">

                <div className="border-b px-6 py-4">
                    <h2 className="text-2xl font-bold">
                        Payment Receipt
                    </h2>

                    <p className="text-sm text-gray-500">
                        Temple Darshan Booking System
                    </p>
                </div>

                <div className="space-y-6 p-6">

                    <div className="text-center">
                        <h3 className="text-xl font-semibold">
                            {payment.templeName}
                        </h3>

                        <PaymentStatusBadge
                            status={payment.status}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">

                        <ReceiptItem
                            label="Booking Number"
                            value={payment.bookingNumber}
                        />

                        <ReceiptItem
                            label="Devotee"
                            value={payment.devoteeName}
                        />

                        <ReceiptItem
                            label="Darshan Type"
                            value={payment.darshanType}
                        />

                        <ReceiptItem
                            label="Ticket Date"
                            value={
                                payment.ticketDate
                                    ? new Date(
                                          payment.ticketDate
                                      ).toLocaleDateString()
                                    : "-"
                            }
                        />

                        <ReceiptItem
                            label="Time Slot"
                            value={payment.ticketSlot}
                        />

                        <ReceiptItem
                            label="Quantity"
                            value={payment.quantity}
                        />

                        <ReceiptItem
                            label="Amount"
                            value={`₹${payment.amount}`}
                        />

                        <ReceiptItem
                            label="Payment Method"
                            value={payment.paymentMethod}
                        />

                        <ReceiptItem
                            label="Payment ID"
                            value={payment.paymentId}
                        />

                        <ReceiptItem
                            label="Order ID"
                            value={payment.orderId}
                        />

                        <ReceiptItem
                            label="Reference"
                            value={payment.reference}
                        />

                        <ReceiptItem
                            label="Payment Date"
                            value={
                                payment.paymentDate
                                    ? new Date(
                                          payment.paymentDate
                                      ).toLocaleString()
                                    : "-"
                            }
                        />

                    </div>

                    {payment.qrCode && (
                        <div className="flex justify-center">
                            <img
                                src={payment.qrCode}
                                alt="QR Code"
                                className="h-36 w-36"
                            />
                        </div>
                    )}
                </div>

                <div className="flex justify-end gap-3 border-t px-6 py-4">

                    <button
                        onClick={onClose}
                        className="rounded-lg border px-4 py-2"
                    >
                        Close
                    </button>

                    <button
                        onClick={() => window.print()}
                        className="rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
                    >
                        Print Receipt
                    </button>

                </div>

            </div>
        </div>
    );
};

const ReceiptItem = ({ label, value }) => (
    <div>
        <p className="text-sm text-gray-500">
            {label}
        </p>

        <p className="font-medium break-all">
            {value || "-"}
        </p>
    </div>
);

export default PaymentReceiptModal;