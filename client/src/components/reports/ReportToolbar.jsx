import SearchBar from "./SearchBar";

const ReportToolbar = ({
    searchTerm,
    onSearch,
    onExcelExport,
    onPdfExport,
}) => {
    return (
        <div className="mt-6 mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

            <SearchBar
                value={searchTerm}
                onChange={onSearch}
            />

            <div className="flex items-center gap-3">

                <button
                    type="button"
                    onClick={onExcelExport}
                    className="rounded-lg bg-green-600 px-4 py-2 font-medium text-white transition hover:bg-green-700"
                >
                    Export Excel
                </button>

                <button
                    type="button"
                    onClick={onPdfExport}
                    className="rounded-lg bg-red-600 px-4 py-2 font-medium text-white transition hover:bg-red-700"
                >
                    Export PDF
                </button>

            </div>

        </div>
    );
};

export default ReportToolbar;