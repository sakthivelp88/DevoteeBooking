import { useState } from "react";
import toast from "react-hot-toast";
import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import { submitFeedback } from "../../services/feedbackService";

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
        <div className="max-w-3xl mx-auto mt-10 bg-white shadow rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-6">Feedback</h2>

            <form onSubmit={handleSubmit}>
                <div className="mb-6">
                    <label className="block mb-2 font-medium">
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
                    <p className="mt-2 text-sm text-gray-600">
                        You rated: <span className="font-semibold">{rating}/5</span>
                    </p>
                    <p className="mt-2 text-orange-600 font-medium">
                        {ratingLabels[rating]}
                    </p>
                </div>
                <div>
                    <label className="block mb-2 font-medium">
                        Feedback
                    </label>

                    <textarea
                        rows={6}
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                        placeholder="Share your experience..."
                        className="w-full border rounded-lg p-3"
                    />
                </div>

                <button
                    type="submit"
                    className="mt-4 bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded"
                >
                    Submit Feedback
                </button>
            </form>
        </div>
    );
}