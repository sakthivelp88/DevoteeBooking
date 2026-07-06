import { Pencil, Trash2 } from "lucide-react";

export default function DarshanTypeTable({
  darshanTypes,
  loading,
  onEdit,
  onDelete,
}) {
  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">
      <div className="overflow-x-auto">

        <table className="w-full">

          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Temple</th>
              <th className="p-3 text-left">Darshan Type</th>
              <th className="p-3 text-left">Fee</th>
              <th className="p-3 text-left">Duration</th>
              <th className="p-3 text-center">Status</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>

            {loading && (
              <tr>
                <td colSpan="6" className="p-6 text-center">
                  Loading...
                </td>
              </tr>
            )}

            {!loading && darshanTypes.length === 0 && (
              <tr>
                <td colSpan="6" className="p-6 text-center">
                  No Darshan Types Found
                </td>
              </tr>
            )}

            {!loading &&
              darshanTypes.map((item) => (
                <tr
                  key={item._id}
                  className="border-t hover:bg-gray-50"
                >
                  <td className="p-3">
                    {item.temple?.name}
                  </td>

                  <td className="p-3 font-medium">
                    {item.name}
                  </td>

                  <td className="p-3">
                    ₹{item.fee}
                  </td>

                  <td className="p-3">
                    {item.duration}
                  </td>

                  <td className="text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        item.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>

                  <td>
                    <div className="flex justify-center gap-2">

                      <button
                        onClick={() => onEdit(item)}
                        className="p-2 rounded hover:bg-yellow-100"
                      >
                        <Pencil size={18} />
                      </button>

                      <button
                        onClick={() => onDelete(item)}
                        className="p-2 rounded hover:bg-red-100"
                      >
                        <Trash2 size={18} />
                      </button>

                    </div>
                  </td>

                </tr>
              ))}

          </tbody>

        </table>

      </div>
    </div>
  );
}