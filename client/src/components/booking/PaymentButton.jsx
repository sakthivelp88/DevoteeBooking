function PaymentButton({
  onClick,
  loading = false,
}) {
  return (
    <div className="mt-8 flex justify-center">
      <button
        type="button"
        onClick={onClick}
        disabled={loading}
        className="inline-flex min-w-[240px] items-center justify-center rounded-xl bg-orange-600 px-8 py-3 text-lg font-semibold text-white shadow-lg transition hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-300 disabled:cursor-not-allowed disabled:bg-slate-400 disabled:shadow-none dark:focus:ring-orange-900"
      >
        {loading
          ? "Processing..."
          : "Proceed to Payment"}
      </button>
    </div>
  );
}

export default PaymentButton;