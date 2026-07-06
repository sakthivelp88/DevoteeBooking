
const SearchBar = ({ value, onChange }) => {
    return (
        <div className="mt-6 w-full md:w-100">
            <input
                type="text"
                placeholder="Search booking, payment, devotee, temple..."
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none"
            />
        </div>
    );
};

export default SearchBar;