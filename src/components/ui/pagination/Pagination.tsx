'use client';
import { generatePaginationNumbers } from "@/utils/generatePaginationNumbers";
import Link from "next/link"
import { redirect, usePathname, useSearchParams } from "next/navigation"
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5"

interface Props {
    totalPages: number
}


export const Pagination = ({ totalPages }: Props) => {

    const pathName = usePathname();
    const searchParams = useSearchParams();
    const pageString = searchParams.get('page') ?? 1;
    let currentPage = isNaN(+pageString) ? 1 : +pageString;

    if (currentPage < 1 || isNaN(+pageString)) {
        redirect(pathName);
    }

    const allPages = generatePaginationNumbers(currentPage, totalPages);

    const createPageUrl = (pageNumber: number | string) => {
        const params = new URLSearchParams(searchParams);

        if (pageNumber === '...') {
            return `${pathName}?${params.toString()}`;
        }

        if (+pageNumber <= 0) {
            return `${pathName}`;
        }

        if (+pageNumber > totalPages) {
            return `${pathName}?${params.toString()}`;
        }

        params.set('page', pageNumber.toString());

        return `${pathName}?${params.toString()}`;
    }

    return (
        <div className="flex text-center justify-center mt-10 mb-28">
            <nav aria-label="Page navigation example">
                <ul className="flex list-style-none">

                    <li className="page-item">
                        <Link
                            className="page-link relative block py-1.5 px-1 mx-2 border-0 bg-transparent outline-none transition-all duration-300 rounded text-white hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
                            href={createPageUrl(currentPage - 1)} aria-disabled="true">
                            <IoChevronBackOutline size={30} />
                        </Link>
                    </li>

                    {
                        allPages.map((page, index) => (

                            <li key={page + '-' + index} className="page-item text-white">
                                <Link
                                    className={`page-link relative block py-1.5 px-3 border-0 outline-none transition-all duration-300 rounded hover:text-gray-800 hover:bg-gray-100 focus:shadow-none ${(page === currentPage) ? 'bg-blue-600 text-white' : 'text-white'}`}
                                    href={createPageUrl(page)}>
                                    {page}
                                </Link>
                            </li>
                        ))
                    }

                    <li className="page-item">
                        <Link
                            className="page-link relative block py-1.5 mx-2 px-1 border-0 bg-transparent outline-none transition-all duration-300 rounded text-white hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
                            href={createPageUrl(currentPage + 1)}>
                            <IoChevronForwardOutline size={30} />
                        </Link>
                    </li>
                </ul>
            </nav>
        </div >
    )
}
