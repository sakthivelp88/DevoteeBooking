const Pagination = ({
    pagination,
    onPageChange,
}) => {
    const {
        page = 1,
        totalPages = 1,
        totalRecords = 0,
        limit = 10,
        hasPrev = false,
        hasNext = false,
    } = pagination || {};

    if (totalPages <= 1) return null;

    const startRecord = (page - 1) * limit + 1;
    const endRecord = Math.min(page * limit, totalRecords);

    return (
        <div className="mt-6 flex flex-col gap-4 border-t pt-4 md:flex-row md:items-center md:justify-between">

            <p className="text-sm text-gray-600">
                Showing <span className="font-medium">{startRecord}</span> to{" "}
                <span className="font-medium">{endRecord}</span> of{" "}
                <span className="font-medium">{totalRecords}</span> records
            </p>

            <div className="flex items-center gap-2">

                <button
                    type="button"
                    onClick={() => onPageChange(page - 1)}
                    disabled={!hasPrev}
                    className="rounded-lg border border-gray-300 px-4 py-2 text-sm transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    Previous
                </button>

                {Array.from({ length: totalPages }, (_, index) => {
                    const pageNumber = index + 1;

                    return (
                        <button
                            key={pageNumber}
                            type="button"
                            onClick={() => onPageChange(pageNumber)}
                            className={`h-10 w-10 rounded-lg text-sm font-medium transition ${
                                page === pageNumber
                                    ? "bg-orange-500 text-white"
                                    : "border border-gray-300 hover:bg-gray-100"
                            }`}
                        >
                            {pageNumber}
                        </button>
                    );
                })}

                <button
                    type="button"
                    onClick={() => onPageChange(page + 1)}
                    disabled={!hasNext}
                    className="rounded-lg border border-gray-300 px-4 py-2 text-sm transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    Next
                </button>

            </div>

        </div>
    );
};

export default Pagination;