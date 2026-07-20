import {
  FiEye,
  FiEdit,
  FiTrash2,
  FiLock,
  FiUnlock,
} from "react-icons/fi";

const UserRow = ({
  user,
  onView,
  onEdit,
  onDelete,
  onStatusChange,
}) => {

  return (
    <tr className="hover:bg-gray-50">

      {/* User */}

      <td className="px-6 py-4">

        <div className="flex items-center gap-3">

          {user.profileImage ? (
            <img
              src={user.profileImage || "https://ui-avatars.com/api/?name=" + encodeURIComponent(user?.name || "User") + "&background=f97316&color=fff&size=150"}
              alt={user.name}
              className="h-10 w-10 rounded-full object-cover"
            />
          ) : (
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 font-semibold text-orange-600">
              {user.name.charAt(0).toUpperCase()}
            </div>
          )}

          <div>
            <p className="font-medium text-gray-800">
              {user.name}
            </p>

            <p className="text-xs text-gray-500">
              Joined{" "}
              {new Date(user.createdAt).toLocaleDateString()}
            </p>
          </div>

        </div>

      </td>

      {/* Email */}

      <td className="px-6 py-4 text-sm text-gray-700">
        {user.email}
      </td>

      {/* Phone */}

      <td className="px-6 py-4 text-sm text-gray-700">
        {user.phone}
      </td>

      {/* Role */}

      <td className="px-6 py-4 text-center">

        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            user.role === "admin"
              ? "bg-blue-100 text-blue-700"
              : "bg-green-100 text-green-700"
          }`}
        >
          {user.role}
        </span>

      </td>

      {/* Status */}

      <td className="px-6 py-4 text-center">

        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            user.status === "active"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {user.status}
        </span>

      </td>

      {/* Actions */}

      <td className="px-6 py-4">

        <div className="flex items-center justify-center gap-2">

          {/* View */}

          <button
            onClick={() => onView(user)}
            className="rounded-lg p-2 text-blue-600 transition hover:bg-blue-100"
            title="View"
          >
            <FiEye size={18} />
          </button>

          {/* Edit */}

          <button
            onClick={() => onEdit(user)}
            className="rounded-lg p-2 text-yellow-600 transition hover:bg-yellow-100"
            title="Edit"
          >
            <FiEdit size={18} />
          </button>

          {/* Block / Unblock */}

          {user.role !== "admin" && (
            <button
              onClick={() =>
                onStatusChange(
                  user,
                  user.status === "active"
                    ? "blocked"
                    : "active"
                )
              }
              className={`rounded-lg p-2 transition ${
                user.status === "active"
                  ? "text-orange-600 hover:bg-orange-100"
                  : "text-green-600 hover:bg-green-100"
              }`}
              title={
                user.status === "active"
                  ? "Block User"
                  : "Unblock User"
              }
            >
              {user.status === "active" ? (
                <FiLock size={18} />
              ) : (
                <FiUnlock size={18} />
              )}
            </button>
          )}

          {/* Delete */}

          {user.role !== "admin" && (
            <button
              onClick={() => onDelete(user)}
              className="rounded-lg p-2 text-red-600 transition hover:bg-red-100"
              title="Delete"
            >
              <FiTrash2 size={18} />
            </button>
          )}

        </div>

      </td>

    </tr>
  );
};

export default UserRow;