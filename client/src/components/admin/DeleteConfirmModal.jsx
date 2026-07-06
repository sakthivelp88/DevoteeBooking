export default function DeleteConfirmModal({
  isOpen,
  title,
  message,
  onCancel,
  onConfirm,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md">

        <div className="border-b p-5">
          <h2 className="text-xl font-bold text-red-600">
            {title}
          </h2>
        </div>

        <div className="p-5">
          <p className="text-gray-700">
            {message}
          </p>
        </div>

        <div className="border-t p-5 flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 border rounded-lg hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Delete
          </button>
        </div>

      </div>
    </div>
  );
}