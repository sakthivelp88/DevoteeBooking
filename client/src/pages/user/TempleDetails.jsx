import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getTempleById } from "../../services/templeService";
import { getDarshanTypesByTemple, } from "../../services/darshanTypeService";

const TempleDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [temple, setTemple] = useState(null);
  const [darshanTypes, setDarshanTypes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const templeData = await getTempleById(id);
        const darshanData = await getDarshanTypesByTemple(id);

        setTemple(templeData);
        setDarshanTypes(darshanData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleBook = (darshanType) => {
    navigate(`/tickets/${temple._id}/${darshanType._id}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h2 className="text-xl font-semibold">
          Loading temple details...
        </h2>
      </div>
    );
  }

  if (!temple) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h2>Temple not found.</h2>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6">

      {/* Temple Image */}
      <img
        src={`http://localhost:5000${temple.image}`}
        alt={temple.name}
        className="w-full h-[400px] object-cover rounded-xl shadow-lg"
      />
      {/* Temple Info */}
      <div className="mt-6">

        <h1 className="text-4xl font-bold text-orange-600">
          {temple.name}
        </h1>

        <p className="text-gray-600 text-lg mt-2">
          📍 {temple.location}
        </p>

        <p className="mt-4 text-gray-700">
          {temple.shortDescription || "No description available."}
        </p>

        {/* 👇 Insert it HERE */}
        <div className="grid grid-cols-2 gap-6 mt-6">

          <div>
            <p className="font-semibold">📍 Location</p>
            <p>{temple.location}</p>
          </div>

          <div>
            <p className="font-semibold">🛕 Deity</p>
            <p>{temple.deity || "Not specified"}</p>
          </div>

          <div>
            <p className="font-semibold">🕒 Timings</p>
            <p>{temple.timings || "Not specified"}</p>
          </div>

          <div>
            <p className="font-semibold">👕 Dress Code</p>
            <p>{temple.dressCode || "Not specified"}</p>
          </div>

        </div>

      </div>

      {/* Darshan Types */}
      <div className="mt-10">

        <h2 className="text-2xl font-bold mb-5">
          Available Darshan Types
        </h2>

        <div className="space-y-4">

          {darshanTypes.map((type) => (
            <div
              key={type._id}
              className="border rounded-xl p-5 shadow-sm flex justify-between items-center"
            >
              <div>

                <h3 className="text-xl font-semibold">
                  {type.name}
                </h3>

                <p className="text-gray-600">
                  {type.description}
                </p>

              </div>

              <div className="text-right">

                <p className="text-2xl font-bold text-orange-600">
                  ₹{type.price}
                </p>

                <button
                  onClick={() => handleBook(type)}
                  className="mt-3 bg-orange-600 text-white px-5 py-2 rounded-lg hover:bg-orange-700"
                >
                  Book Now
                </button>

              </div>

            </div>
          ))}

        </div>

      </div>

    </div>
  );
};

export default TempleDetails;