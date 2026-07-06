export const getPaymentStatistics = (payments) => {
    const paidPayments = payments.filter(
        (payment) => payment.status === "Paid"
    );

    return {
        totalPayments: payments.length,

        paid: paidPayments.length,

        pending: payments.filter(
            (payment) => payment.status === "Pending"
        ).length,

        failed: payments.filter(
            (payment) => payment.status === "Failed"
        ).length,

        refunded: payments.filter(
            (payment) => payment.status === "Refunded"
        ).length,

        totalRevenue: paidPayments.reduce(
            (sum, payment) => sum + payment.amount,
            0
        ),
    };
};