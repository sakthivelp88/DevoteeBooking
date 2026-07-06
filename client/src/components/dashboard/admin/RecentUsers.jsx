export default function RecentUsers({
    users,
}) {
    return (
        <div className="rounded-xl bg-white shadow">

            <div className="border-b p-5">
                <h2 className="text-xl font-semibold">
                    Recent Registered Users
                </h2>
            </div>

            <div className="divide-y">

                {users.length > 0 ? (
                    users.map((user) => (
                        <div
                            key={user._id}
                            className="flex items-center justify-between p-5"
                        >
                            <div>
                                <h3 className="font-semibold text-gray-800">
                                    {user.name}
                                </h3>

                                <p className="text-sm text-gray-500">
                                    {user.email}
                                </p>
                            </div>

                            <span className="text-sm text-gray-500">
                                {new Date(
                                    user.createdAt
                                ).toLocaleDateString()}
                            </span>
                        </div>
                    ))
                ) : (
                    <div className="p-6 text-center text-gray-500">
                        No users found.
                    </div>
                )}

            </div>

        </div>
    );
}