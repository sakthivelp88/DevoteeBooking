import { useState } from "react";
import toast from "react-hot-toast";
import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import { submitFeedback } from "@services/user/feedbackService";

export default function Feedback() {
    const navigate = useNavigate();
    const [feedback, setFeedback] = useState("");
    const [rating, setRating] = useState(5);

    const ratingLabels = {
        1: "Poor",
        2: "Fair",
        3: "Good",
        4: "Very Good",
        5: "Excellent",
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!feedback.trim()) {
            toast.error("Please enter your feedback");
            return;
        }

        try {
            const res = await submitFeedback({
                message: feedback,
                rating,
            });

            toast.success(res.data.message);

            setFeedback("");
            setRating(5);

            setTimeout(() => {
                navigate("/");
            }, 1500);
            
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Failed to submit feedback"
            );
        }
    };

    return (
        <div className="mx-auto mt-10 max-w-3xl rounded-xl border border-slate-200 bg-white p-6 shadow dark:border-slate-700 dark:bg-slate-800">
            <h2 className="mb-6 text-2xl font-bold text-slate-800 dark:text-slate-100">Feedback</h2>

            <form onSubmit={handleSubmit}>
                <div className="mb-6">
                    <label className="mb-2 block font-medium text-slate-700 dark:text-slate-200">
                        Rate your experience
                    </label>

                    <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <FaStar
                                key={star}
                                size={30}
                                onClick={() => setRating(star)}
                                className={`cursor-pointer transition ${star <= rating
                                    ? "text-yellow-400"
                                    : "text-gray-300"
                                    }`}
                            />
                        ))}
                    </div>
                    <p className="mt-2 text-sm text-gray-600 dark:text-slate-400">
                        You rated: <span className="font-semibold">{rating}/5</span>
                    </p>
                    <p className="mt-2 font-medium text-orange-600">
                        {ratingLabels[rating]}
                    </p>
                </div>
                <div>
                    <label className="mb-2 block font-medium text-slate-700 dark:text-slate-200">
                        Feedback
                    </label>

                    <textarea
                        rows={6}
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                        placeholder="Share your experience..."
                        className="w-full rounded-lg border border-slate-300 bg-white p-3 text-slate-800 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-200 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100 dark:focus:border-orange-500 dark:focus:ring-orange-900"
                    />
                </div>

                <button
                    type="submit"
                    className="mt-4 rounded-lg bg-orange-600 px-5 py-2 text-white transition hover:bg-orange-700"
                >
                    Submit Feedback
                </button>
            </form>
        </div>
    );
}