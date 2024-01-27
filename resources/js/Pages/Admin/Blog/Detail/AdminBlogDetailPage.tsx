import { ImageModal } from '@/Components/TextEditor/ImageModal'
import TextEditor from '@/Components/TextEditor/TextEditor'
import AdminLayout from '@/Layouts/AdminLayout'
import { CreateBlog, SaveBlogasDraft, deleteBlog } from '@/Services/BlogServices'
import { useDebounce } from '@/Utils/Hooks'
import { Link, router } from '@inertiajs/react'
import React, { useEffect, useState } from 'react'
import { useBlog } from '@/Hooks/useBlog'
import { BlogProps } from '@/types'
import { Toast } from '@/Components/Toast'
import { BackButton, DeleteButton, PublishButton, SaveButton } from '@/Components/Button'
import { useForm } from 'react-hook-form'
import { InputError, Label } from '@/Components/Input'
import { DevTool } from '@hookform/devtools'


export default function AdminBlogDetailPage({ Blog }: { Blog: BlogProps }) {
    const {
        register,
        handleSubmit,
        getValues,
        setValue,
        control,
        formState: { errors },
    } = useForm<BlogProps>({ defaultValues: Blog })
    const registerImage = register('image')
    const registerDescription = register('description')
    const imageState = getValues('image')

    const [status, setStatus] = React.useState<any>(false); //

    const handleSaveasDraft = handleSubmit((data) => {
        SaveBlogasDraft(data).then((res) => {
            setStatus('success')
        }
        ).catch(() => {
            setStatus('error')
        })
    })

    const handlePublish = handleSubmit((data: BlogProps) => {
        try {
            const formData = new FormData();
            Object.entries(data).forEach(([key, value]) => {
                formData.append(key, value);
            });

            router.post(`/admin/blog/publish`, formData, {
                forceFormData: true,
                onSuccess: () => {
                    setStatus('publish');
                },
                onError: () => {
                    setStatus('error');
                }
            })
        } catch (error) {
            setStatus('error')
        }
    }
    )

    const handleDelete = () => {
        deleteBlog(Blog.id).then(() => {
            router.get('/admin/blog')
        }).catch(() => {
            setStatus('error')
        })
    }

    // if handlePublish triggered, set status to false in 3 seconds
    useEffect(() => {
        setTimeout(() => {
            setStatus(false)
        }, 3000)
    }, [status])


    // image upload
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    return (
        <AdminLayout>
            <Toast
                show={status}
                message={status}
            />
            <div
                className='flex flex-col gap-[1rem] p-boxS bg-[#f0f3f5]'
            >
                <div
                    className='flex justify-between items-center gap-2 p-boxS bg-white'
                >

                    <BackButton
                        href='/admin/blog'
                    />
                    <div
                        className='flex gap-2'
                    >
                        {/* delete button */}
                        <DeleteButton
                            onClick={handleDelete}
                        />

                        {/* save as draft (not published yet) */}
                        <SaveButton
                            onClick={handleSaveasDraft}
                        />

                        {/* publish button */}
                        <PublishButton
                            onClick={handlePublish}
                        />
                    </div>
                </div>

                {/* edit content section */}
                <div
                    className='flex flex-col gap-[2rem] p-boxS bg-white'
                >
                    <div title='Title of the blog'>
                        <Label required>
                            Title
                        </Label>
                        <InputError message={errors.title && 'Title is required'} />
                        <input
                            id='title'
                            placeholder='Title of the blog'
                            className='w-full p-[0.5rem] rounded-md bg-[#f0f3f5]'
                            type="text"
                            {...register('title', { required: true })}
                        />
                    </div>
                    <div className='flex flex-col gap-1'>
                        <Label required>
                            Image
                        </Label>
                        <InputError
                            message={errors.image && 'Image is required'}
                        />
                        <div
                            className='flex flex-col gap-2 bg-[#f0f3f5] p-[0.5rem] rounded-md'
                        >
                            <div
                                className='text-primaryBlack p-boxS rounded-xl cursor-pointer mt-[0.5rem] hover:bg-[#b7b7b7]
                            border border-[#AD9B87] flex justify-center items-center'
                                onClick={showModal}
                            >
                                <ImageModal
                                    onAddImage={(url: string) => {
                                        // setFile(url)
                                        setValue('image', url)
                                        registerImage.onChange(url as any)
                                    }}
                                    isOpen={isModalOpen}
                                    onClose={handleOk}
                                />
                                <img
                                    className='w-[1.5rem] h-[1.5rem] gap-[1rem] inline-flex justify-center items-center'
                                    src="https://www.svgrepo.com/show/458202/folder-open.svg"
                                    alt=""
                                />
                                Upload Image
                            </div>
                            <div
                                className={`flex justify-center items-center ${imageState ? 'flex' : 'hidden'}`}
                            >
                                <img
                                    className='w-full h-full
                                    max-h-[30rem]
                                    object-contain rounded-xl'
                                    src={imageState}
                                />
                            </div>
                        </div>
                    </div>

                    {/* slug for blog */}
                    <div>
                        <Label required>
                            Slug
                        </Label>
                        <InputError
                            message={errors.slug && 'Slug is required'}
                        />
                        <input
                            id='slug'
                            placeholder='Slug for the blog'
                            className='w-full p-[0.5rem] rounded-md bg-[#f0f3f5]'
                            type="text"
                            {...register('slug', { required: true })}
                        />
                    </div>

                    {/* article content */}
                    <div>
                        <Label required>
                            Article Content
                        </Label >
                        <InputError
                            message={errors.description && "Description is required"}
                        />
                        <TextEditor
                            data={Blog?.description}
                            setContent={
                                (value: any) => {
                                    setValue('description', value.content)
                                    registerDescription.onChange(value.content as any)
                                }
                            }
                        />
                    </div>
                </div>
            </div>
            {/* <DevTool control={control} /> */}
        </AdminLayout >
    )
}

