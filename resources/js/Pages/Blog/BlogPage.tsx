import Guest from "@/Layouts/GuestLayout";
import { convertDate } from "@/Utils/ConvertDate";
import { Link, usePage } from "@inertiajs/react";
import React, { useEffect } from "react";
import { BlogProps } from "@/types";

export default function BlogPage({ Blogs, Preview }: any) {
    const companyData: any = usePage().props.companyData; //get page info
    const BlogDatas = Blogs.data || [];

    const [keywords, setKeywords] = React.useState("");

    const handleSearch = (e: any) => {
        setKeywords(e.target.value);
    };

    const filterData = (data: BlogProps[], search: string) => {
        search = search.toLowerCase();

        if (!search) {
            return data;
        }

        return data.filter((item: BlogProps) => {
            return (
                item.title.toLowerCase().includes(search.toLowerCase()) ||
                item.slug.toLowerCase().includes(search.toLowerCase()) ||
                item.description.toLowerCase().includes(search.toLowerCase())
            );
        });
    };

    return (
        <Guest>
            <div className="flex flex-col justify-center items-center gap-5 p-boxMd">
                {/* Header */}
                <div className="flex flex-col justify-center items-start gap-[0.5rem] p-boxS w-full">
                    <h1 className="font-playfair text-[2.5rem] font-[500]">
                        {companyData.blog_title}
                    </h1>
                    <hr className="w-[30%] h-[0.1rem] bg-primaryBlack mb-[1rem]" />
                    {/* Content */}
                    <p
                        className="text-primaryBlack font-niramit w-full max-w-[60rem] text-[1.125rem]
                        text-left"
                    >
                        {companyData.blog_description}
                    </p>
                </div>
                <div
                    className="flex flex-col justify-center items-start gap-5 w-full
                    p-boxS"
                >
                    {/* Recomendation */}
                    <div
                        className="grid grid-cols-1 md:grid-cols-2
                        w-full justify-between gap-5"
                    >
                        {BlogDatas.slice(0, 2).map((item: any) => {
                            return <HeadCard key={item.id} {...item} />;
                        })}
                    </div>

                    {/* Latest on Our blog  */}
                    <br />
                    <div className="w-full flex flex-col items-center gap-8">
                        <h1 className="text-primaryBlack text-[2rem] font-[600] font-playfair w-full text-center">
                            Latest on Our blog
                        </h1>
                        <div className="relative w-full md:w-[60vw]">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <svg
                                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        stroke="currentColor"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                                    />
                                </svg>
                            </div>
                            <input
                                title="Search"
                                placeholder="Search an article"
                                className="text-center p-boxS rounded-xl w-full md:w-[60vw] focus:ring-text3 focus:border-text3"
                                onChange={handleSearch}
                            />
                        </div>
                        {/* Content Mapping */}
                        <div
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3
                        w-full justify-between gap-5"
                        >
                            {filterData(BlogDatas, keywords).map(
                                (item: BlogProps | any) => {
                                    return <BlogCard key={item.id} {...item} />;
                                }
                            )}
                        </div>
                    </div>

                    {/* Pagination */}
                    <div className="flex flex-row gap-2 w-full justify-evenly">
                        {Blogs.links.map((link: any, index: number) => {
                            return (
                                <Link
                                    key={index}
                                    dangerouslySetInnerHTML={{
                                        __html: link.label,
                                    }}
                                    className="text-primaryBlack bg-white p-boxS rounded-xl whitespace-nowrap
                                    hover:opacity-20 w-full text-center
                                    shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] font-niramit
                                    "
                                    href={link.url}
                                />
                            );
                        })}
                    </div>
                </div>
            </div>
        </Guest>
    );
}

// Card at the top
const HeadCard = (item: any) => {
    return (
        <Link
            href={`/blog/${item?.slug}`}
            className=" bg-[#F3F0EB] rounded-xl shadow-md hover:shadow-lg cursor-pointer border-[#AD9B87] border-[0.15rem]
            p-[1.5rem]
            md:p-[2.5rem]
            "
        >
            <div
                className="flex flex-col justify-center items-start gap-[0rem] md:gap-[1rem]
                w-full"
            >
                {/* Image */}
                <div
                    className="w-full h-auto aspect-[31/25] mb-[0.5rem] bg-cover
                    bg-center
                    rounded-xl
                    "
                    style={{ backgroundImage: `url(${item?.image})` }}
                />
                {/* Created at */}
                <div>
                    <h1 className="text-primaryBlack text-opacity-50 text-[1rem]">
                        {convertDate(item?.updated_at)}
                    </h1>
                </div>
                {/* Title */}
                <div>
                    <h1 className="text-primaryBlack font-playfair font-[600] text-[2rem] text-left">
                        {item?.title}
                    </h1>
                </div>
                {/* Description */}
                <div
                    className="text-primaryBlack text-[1.125rem] font-niramit mb-[1rem]
                    overflow-hidden h-[5rem] text-left line-clamp-3"
                >
                    {item?.preview}
                </div>
                <Link
                    href={`/blog/${item?.slug}`}
                    className=" bg-none py-[1rem] px-[2rem] hover:opacity-20 w-full md:w-fit
                    text-primaryBlack text-center text-[1.25rem] font-normal font-niramit
                    border-[0.05rem] border-[#AD9B87] rounded-[0.3125rem]"
                >
                    Read More
                </Link>
            </div>
        </Link>
    );
};

// Card at the bottom
const BlogCard = (item: any) => {
    return (
        <Link
            href={`/blog/${item?.slug}`}
            className="p-boxS rounded-xl flex flex-col gap-2 hover:shadow-lg
            w-full"
        >
            <div className="flex flex-col justify-center items-start relative">
                {/* Image */}
                <div
                    className="w-full h-auto aspect-[22/18] mb-[0.5rem] relative bg-cover
                    bg-center
                    "
                    style={{ backgroundImage: `url(${item?.image})` }}
                >
                    <div
                        className="bg-[#F3F0EBB2] bg-opacity-70 w-full absolute bottom-0 left-0 p-[1rem]
                        text-primaryBlack "
                    >
                        {convertDate(item?.updated_at)}
                    </div>
                </div>
                {/* Title */}
                <div>
                    <h1 className="text-primaryBlack font-playfair font-bold text-[1.375rem]">
                        {item?.title}
                    </h1>
                </div>
                {/* Description */}
                <div
                    className="text-primaryBlack
                    text-[1.125rem] font-niramit font-[300]
                    line-clamp-4 h-[7rem] overflow-hidden"
                >
                    {item?.preview}
                </div>
                <Link
                    href={`/blog/${item?.slug}`}
                    className="bg-[#F3F0EB] p-[1rem] hover:opacity-20 text-center
                    rounded-[0.3125rem] w-full
                    text-primaryBlack font-niramit
                    shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]
                    "
                >
                    Read More
                </Link>
            </div>
        </Link>
    );
};
