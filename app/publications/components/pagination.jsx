import { useEffect, useState } from 'react';

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
    const [pageNumbers, setPageNumbers] = useState([]);

    useEffect(() => {
        if(!totalPages || totalPages===Infinity) return;
        const updatedPageNumbers = [];
        for (let i = 1; i <= totalPages; i++) {
            updatedPageNumbers.push(i);
        }
        setPageNumbers(updatedPageNumbers);
    }, [totalPages]);

    return (
        <div className='w-full mr-96 pr-72 py-12'>
            <ul className="flex items-center justify-center">
                <li>
                    <button
                        onClick={() => onPageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`mx-1 flex h-9 w-9 items-center justify-center rounded-full border border-zinc-400 bg-zinc-400 p-0 text-sm text-bitBrown transition duration-150 ease-in-out hover:bg-white ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
                        aria-label="Previous"
                    >
                        <span className="text-sm">&lt;</span>
                    </button>
                </li>
                {pageNumbers.map(number => (
                    <li key={number}>
                        <button
                            onClick={() => onPageChange(number)}
                            className={`mx-1 font-medium text-md flex h-9 w-9 items-center justify-center  p-0  shadow-xl transition duration-150 ease-in-out ${Number(currentPage) === Number(number) ? "text-bitBrown bg-zinc-400 rounded-full" : "hover:bg-white rounded-full bg-bitBrown border border-zinc-400 text-zinc-400 hover:text-bitBrown"}`}
                        >
                            {number}
                        </button>
                    </li>
                ))}
                <li>
                    <button
                        onClick={() => onPageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className={`mx-1 flex h-9 w-9 items-center justify-center rounded-full border border-zinc-400 bg-zinc-400 p-0 text-sm text-bitBrown transition duration-150 ease-in-out hover:bg-white ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""}`}
                        aria-label="Next"
                    >
                        <span className="text-sm">&gt;</span>
                    </button>
                </li>
            </ul>
        </div>
    );
};

export default Pagination;
