import { CloseButton } from '@/Components/Button'
import { InputError, Label } from '@/Components/Input'
import { ModalOverlay } from '@/Components/Modal'
import { ImageModal } from '@/Components/TextEditor/ImageModal'
import { useImages } from '@/Hooks/useImages'
import AdminLayout from '@/Layouts/AdminLayout'
import { changeStatusGalleryImage } from '@/Services/GalleryServices'
import { ImageProps } from '@/types'
import { Head, Link, router } from '@inertiajs/react'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'


type GalleryPageProps = {
    data: ImageProps[],
    links: any[],
}

export default function GalleryPage({ images }: { images: GalleryPageProps }) {
    const [keywords, setKeywords] = React.useState("")
    const [showFilterModal, setShowFilterModal] = React.useState(false)

    const { query } = useImages() as any;
    useEffect(() => {
        query.refetch();
    }, [query.data])

    const handleSearch = (e: any) => {
        setKeywords(e.target.value)
    }


    const [isModalImageOpen, setIsModalImageOpen] = React.useState(false)

    const handleOpenModalImage = () => {
        setIsModalImageOpen(true)
    }

    return (
        <>
            <Head>
                <title>Admin Gallery Page</title>
            </Head>

            <AdminLayout>
                <div
                    className='flex flex-col gap-2 p-boxS bg-[#f0f3f5] max-w-screen overflow-x-hidden'
                >
                    <div
                        className='flex flex-col justify-between items-center p-boxS bg-[#f0f3f5] w-full'
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
                        </div>
                    </div>

                    {/* content */}
                    <div className='flex flex-row gap-2 w-full overflow-x-hidden overflow-y-hidden'>
                        <div
                            className='bg-white rounded-xl p-boxS flex flex-col gap-2 shadow-md cursor-pointer w-[15rem] h-fit'
                        >
                            <button
                                onClick={handleOpenModalImage}
                                title='Create New Blog'
                                className='text-white font-poppins truncate w-full bg-green p-boxS rounded-xl
                            hover:opacity-80 text-center flex flex-row justify-center items-center gap-2 font-semibold'
                            >
                                New Image
                                <img
                                    title='Create New Blog'
                                    className='w-[1.5rem] h-[1.5rem] invert-[1]'
                                    src="https://www.svgrepo.com/show/532994/plus.svg" alt="" />
                            </button>

                            <Link

                                className='text-primaryBlack font-poppins truncate w-full bg-primaryWhite p-boxS rounded-xl
                            hover:opacity-80 text-center flex flex-row justify-center items-center gap-2 font-semibold
                            border border-[#AD9B87]'
                                href='/admin/blog/trash'
                            >
                                Trash Bin
                                <img
                                    className='w-[1.5rem] h-[1.5rem]'
                                    src="https://www.svgrepo.com/show/533007/trash.svg" alt="" />
                            </Link>
                        </div>
                        <div
                            className='flex flex-row gap-2 flex-wrap w-full overflow-x-hidden overflow-y-hidden'
                        >
                            {
                                images?.data?.map((item: ImageProps) => {
                                    return (
                                        <GalleryModal
                                            {...item}
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
                                        images.links.length > 3 && images.links.map((link: any) => {
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
                        </div>
                    </div>
                </div>
                <ImageModal
                    onAddImage={(url: string, id) => {
                        changeStatusGalleryImage(id, true)
                            .then(() => {
                                router.reload()
                            })
                            .catch((err) => {
                                console.log(err)
                            })
                    }}
                    isOpen={isModalImageOpen}
                    onClose={() => setIsModalImageOpen(false)}
                />

            </AdminLayout>

        </>
    )
}


const GalleryModal = (props: any) => {
    const { register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        defaultValues: {
            title: props.title,
            description: props.description
        }
    })


    const onSubmit = handleSubmit((data) => {
        console.log(data)
    })

    const [showModal, setShowModal] = React.useState(false)

    return (
        <>
            <button
                type='button'
                onClick={() => setShowModal(true)}
            >
                <img
                    className='w-[10rem] h-[10rem] object-cover rounded-xl'
                    src={props.thumbnail}
                    alt="" />
            </button>

            {/* Modal */}
            <ModalOverlay
                onClose={() => setShowModal(false)}
                show={showModal}
            >
                <section
                    className='flex flex-col gap-2 items-start justify-center bg-white
                    p-boxS rounded-xl shadow-xl'
                >
                    <header
                        className='flex flex-row
                        gap-2 items-center
                        justify-between w-full'
                    >
                        <h1
                            className='capitalize text-primaryBlack font-semibold font-poppins'
                        >
                            {props.title}
                        </h1>
                        <CloseButton
                            onClick={() => setShowModal(false)}
                        />
                    </header>
                    <div
                        className='w-full'
                    >
                        <Label required>
                            Title
                        </Label>
                        <InputError
                            message={errors.title && 'Title is required'}
                        />
                        <input
                            className='rounded-xl w-full'
                            type="text"
                            {...register('title', { required: true })}
                        />
                    </div>
                    <div
                        className='w-full'
                    >
                        <Label required>
                            Description
                        </Label>
                        <InputError
                            message={errors.title && 'Title is required'}
                        />
                        <input
                            className=' rounded-xl w-full'
                            type="text"
                            {...register('description')}
                        />
                    </div>
                    <button
                        className='bg-primary text-white p-boxS rounded-lg w-full'
                    >
                        Save
                    </button>
                    <button
                        className='bg-red-500 text-white p-boxS rounded-lg w-full'
                    >
                        Remove
                    </button>
                </section>

            </ModalOverlay >
        </>
    )
}