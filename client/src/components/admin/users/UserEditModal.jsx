import { useEffect, useState } from "react";
import { FiX } from "react-icons/fi";

const UserEditModal = ({
    isOpen,
    user,
    onClose,
    onSave,
}) => {

    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        role: "devotee",
        status: "active",
    });

    useEffect(() => {

        if (user) {
            setFormData({
                name: user.name || "",
                phone: user.phone || "",
                role: user.role || "devotee",
                status: user.status || "active",
            });
        }

    }, [user]);

    if (!isOpen || !user) return null;

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

    };

    const handleSubmit = (e) => {

        e.preventDefault();

        onSave(user._id, formData);

    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

            <div className="w-full max-w-lg rounded-xl bg-white shadow-xl">

                {/* Header */}

                <div className="flex items-center justify-between border-b p-5">

                    <h2 className="text-xl font-semibold">
                        Edit User
                    </h2>

                    <button
                        onClick={onClose}
                        className="rounded-lg p-2 hover:bg-gray-100"
                    >
                        <FiX size={20} />
                    </button>

                </div>

                {/* Body */}

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5 p-6"
                >

                    <div>

                        <label className="mb-1 block text-sm font-medium">
                            Name
                        </label>

                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full rounded-lg border px-4 py-2 focus:border-orange-500 focus:outline-none"
                            required
                        />

                    </div>

                    <div>

                        <label className="mb-1 block text-sm font-medium">
                            Email
                        </label>

                        <input
                            type="email"
                            value={user.email}
                            disabled
                            className="w-full rounded-lg border bg-gray-100 px-4 py-2"
                        />

                    </div>

                    <div>

                        <label className="mb-1 block text-sm font-medium">
                            Phone
                        </label>

                        <input
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full rounded-lg border px-4 py-2 focus:border-orange-500 focus:outline-none"
                            required
                        />

                    </div>

                    <div className="grid grid-cols-2 gap-4">

                        <div>

                            <label className="mb-1 block text-sm font-medium">
                                Role
                            </label>

                            <select
                                name="role"
                                value={formData.role}
                                onChange={handleChange}
                                className="w-full rounded-lg border px-4 py-2"
                            >
                                <option value="admin">Admin</option>
                                <option value="devotee">Devotee</option>
                            </select>

                        </div>

                        <div>

                            <label className="mb-1 block text-sm font-medium">
                                Status
                            </label>

                            <select
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                className="w-full rounded-lg border px-4 py-2"
                            >
                                <option value="active">Active</option>
                                <option value="blocked">Blocked</option>
                            </select>

                        </div>

                    </div>

                    {/* Footer */}

                    <div className="flex justify-end gap-3 border-t pt-5">

                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-lg border px-5 py-2 hover:bg-gray-100"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="rounded-lg bg-orange-500 px-5 py-2 text-white hover:bg-orange-600"
                        >
                            Save Changes
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
};

export default UserEditModal;