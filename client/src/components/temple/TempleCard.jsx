import { useNavigate } from "react-router-dom";

export default function TempleCard({ temple }) {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || "null");

  const handleBook = () => {
    if (!user) {
      navigate("/login");
      return;
    }

    navigate(`/temples/${temple._id}`);
  };

  const handleView = () => {
    navigate(`/temples/${temple._id}`);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300">

      <img
        src={temple.image}
        alt={temple.name}
        className="w-full h-60 object-cover"
      />

      <div className="p-5">

        <h2 className="text-2xl font-bold text-orange-600">
          {temple.name}
        </h2>

        <p className="text-gray-500 mt-1">
          📍 {temple.location}
        </p>

        <p className="text-gray-700 mt-4">
          {temple.shortDescription ||
            "Temple information coming soon."}
        </p>

        <div className="flex gap-3 mt-6">

          <button
            onClick={handleView}
            className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
          >
            View Details
          </button>

          <button
            onClick={handleBook}
            className="flex-1 bg-orange-600 text-white py-2 rounded-lg hover:bg-orange-700"
          >
            Book Ticket
          </button>

        </div>

      </div>

    </div>
  );
}