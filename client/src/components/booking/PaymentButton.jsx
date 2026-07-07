function PaymentButton({
  onClick,
  loading = false,
}) {
  return (
    <div className="text-center mt-8">
      <button
        type="button"
        onClick={onClick}
        disabled={loading}
        className="bg-orange-600 hover:bg-orange-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-8 py-3 rounded-lg text-lg font-semibold transition"
      >
        {loading
          ? "Processing..."
          : "Proceed to Payment"}
      </button>
    </div>
  );
}

export default PaymentButton;