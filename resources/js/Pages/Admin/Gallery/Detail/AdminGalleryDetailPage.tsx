import { ImageModal } from '@/Components/TextEditor/ImageModal'
import TextEditor from '@/Components/TextEditor/TextEditor'
import AdminLayout from '@/Layouts/AdminLayout'
import { CreateBlog, SaveBlogasDraft, deleteBlog } from '@/Services/BlogServices'
import { useDebounce } from '@/Utils/Hooks'
import { Link, router } from '@inertiajs/react'
import React, { useEffect, useState } from 'react'
import { useBlog } from '@/Hooks/useBlog'
import { BlogProps } from '@/types'


interface Props {
    id: number,
    isOpen: boolean,
    onClose: () => void,
    onOpen: () => void,
    onAddImage: (url: string) => void,
}


// this is modal
export default function AdminBlogDetailPage({
    id,
    isOpen,
    onClose,
    onOpen,
    onAddImage,
}: Props) {
    const [isDraft, setIsDraft] = useState(false)
    return (
        <div>
            <ImageModal
                isOpen={isOpen}
                onClose={onClose}
                onAddImage={onAddImage}
            />
        </div>
    )
}