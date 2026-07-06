import { FiAlertTriangle } from "react-icons/fi";

const UserDeleteModal = ({
    isOpen,
    user,
    onClose,
    onConfirm,
}) => {

    if (!isOpen || !user) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

            <div className="w-full max-w-md rounded-xl bg-white shadow-xl">

                {/* Header */}

                <div className="border-b p-5">

                    <div className="flex items-center gap-3">

                        <div className="rounded-full bg-red-100 p-3">
                            <FiAlertTriangle
                                size={24}
                                className="text-red-600"
                            />
                        </div>

                        <div>
                            <h2 className="text-xl font-semibold">
                                Delete User
                            </h2>

                            <p className="text-sm text-gray-500">
                                This action cannot be undone.
                            </p>
                        </div>

                    </div>

                </div>

                {/* Body */}

                <div className="p-6">

                    <p className="text-gray-700">
                        Are you sure you want to delete
                        <span className="font-semibold">
                            {" "} {user.name}
                        </span>
                        ?
                    </p>

                </div>

                {/* Footer */}

                <div className="flex justify-end gap-3 border-t p-5">

                    <button
                        onClick={onClose}
                        className="rounded-lg border px-5 py-2 hover:bg-gray-100"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={() => onConfirm(user._id)}
                        className="rounded-lg bg-red-600 px-5 py-2 text-white hover:bg-red-700"
                    >
                        Delete
                    </button>

                </div>

            </div>

        </div>
    );
};

export default UserDeleteModal;