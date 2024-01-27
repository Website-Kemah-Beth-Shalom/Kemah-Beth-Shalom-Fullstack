import AdminLayout from '@/Layouts/AdminLayout'
import { convertDate } from '@/Utils/ConvertDate'
import { BlogProps, PaginateBlogProps } from '@/types'
import { router } from '@inertiajs/react'
import React, { useEffect } from 'react'

export default function AdminBlogTrashPage({ trash }: { trash: PaginateBlogProps }) {
    const handleRestore = (id: number) => {
        console.log("restore: ", id)
        router.post(`/admin/blog/trash/${id}/restore`)
    }

    const handleDelete = (id: number) => {
        console.log("delete: ", id)
        router.post(`/admin/blog/trash/${id}/delete`)
    }

    return (
        <AdminLayout>
            <div
                className='flex flex-col justify-between items-center p-boxS bg-[#f0f3f5] w-full'
            >
                <h1
                    className='text-4xl font-semibold mb-3'
                >
                    Blog Trash
                </h1>
                <h2>
                    {trash.total} Blogs
                </h2>
                {/* search button */}
            </div>
            <div
                className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5 p-5 w-full p-boxXl'
            >
                {
                    trash.data.map((blog: BlogProps) => {
                        return <Card
                            blog={blog}
                            onRestore={handleRestore}
                            onDelete={handleDelete}
                        />
                    })
                }
            </div>
        </AdminLayout>
    )

}


interface BlogCardProps {
    onRestore: (id: number) => void
    onDelete: (id: number) => void
    blog: BlogProps
}

const Card = ({ blog, onRestore, onDelete }: BlogCardProps) => {
    return (
        <div
            className='bg-white p-2 rounded-xl p-boxS flex flex-col gap-2 shadow-md cursor-pointer w-[15rem] h-fit'
        >
            <div
                className='flex flex-col gap-2'
            >
                <h1
                    className='text-primaryBlack font-semibold truncate'
                >
                    {blog.title}
                </h1>
                <p
                    className='text-primaryBlack truncate'
                >
                    {blog.preview}
                </p>
            </div>
            <p
                className='text-gray-400 text-sm opacity-80'
            >
                Deleted at: {convertDate(blog.created_at)}
            </p>
            <div
                className='flex flex-row gap-2'
            >
                <button
                    onClick={() => onRestore(blog.id)}
                    className={` ${ButtonStyle} bg-primary text-white `}
                >
                    Restore
                </button>
                <button
                    onClick={() => onDelete(blog.id)}
                    className={` ${ButtonStyle} bg-primaryRed text-white `}
                >
                    Delete
                </button>
            </div>
        </div>
    )
}


// Styling
const ButtonStyle = 'bg-primary text-white p-boxS rounded-lg hover:opacity-80'