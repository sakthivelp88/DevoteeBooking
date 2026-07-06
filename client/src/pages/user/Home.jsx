import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const [temples, setTemples] = useState([]);
  const [current, setCurrent] = useState(0);
  const [selectedTemple, setSelectedTemple] = useState("");
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    fetchTemples();
  }, []);

  useEffect(() => {
    if (temples.length === 0 || isPaused) return;

    const timer = setInterval(() => {
      setCurrent((prev) =>
        prev === temples.length - 1 ? 0 : prev + 1
      );
    }, 3000);

    return () => clearInterval(timer);
  }, [temples, isPaused]);

  const fetchTemples = async () => {
    try {
      const res = await fetch(
        "http://localhost:5000/api/temples"
      );

      const data = await res.json();

      setTemples(data);
    } catch (error) {
      console.error(error);
    }
  };

  const nextSlide = () => {
    setCurrent((prev) =>
      prev === temples.length - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrent((prev) =>
      prev === 0 ? temples.length - 1 : prev - 1
    );
  };

  const openTemple = (id) => {
    navigate(`/temples/${id}`);
  };

  const searchTemple = () => {
    if (!selectedTemple) {
      alert("Please select a temple");
      return;
    }

    const temple = temples.find(
      (t) => t._id === selectedTemple
    );

    if (!temple) return;

    navigate(`/temples/${temple._id}`);
  };

  if (!temples.length) {
    return (
      <div className="flex justify-center items-center h-screen text-2xl">
        Loading Temples...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">

      <div className="py-8">
        <h1 className="text-4xl font-bold text-center text-orange-600">
          Temple Darshan Booking
        </h1>

        <p className="text-center text-gray-600 mt-2">
          Book your darshan in a few simple steps.
        </p>
      </div>

      <div className="max-w-3xl mx-auto flex gap-3 px-4 mb-8">

        <select
          value={selectedTemple}
          onChange={(e) =>
            setSelectedTemple(e.target.value)
          }
          className="flex-1 border rounded-lg p-3"
        >
          <option value="">
            Select Temple
          </option>

          {temples.map((temple) => (
            <option
              key={temple._id}
              value={temple._id}
            >
              {temple.name}
            </option>
          ))}

        </select>

        <button
          onClick={searchTemple}
          className="bg-orange-600 text-white px-6 rounded-lg hover:bg-orange-700"
        >
          Search
        </button>

      </div>

      <div className="relative max-w-5xl mx-auto px-4">

        <img
          src={`http://localhost:5000${temples[current].image}`}
          alt={temples[current].name}
          onClick={() =>
            openTemple(temples[current]._id)
          }
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="w-full h-[550px] object-cover rounded-xl shadow-xl cursor-pointer"
        />

        <div className="absolute bottom-0 left-4 right-4 bg-black/60 text-white rounded-b-xl p-5">

          <h2 className="text-3xl font-bold">
            {temples[current].name}
          </h2>

          <p className="mt-2">
            Click to view temple details and book darshan.
          </p>

        </div>

        <button
          onClick={prevSlide}
          className="absolute top-1/2 left-8 -translate-y-1/2 bg-white rounded-full px-4 py-2 shadow"
        >
          ◀
        </button>

        <button
          onClick={nextSlide}
          className="absolute top-1/2 right-8 -translate-y-1/2 bg-white rounded-full px-4 py-2 shadow"
        >
          ▶
        </button>

      </div>    

    </div>
  );
}