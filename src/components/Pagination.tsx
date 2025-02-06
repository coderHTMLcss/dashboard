type PaginationProps = {
    currentPage: number,
    totalPages: number,
    handlePageChange: (page: number) => void,
};

const Pagination = ({ currentPage, totalPages, handlePageChange }: PaginationProps) => {
    return (
        <div className="flex justify-end mt-4">
            <button
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
                className="px-4 py-2 bg-gray-700 text-white rounded mr-2 disabled:opacity-50"
            >
                Previous
            </button>
            <span className="px-4 py-2 text-white">
                Page {currentPage} of {totalPages}
            </span>
            <button
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
                className="px-4 py-2 bg-gray-700 text-white rounded ml-2 disabled:opacity-50"
            >
                Next
            </button>
        </div>
    )
}

export default Pagination;
