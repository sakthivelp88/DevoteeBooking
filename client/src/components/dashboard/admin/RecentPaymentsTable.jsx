import { formatCurrency } from "@/utils/formatCurrency";

export default function RecentPaymentsTable({
  payments,
}) {
  return (
    <div className="overflow-hidden rounded-xl bg-white shadow">
      <div className="border-b p-5">
        <h2 className="text-xl font-semibold">
          Recent Payments
        </h2>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                Payment ID
              </th>

              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                User
              </th>

              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                Amount
              </th>

              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                Status
              </th>
            </tr>
          </thead>

          <tbody>
            {payments.length > 0 ? (
              payments.map((payment) => (
                <tr
                  key={payment._id}
                  className="border-t hover:bg-gray-50"
                >
                  <td className="px-6 py-4">
                    {payment.razorpayPaymentId ||
                      payment.paymentReference ||
                      "-"}
                  </td>

                  <td className="px-6 py-4">
                    {payment.user?.name}
                  </td>

                  <td className="px-6 py-4">
                    {formatCurrency(payment.totalAmount)}
                  </td>

                  <td className="px-6 py-4">
                    <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                      {payment.paymentStatus}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={4}
                  className="py-8 text-center text-gray-500"
                >
                  No recent payments found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}