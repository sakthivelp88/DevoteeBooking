import { FiSearch, FiRotateCcw } from "react-icons/fi";

const UserFilters = ({ filters, setFilters }) => {

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFilters((prev) => ({
            ...prev,
            [name]: value,
            page: 1,
        }));
    };

    const handleReset = () => {
        setFilters({
            search: "",
            role: "",
            status: "",
            page: 1,
            limit: 10,
        });
    };

    return (
        <div className="rounded-xl border bg-white p-5 shadow-sm">

            <div className="grid grid-cols-1 gap-4 md:grid-cols-4">

                {/* Search */}

                <div className="relative">

                    <FiSearch
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                        size={18}
                    />

                    <input
                        type="text"
                        name="search"
                        value={filters.search}
                        onChange={handleChange}
                        placeholder="Search name, email or phone..."
                        className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 focus:border-orange-500 focus:outline-none"
                    />

                </div>

                {/* Role */}

                <select
                    name="role"
                    value={filters.role}
                    onChange={handleChange}
                    className="rounded-lg border border-gray-300 px-4 py-2 focus:border-orange-500 focus:outline-none"
                >
                    <option value="">All Roles</option>
                    <option value="admin">Admin</option>
                    <option value="devotee">Devotee</option>
                </select>

                {/* Status */}

                <select
                    name="status"
                    value={filters.status}
                    onChange={handleChange}
                    className="rounded-lg border border-gray-300 px-4 py-2 focus:border-orange-500 focus:outline-none"
                >
                    <option value="">All Status</option>
                    <option value="active">Active</option>
                    <option value="blocked">Blocked</option>
                </select>

                {/* Reset */}

                <button
                    type="button"
                    onClick={handleReset}
                    className="flex items-center justify-center gap-2 rounded-lg border border-gray-300 px-4 py-2 font-medium transition hover:bg-gray-100"
                >
                    <FiRotateCcw />
                    Reset
                </button>

            </div>

        </div>
    );
};

export default UserFilters;