import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FiEye } from "react-icons/fi";

import {
    getAllFeedback,
    reviewFeedback, deleteFeedback,
} from "../../services/adminFeedbackService";

export default function AdminFeedback() {
    const [feedbacks, setFeedbacks] = useState([]);
    const [selectedFeedback, setSelectedFeedback] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchFeedback();
    }, []);

    const fetchFeedback = async () => {
        try {
            const res = await getAllFeedback();
            setFeedbacks(res.data.feedback);
        } catch (error) {
            toast.error("Failed to load feedback");
        } finally {
            setLoading(false);
        }
    };

    const handleReview = async () => {
        try {
            const res = await reviewFeedback(selectedFeedback._id);

            toast.success(res.data.message);

            setFeedbacks((prev) =>
                prev.map((item) =>
                    item._id === selectedFeedback._id
                        ? { ...item, status: "Reviewed" }
                        : item
                )
            );

            setSelectedFeedback((prev) => ({
                ...prev,
                status: "Reviewed",
            }));
        } catch (error) {
            toast.error("Failed to update status");
        }
    };

    const handleDelete = async () => {
        if (!window.confirm("Are you sure you want to delete this feedback?")) {
            return;
        }

        try {
            const res = await deleteFeedback(selectedFeedback._id);

            toast.success(res.data.message);

            setFeedbacks((prev) =>
                prev.filter((item) => item._id !== selectedFeedback._id)
            );

            setSelectedFeedback(null);
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Failed to delete feedback"
            );
        }
    };

    if (loading) {
        return (
            <div className="flex h-96 items-center justify-center">
                Loading feedback...
            </div>
        );
    }

    return (
        <>
            <div className="rounded-xl bg-white p-6 shadow">

                <h2 className="mb-6 text-2xl font-bold">
                    Feedback Management
                </h2>

                <div className="overflow-x-auto">

                    <table className="min-w-full">

                        <thead className="bg-orange-500 text-white">

                            <tr>
                                <th className="p-3 text-left">User</th>
                                <th className="p-3 text-center">Rating</th>
                                <th className="p-3 text-left">Feedback</th>
                                <th className="p-3 text-center">Date</th>
                                <th className="p-3 text-center">Status</th>
                                <th className="p-3 text-center">Action</th>
                            </tr>

                        </thead>

                        <tbody>

                            {feedbacks.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan={6}
                                        className="p-6 text-center text-gray-500"
                                    >
                                        No feedback found.
                                    </td>
                                </tr>
                            ) : (
                                feedbacks.map((item) => (
                                    <tr
                                        key={item._id}
                                        className="border-b hover:bg-gray-50"
                                    >
                                        <td className="p-3">
                                            {item.user?.name}
                                        </td>

                                        <td className="p-3 text-center">
                                            {"⭐".repeat(item.rating)}
                                        </td>

                                        <td className="p-3">
                                            {item.message.length > 50
                                                ? item.message.slice(0, 50) + "..."
                                                : item.message}
                                        </td>

                                        <td className="p-3 text-center">
                                            {new Date(item.createdAt).toLocaleDateString()}
                                        </td>

                                        <td className="p-3 text-center">

                                            <span
                                                className={`rounded-full px-3 py-1 text-sm ${item.status === "Pending"
                                                    ? "bg-yellow-100 text-yellow-700"
                                                    : "bg-green-100 text-green-700"
                                                    }`}
                                            >
                                                {item.status}
                                            </span>

                                        </td>

                                        <td className="p-3 text-center">

                                            <button
                                                onClick={() => setSelectedFeedback(item)}
                                                className="text-orange-600 transition hover:text-orange-700"
                                            >
                                                <FiEye size={20} />
                                            </button>

                                        </td>

                                    </tr>
                                ))
                            )}

                        </tbody>

                    </table>

                </div>

            </div>

            {selectedFeedback && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">

                    <div className="w-full max-w-xl rounded-xl bg-white p-6">

                        <h2 className="mb-6 text-2xl font-bold">
                            Feedback Details
                        </h2>

                        <div className="space-y-4">

                            <p>
                                <strong>User:</strong>{" "}
                                {selectedFeedback.user?.name}
                            </p>

                            <p>
                                <strong>Email:</strong>{" "}
                                {selectedFeedback.user?.email}
                            </p>

                            <p>
                                <strong>Rating:</strong>{" "}
                                {"⭐".repeat(selectedFeedback.rating)}
                            </p>

                            <p>
                                <strong>Status:</strong>{" "}
                                <span
                                    className={`rounded-full px-3 py-1 text-sm ${selectedFeedback.status === "Pending"
                                        ? "bg-yellow-100 text-yellow-700"
                                        : "bg-green-100 text-green-700"
                                        }`}
                                >
                                    {selectedFeedback.status}
                                </span>
                            </p>

                            <p>
                                <strong>Submitted:</strong>{" "}
                                {new Date(
                                    selectedFeedback.createdAt
                                ).toLocaleString()}
                            </p>

                            <div>

                                <p className="mb-2 font-semibold">
                                    Feedback
                                </p>

                                <div className="rounded-lg bg-gray-100 p-4">
                                    {selectedFeedback.message}
                                </div>

                            </div>

                        </div>

                        <div className="mt-8 flex justify-between">                           

                            <div className="flex gap-3">

                                {selectedFeedback.status === "Pending" ? (
                                    <button
                                        onClick={handleReview}
                                        className="rounded bg-green-600 px-5 py-2 text-white hover:bg-green-700"
                                    >
                                        Mark as Reviewed
                                    </button>
                                ) : (
                                    <button
                                        disabled
                                        className="cursor-not-allowed rounded bg-green-100 px-5 py-2 text-green-700"
                                    >
                                        ✓ Reviewed
                                    </button>
                                )}

                                <button
                                    onClick={handleDelete}
                                    className="rounded bg-red-600 px-5 py-2 text-white hover:bg-red-700"
                                >
                                    Delete
                                </button>

                            </div>

                            <button
                                onClick={() => setSelectedFeedback(null)}
                                className="rounded bg-orange-500 px-5 py-2 text-white hover:bg-orange-600"
                            >
                                Close
                            </button>

                        </div>

                    </div>

                </div>
            )}
        </>
    );
}