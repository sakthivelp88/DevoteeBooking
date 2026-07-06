import { Pencil, Trash2, Eye } from "lucide-react";

export default function TempleTable({
  temples,
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
              <th className="p-3 text-left">Image</th>
              <th className="p-3 text-left">Temple</th>
              <th className="p-3 text-left">City</th>
              <th className="p-3 text-left">State</th>
              <th className="p-3 text-center">Status</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>

            {/* Loading */}
            {loading && (
              <tr>
                <td
                  colSpan="6"
                  className="text-center p-8 text-gray-500"
                >
                  Loading...
                </td>
              </tr>
            )}

            {/* No Data */}
            {!loading && temples.length === 0 && (
              <tr>
                <td
                  colSpan="6"
                  className="text-center p-8 text-gray-500"
                >
                  No temples found.
                </td>
              </tr>
            )}

            {/* Data */}
            {!loading &&
              temples.map((item) => (
                <tr
                  key={item._id}
                  className="border-t hover:bg-gray-50"
                >
                  {/* Image */}
                  <td className="p-3">
                    <img
                      src={`http://localhost:5000${item.image}`}
                      alt={item.name}
                      className="w-14 h-14 rounded-lg object-cover border"
                    />
                  </td>

                  <td className="p-3 font-medium">
                    {item.name}
                  </td>

                  <td className="p-3">
                    {item.city}
                  </td>

                  <td className="p-3">
                    {item.state}
                  </td>

                  <td className="text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${item.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                        }`}
                    >
                      {item.status}
                    </span>
                  </td>

                  <td>
                    <div className="flex justify-center gap-2">

                      {/* View */}
                      <button
                        className="p-2 rounded hover:bg-blue-100"
                        title="View"
                      >
                        <Eye size={18} />
                      </button>

                      {/* Edit */}
                      <button
                        onClick={() => onEdit(item)}
                        className="p-2 rounded hover:bg-yellow-100"
                        title="Edit"
                      >
                        <Pencil size={18} />
                      </button>

                      {/* Delete */}
                      <button
                        onClick={() => onDelete(item)}
                        className="p-2 rounded hover:bg-red-100"
                        title="Delete"
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