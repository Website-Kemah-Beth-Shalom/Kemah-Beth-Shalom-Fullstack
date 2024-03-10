import { AdminTopBar } from '@/Components/Admin-Layout-Component'
import { AddButton, CloseButton, ViewButton } from '@/Components/Button'
import { ModalOverlay } from '@/Components/Modal'
import { ImageModal } from '@/Components/TextEditor/ImageModal'
import { useImages } from '@/Hooks/useImages'
import AdminLayout from '@/Layouts/AdminLayout'
import { changeStatusGalleryImage } from '@/Services/GalleryServices'
import { ImageProps } from '@/types'
import { Head, Link, router } from '@inertiajs/react'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'


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
                    className='flex flex-col gap-2 p-boxS max-w-screen overflow-x-hidden'
                >
                    <AdminTopBar
                        title='Gallery'
                    >
                        <ViewButton
                            onClick={() => window.open('/gallery', '_blank')}
                        />
                        <AddButton
                            onClick={handleOpenModalImage}
                        />
                    </AdminTopBar>
                    {/* content */}
                    <div className='flex flex-row gap-2 w-full overflow-x-hidden overflow-y-hidden'>
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

    const handleRemove = () => {
        changeStatusGalleryImage(props.id, false)
            .then(() => {
                router.reload()
                toast.success('Image removed successfully')
            })
            .catch((err) => {
                console.log(err)
                toast.error('Failed to remove image')
            })
    }

    const [showModal, setShowModal] = React.useState(false)

    return (
        <>
            <button
                type='button'
                onClick={() => setShowModal(true)}
            >
                <img
                    className='w-[10rem] h-[10rem] object-cover  shadow-sm
                    border border-gray-300'
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
                        justify-between w-full
                        min-w-[20rem] h-[3rem]
                        '
                    >
                        <h1
                            className='capitalize text-primaryBlack font-semibold '
                        >
                            Remove Image
                        </h1>
                        <CloseButton
                            onClick={() => setShowModal(false)}
                        />
                    </header>
                    <button
                        onClick={handleRemove}
                        className='bg-red-500 text-white p-boxS rounded-lg w-full'
                    >
                        Remove
                    </button>
                </section>

            </ModalOverlay >
        </>
    )
}