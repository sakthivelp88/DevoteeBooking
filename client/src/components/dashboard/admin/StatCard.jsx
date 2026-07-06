export default function StatCard({
  title,
  value,
  icon,
  color,
}) {
  return (
    <div className="rounded-xl bg-white p-6 shadow transition duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">
            {title}
          </p>

          <h2 className="mt-2 text-3xl font-bold text-gray-800">
            {value}
          </h2>
        </div>

        <div
          className={`flex h-14 w-14 items-center justify-center rounded-full text-white ${color}`}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}