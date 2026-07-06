import { FiX } from "react-icons/fi";

const UserDetailsModal = ({
    user,
    isOpen,
    onClose,
}) => {

    if (!isOpen || !user) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

            <div className="w-full max-w-lg rounded-xl bg-white shadow-xl">

                {/* Header */}

                <div className="flex items-center justify-between border-b p-5">

                    <h2 className="text-xl font-semibold">
                        User Details
                    </h2>

                    <button
                        onClick={onClose}
                        className="rounded-lg p-2 hover:bg-gray-100"
                    >
                        <FiX size={20} />
                    </button>

                </div>

                {/* Body */}

                <div className="space-y-5 p-6">

                    <div className="flex justify-center">

                        {user.profileImage ? (
                            <img
                                src={`http://localhost:5000${user.profileImage}`}
                                alt={user.name}
                                className="h-24 w-24 rounded-full object-cover"
                            />
                        ) : (
                            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-orange-100 text-3xl font-bold text-orange-600">
                                {user.name.charAt(0).toUpperCase()}
                            </div>
                        )}

                    </div>

                    <div className="grid grid-cols-2 gap-4">

                        <div>
                            <p className="text-sm text-gray-500">
                                Name
                            </p>

                            <p className="font-medium">
                                {user.name}
                            </p>
                        </div>

                        <div>
                            <p className="text-sm text-gray-500">
                                Email
                            </p>

                            <p className="font-medium">
                                {user.email}
                            </p>
                        </div>

                        <div>
                            <p className="text-sm text-gray-500">
                                Phone
                            </p>

                            <p className="font-medium">
                                {user.phone}
                            </p>
                        </div>

                        <div>
                            <p className="text-sm text-gray-500">
                                Role
                            </p>

                            <p className="font-medium capitalize">
                                {user.role}
                            </p>
                        </div>

                        <div>
                            <p className="text-sm text-gray-500">
                                Status
                            </p>

                            <p className="font-medium capitalize">
                                {user.status}
                            </p>
                        </div>

                        <div>
                            <p className="text-sm text-gray-500">
                                Provider
                            </p>

                            <p className="font-medium capitalize">
                                {user.provider}
                            </p>
                        </div>

                        <div className="col-span-2">
                            <p className="text-sm text-gray-500">
                                Registered On
                            </p>

                            <p className="font-medium">
                                {new Date(user.createdAt).toLocaleString()}
                            </p>
                        </div>

                    </div>

                </div>

                {/* Footer */}

                <div className="flex justify-end border-t p-5">

                    <button
                        onClick={onClose}
                        className="rounded-lg bg-orange-500 px-5 py-2 font-medium text-white transition hover:bg-orange-600"
                    >
                        Close
                    </button>

                </div>

            </div>

        </div>
    );
};

export default UserDetailsModal;