import UserRow from "./UserRow";

const UserTable = ({
  users,
  loading,
  onView,
  onEdit,
  onDelete,
  onStatusChange,
}) => {

  if (loading) {
    return (
      <div className="rounded-xl bg-white p-10 text-center shadow-sm">
        <p className="text-gray-500">Loading users...</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border bg-white shadow-sm">

      <div className="overflow-x-auto">

        <table className="min-w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                User
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Email
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Phone
              </th>

              <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">
                Role
              </th>

              <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">
                Status
              </th>

              <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">
                Actions
              </th>

            </tr>

          </thead>

          <tbody className="divide-y">

            {users.length > 0 ? (

              users.map((user) => (
                <UserRow
                  key={user._id}
                  user={user}
                  onView={onView}
                  onEdit={onEdit}
                  onDelete={onDelete}
                  onStatusChange={onStatusChange}
                />
              ))

            ) : (

              <tr>
                <td
                  colSpan="6"
                  className="py-10 text-center text-gray-500"
                >
                  No users found.
                </td>
              </tr>

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default UserTable;