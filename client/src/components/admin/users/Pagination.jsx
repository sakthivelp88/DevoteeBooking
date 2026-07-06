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

    // Show max 5 page buttons
    const getPageNumbers = () => {

        const pages = [];

        let start = Math.max(1, page - 2);
        let end = Math.min(totalPages, page + 2);

        if (page <= 3) {
            end = Math.min(5, totalPages);
        }

        if (page >= totalPages - 2) {
            start = Math.max(1, totalPages - 4);
        }

        for (let i = start; i <= end; i++) {
            pages.push(i);
        }

        return pages;
    };

    return (
        <div className="mt-6 flex flex-col gap-4 border-t pt-4 md:flex-row md:items-center md:justify-between">

            {/* Records */}

            <p className="text-sm text-gray-600">
                Showing{" "}
                <span className="font-semibold">
                    {startRecord}
                </span>{" "}
                to{" "}
                <span className="font-semibold">
                    {endRecord}
                </span>{" "}
                of{" "}
                <span className="font-semibold">
                    {totalRecords}
                </span>{" "}
                users
            </p>

            {/* Pagination */}

            <div className="flex items-center gap-2">

                <button
                    type="button"
                    disabled={!hasPrev}
                    onClick={() => onPageChange(page - 1)}
                    className="rounded-lg border border-gray-300 px-4 py-2 text-sm transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    Previous
                </button>

                {getPageNumbers().map((pageNumber) => (

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

                ))}

                <button
                    type="button"
                    disabled={!hasNext}
                    onClick={() => onPageChange(page + 1)}
                    className="rounded-lg border border-gray-300 px-4 py-2 text-sm transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    Next
                </button>

            </div>

        </div>
    );
};

export default Pagination;