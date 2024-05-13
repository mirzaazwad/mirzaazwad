"use client";
import Pagination from "./pagination";
import {usePagination} from "../hooks/usePagination";

const Publications = () => {
    const {currentPage,totalPages,handlePageChange}=usePagination([],8);
    return ( <div className="w-full">
        <div className="w-11/12 ms-4 me-4 flex justify-content-center items-center m-6 text-2xl bg-zinc-950 px-6 py-6 rounded-lg">
                {"I don\'t have any publications as of yet. Check back later!"}
            </div>
        <div className="flex justify-content-center items-center align-bottom">
            <Pagination currentPage={currentPage} totalPages={totalPages} handlePageChange={handlePageChange}/>
        </div>
    </div> );
}
 
export default Publications;