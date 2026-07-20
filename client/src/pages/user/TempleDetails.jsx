import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getTempleById } from "@services/user/templeService";
import { getDarshanTypesByTemple, } from "@services/user/darshanTypeService";

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
      <div className="flex h-screen items-center justify-center px-4">
        <div className="rounded-2xl border border-slate-200 bg-white px-8 py-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
          <h2 className="text-xl font-semibold text-slate-700 dark:text-slate-100">
            Loading temple details...
          </h2>
        </div>
      </div>
    );
  }

  if (!temple) {
    return (
      <div className="flex h-screen items-center justify-center px-4">
        <div className="rounded-2xl border border-slate-200 bg-white px-8 py-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
          <h2 className="text-xl font-semibold text-slate-700 dark:text-slate-100">Temple not found.</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-slate-50 px-4 py-8 text-slate-900 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 dark:text-slate-100">
      <div className="mx-auto max-w-6xl space-y-8">
        <section className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-xl dark:border-slate-700 dark:bg-slate-800">
          <div className="relative h-[420px] overflow-hidden sm:h-[500px]">
            <img
              src={`http://localhost:5000${temple.image}`}
              alt={temple.name}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10">
              <div className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-sm font-medium text-white backdrop-blur">
                Sacred Destination
              </div>
              <h1 className="mt-4 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
                {temple.name}
              </h1>
              <p className="mt-2 flex items-center gap-2 text-sm text-slate-200 sm:text-base">
                <span>📍</span> {temple.location}
              </p>
            </div>
          </div>

          <div className="grid gap-6 p-6 sm:p-8 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <p className="text-lg leading-8 text-slate-600 dark:text-slate-300">
                {temple.shortDescription || "No description available."}
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-900/60">
                <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">Deity</p>
                <p className="mt-2 text-base font-medium text-slate-800 dark:text-slate-100">{temple.deity || "Not specified"}</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-900/60">
                <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">Timings</p>
                <p className="mt-2 text-base font-medium text-slate-800 dark:text-slate-100">{temple.timings || "Not specified"}</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-900/60">
                <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">Dress Code</p>
                <p className="mt-2 text-base font-medium text-slate-800 dark:text-slate-100">{temple.dressCode || "Not specified"}</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-900/60">
                <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">Location</p>
                <p className="mt-2 text-base font-medium text-slate-800 dark:text-slate-100">{temple.location}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-md dark:border-slate-700 dark:bg-slate-800 sm:p-8">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Available Darshan Types</h2>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Choose the darshan experience that suits your visit.</p>
            </div>
          </div>

          <div className="space-y-4">
            {darshanTypes.map((type) => (
              <div
                key={type._id}
                className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-5 shadow-sm transition hover:shadow-md dark:border-slate-700 dark:bg-slate-900/60 md:flex-row md:items-center md:justify-between"
              >
                <div className="max-w-2xl">
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white">{type.name}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">{type.description}</p>
                </div>

                <div className="flex flex-col items-start gap-3 md:items-end">
                  <p className="text-2xl font-bold text-orange-600">₹{type.price}</p>
                  <button
                    onClick={() => handleBook(type)}
                    className="rounded-lg bg-orange-600 px-5 py-2.5 font-semibold text-white transition hover:bg-orange-700"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default TempleDetails;