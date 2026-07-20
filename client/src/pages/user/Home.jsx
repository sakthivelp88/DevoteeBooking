import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const [temples, setTemples] = useState([]);
  const [current, setCurrent] = useState(0);
  const [selectedTemple, setSelectedTemple] = useState("");
  const [isPaused, setIsPaused] = useState(false);
  const [error, setError] = useState("");

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
      const res = await fetch("/api/temples");

      if (!res.ok) {
        throw new Error(`Request failed with status ${res.status}`);
      }

      const data = await res.json();
      setTemples(Array.isArray(data) ? data : []);
      setError("");
    } catch (err) {
      console.error("Unable to load temples:", err);
      setTemples([]);
      setError("Unable to load temples right now. Please make sure the backend server is running.");
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
      <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
        <div className="rounded-2xl border border-slate-200 bg-white px-8 py-10 shadow-sm dark:border-slate-700 dark:bg-slate-800">
          <p className="text-2xl font-semibold text-slate-700 dark:text-slate-100">
            {error || "Loading Temples..."}
          </p>
          {error && (
            <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
              The app will continue to work once the backend is available.
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-slate-50 px-4 py-8 text-slate-900 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 dark:text-slate-100">
      <div className="mx-auto max-w-7xl space-y-8">
        <section className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-xl dark:border-slate-700 dark:bg-slate-800">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="p-8 sm:p-10 lg:p-14">
              <div className="inline-flex items-center rounded-full border border-orange-200 bg-orange-100 px-3 py-1 text-sm font-medium text-orange-700 dark:border-orange-900 dark:bg-orange-950/40 dark:text-orange-300">
                Temple Darshan Booking
              </div>
              <h1 className="mt-5 text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
                Discover sacred temples and reserve your darshan effortlessly.
              </h1>
              <p className="mt-4 max-w-2xl text-lg text-slate-600 dark:text-slate-300">
                Browse trusted temples, choose preferred timings, and secure your visit with a smooth booking experience.
              </p>

              <div className="mt-8 flex flex-col gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900/60 sm:flex-row">
                <select
                  value={selectedTemple}
                  onChange={(e) => setSelectedTemple(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-800 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-200 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:focus:border-orange-500 dark:focus:ring-orange-900"
                >
                  <option value="">Select a temple</option>
                  {temples.map((temple) => (
                    <option key={temple._id} value={temple._id}>
                      {temple.name}
                    </option>
                  ))}
                </select>

                <button
                  onClick={searchTemple}
                  className="rounded-xl bg-orange-600 px-6 py-3 font-semibold text-white transition hover:bg-orange-700"
                >
                  Search Temple
                </button>
              </div>
            </div>

            <div className="relative min-h-[320px] overflow-hidden lg:min-h-[480px]">
              <img
                src={temples[current]?.image || ""}
                alt={temples[current]?.name || "Temple"}
                onClick={() => openTemple(temples[current]?._id)}
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
                className="h-full w-full object-cover transition duration-300 hover:scale-[1.02]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white sm:p-8">
                <div className="inline-flex items-center rounded-full bg-white/15 px-3 py-1 text-sm backdrop-blur">
                  Featured Temple
                </div>
                <h2 className="mt-3 text-2xl font-semibold sm:text-3xl">
                  {temples[current]?.name}
                </h2>
                <p className="mt-2 max-w-xl text-sm text-slate-200 sm:text-base">
                  Tap to explore temple details and book your darshan with confidence.
                </p>
              </div>
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-slate-800 shadow-lg transition hover:bg-white"
              >
                ◀
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-slate-800 shadow-lg transition hover:bg-white"
              >
                ▶
              </button>
            </div>
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100 text-orange-600 dark:bg-orange-950/40 dark:text-orange-400">
              🕉️
            </div>
            <h3 className="text-lg font-semibold">Fast booking</h3>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
              Reserve your darshan in just a few steps and get a smooth confirmation flow.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100 text-orange-600 dark:bg-orange-950/40 dark:text-orange-400">
              🪔
            </div>
            <h3 className="text-lg font-semibold">Trusted temples</h3>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
              Browse a curated selection of temples with clear details and booking information.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100 text-orange-600 dark:bg-orange-950/40 dark:text-orange-400">
              📅
            </div>
            <h3 className="text-lg font-semibold">Flexible planning</h3>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
              Review upcoming visits and manage trip plans through your personal dashboard.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}