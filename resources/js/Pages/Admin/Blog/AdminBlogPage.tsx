import AdminLayout from '@/Layouts/AdminLayout'
import { convertDate } from '@/Utils/ConvertDate'
import { BlogProps, PaginateBlogProps } from '@/types'
import { Link, router } from '@inertiajs/react'
import React from 'react'

export default function AdminBlogPage({ Blogs }: { Blogs: PaginateBlogProps }) {
    const BlogData: BlogProps[] = Blogs.data

    const [showFilterModal, setShowFilterModal] = React.useState<boolean>(false)
    const handlePublish = (id: number) => {
        router.get(`/admin/blog/${id}/publish`)
    }

    const handleDetail = (id: number) => {
        router.get(`/admin/blog/${id}`)
    }

    const [keywords, setKeywords] = React.useState<string>("")

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setKeywords(e.target.value)
    }

    return (
        <AdminLayout>
            <section
                className='flex flex-col gap-2 p-boxS bg-[#f0f3f5] max-w-screen min-h-screen overflow-x-hidden'
            >
                <div
                    className='flex flex-col justify-between items-center    bg-[#f0f3f5] w-full'
                >

                    {/* search button */}
                    <div
                        className='flex gap-2 w-full'
                    >
                        <input
                            title='Search'
                            placeholder='Search'
                            className='p-boxS rounded-xl w-full'
                            onChange={handleSearch}
                        />
                        <button
                            className='p-boxS rounded-xl bg-primary text-white'
                            onClick={() => setShowFilterModal(true)}
                        >
                            Filter
                        </button>
                        {/* <FilterModal
                            setFilterData={setFilterData}
                            showModal={showFilterModal}
                            FilterData={FilterData}
                            setShowModal={setShowFilterModal}
                        /> */}
                    </div>
                </div>

                {/* content */}
                <div className='flex flex-row gap-2 w-full
                overflow-x-hidden overflow-y-hidden
                '>
                    <div
                        className='bg-white p-2 rounded-xl flex flex-col gap-2 shadow-md cursor-pointer w-[15rem] h-fit'
                    >
                        <Link
                            title='Create New Blog'
                            className='text-white font-poppins truncate w-full bg-primaryAdmin p-boxS rounded-xl
                            hover:opacity-80 text-center flex flex-row justify-center items-center gap-2 font-semibold'
                            href='/admin/blog/create'
                        >
                            Create New
                            <img
                                title='Create New Blog'
                                className='w-[1.5rem] h-[1.5rem] invert-[1]'
                                src="https://www.svgrepo.com/show/532994/plus.svg" alt="" />
                        </Link>

                        <Link

                            className='text-primaryAdmin font-poppins truncate w-full bg-primaryWhite p-boxS rounded-xl
                            hover:opacity-80 text-center flex flex-row justify-center items-center gap-2 font-semibold
                            border border-[#AD9B87]'
                            href='/admin/blog/trash'
                        >
                            Trash Bin
                            <img
                                className='w-[1.5rem] h-[1.5rem]
                                stroke-primaryAdmin'
                                src="https://www.svgrepo.com/show/533007/trash.svg" alt="" />
                        </Link>
                    </div>


                    {/* Content mapping */}
                    <section
                        className='flex flex-col gap-2 w-full'
                    >
                        <div
                            className='flex flex-row gap-2 text-opacity-50 text-primaryBlack text-[1rem]'
                        >
                            Showing {Blogs.from} - {Blogs.to} from {Blogs.total} data
                        </div>
                        {
                            filterData(BlogData, keywords, "title").map((item: BlogProps | any) => {
                                return (
                                    <BlogCard
                                        {...item}
                                        handlePublish={handlePublish}
                                        handleDetail={handleDetail}
                                    />
                                )
                            })
                        }

                        {/* Pagination */}
                        <div
                            className='flex flex-row gap-2 w-full'
                        >
                            <div
                                className='flex flex-row gap-2 max-w-[30rem] h-[3rem]
                                w-fit whitespace-nowrap
                                justify-between items-center'
                            >
                                {
                                    // Blogs.links
                                    Blogs.links.length > 3 && Blogs.links.map((link: any) => {
                                        if (link.active) {
                                            return (
                                                <Link
                                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                                    className='text-white bg-primary p-boxS hover:opacity-20 w-full text-center'
                                                    href={link.url}
                                                />
                                            )
                                        }
                                        return (
                                            <Link
                                                dangerouslySetInnerHTML={{ __html: link.label }}
                                                className='text-primaryBlack bg-white p-boxS hover:opacity-20 w-full text-center'
                                                href={link.url}
                                            />
                                        )
                                    }
                                    )}
                            </div>
                        </div>
                    </section>
                </div>
            </section>
        </AdminLayout>
    )
}



const BlogCard = (item: BlogProps) => {
    return (
        <Link
            title={item.published ? 'Published' : 'Not Published'}
            href={`/admin/blog/detail/${item.id}`}
            className='bg-white flex justify-normal items-center gap-[1rem]
            hover:bg-[#f0f3f5]
            p-[0.5rem] pr-[1rem]
            h-[6rem] pointer-events-auto cursor-pointer
            border-b border-x border-[#9e9e9e] border-opacity-50 relative'
        >
            {/* published */}
            <div
                className={`absolute top-0 left-0 w-[1rem] h-[1rem] rounded-full
                ${item.published ? 'bg-green' : 'bg-[#9e9e9e]'}`}
            />
            {/* Image */}
            <div
                className='h-full w-auto aspect-square bg-center bg-cover'
                style={{ backgroundImage: `url(${item.image})` }}
            />
            {/* Title */}
            <h1
                className='
                min-w-[10rem] w-fit
                text-primaryAdmin font-semibold text-left
                line-clamp-2'
            >
                {item.title}
            </h1>
            {/* Description */}
            <h2
                className='
                min-w-[10rem] w-full
                whitespace-normal line-clamp-3
                text-primaryAdmin font-semibold text-opacity-60'
            >
                {item.preview}
            </h2>
            {/* Created At */}
            <h3
                className='text-primaryAdmin font-semibold text-right
                min-w-[10rem] w-full'
            >
                Created {convertDate(item.created_at)}
            </h3>
        </Link>
    )
}



const filterData = (data: BlogProps[],
    search: string,
    type: string
) => {
    type = type.toLowerCase()
    search = search.toLowerCase()

    if (!search && !type) {
        return data
    }

    if (type === 'title') {
        return data.filter((item: BlogProps) => {
            return item.title.toLowerCase().includes(search)
        })
    }

    //published
    if (type === 'published') {
        return data.filter((item: BlogProps) => {
            // if item.published === 1 return all item
            return item.published === 1
        })
    } else if (type === 'not published') {
        return data.filter((item: BlogProps) => {
            // if item.published === 0 return all item
            return item.published === 0
        })
    }

    return data.filter((item: BlogProps) => {
        return item.title.toLowerCase().includes(search.toLowerCase())
    })
}

type FilterModalProps = {
    showModal: boolean,
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>,
    FilterData: any,
    setFilterData: React.Dispatch<React.SetStateAction<any>>
}
const FilterModal = ({
    showModal,
    setShowModal,
    FilterData,
    setFilterData,
}: FilterModalProps) => {

    return (
        <div
            onClick={() => setShowModal(false)}
            className={`absolute top-0 left-0 w-full h-full bg-primary bg-opacity-50
            flex flex-col justify-center items-center z-50
            ${showModal ? 'pointer-events-auto' : ' hidden pointer-events-none'}
            `}
        >
            <div
                className='bg-white p-boxS rounded-xl flex flex-col gap-2'
            >
                <h1
                    className='text-primaryBlack font-semibold text-[1.5rem]'
                >
                    Filter
                </h1>
                <div
                    className='flex flex-col gap-2'
                >
                    {/* check */}
                    <div
                        className='flex flex-row gap-2 items-center'
                    >
                        <input
                            type="checkbox"
                            checked={FilterData.published}
                            onChange={() => setFilterData({ ...FilterData, published: !FilterData.published })}
                        />
                        <h1
                            className='text-primaryBlack font-semibold'
                        >
                            Published
                        </h1>
                    </div>
                </div>
            </div>
        </div>
    )
}
