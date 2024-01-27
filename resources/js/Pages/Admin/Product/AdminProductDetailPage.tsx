import { BackButton, CloseButton, DeleteButton, SaveButton } from '@/Components/Button'
import { EditIcon, PlusIcon } from '@/Components/Icon'
import { InputError, Label } from '@/Components/Input'
import { ModalOverlay } from '@/Components/Modal'
import { ImageModal } from '@/Components/TextEditor/ImageModal'
import TextEditor from '@/Components/TextEditor/TextEditor'
import { Toast } from '@/Components/Toast'
import AdminLayout from '@/Layouts/AdminLayout'
import { AddNewMaterial, AddNewMaterialItem, EditMaterial, EditMaterialItem, UpdateProduct } from '@/Services/ProductServices'
import { Rupiah } from '@/Utils/Currency'
import { ProductMaterialItemProps, ProductMaterialProps, ProductProps } from '@/types/product'
import { router } from '@inertiajs/react'
import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form"


export default function AdminProductDetailPage({ Product }: { Product: ProductProps }) {
    const {
        register,
        handleSubmit,
        getValues,
        setValue,
        formState: { errors },
    } = useForm<ProductProps>({ defaultValues: Product })

    const imageState = getValues('image')
    const registerImage = register('image', { required: true })
    const registerDescription = register('description')


    const onSubmit = handleSubmit((data) => {
        data.id = Product?.id
        UpdateProduct(data)
            .then((res) => {
                console.log(res)
                setStatus('success')
            })
            .catch((err) => {
                console.log(err)
                setStatus('error')
            })
    })

    const [status, setStatus] = React.useState<any>(false); //

    // if handlePublish triggered, set status to false in 3 seconds
    useEffect(() => {
        setTimeout(() => {
            setStatus(false)
        }, 3000)
    }, [status])


    // image upload
    const [isModalImageUploadOpen, setIsModalImageUploadOpen] = useState(false);
    const showModal = () => {
        setIsModalImageUploadOpen(true);
    };

    const handleCloseImageModal = () => {
        setIsModalImageUploadOpen(false);
    };


    // edit and add material
    const [isModalMaterialOpen, setIsModalMaterialOpen] = useState(false);
    const [currentMaterial, setCurrentMaterial] = useState<ProductMaterialProps>()
    const handleOpenModalMaterial = (material: ProductMaterialProps) => {
        setCurrentMaterial(material)
        setIsModalMaterialOpen(true)
    };
    // edit and add material item
    const [isModalMaterialItemOpen, setIsModalMaterialItemOpen] = useState(false);
    const [currentMaterialItem, setCurrentMaterialItem] = useState<ProductMaterialItemProps>()
    const handleOpenModalMaterialItem = (materialitem?: ProductMaterialItemProps) => {
        if (materialitem === undefined) {
            materialitem = {
                productmaterial_id: currentMaterial?.id,
                price: 0
            }
        };
        setCurrentMaterialItem(materialitem) // if materialitem is undefined, it will be add new material item
        setIsModalMaterialItemOpen(true)
    };

    return (<>
        <AdminLayout>
            <Toast
                show={status}
                message={status}
            />
            <section
                className='flex flex-col gap-[1rem] p-boxS bg-[#f0f3f5]'
            >
                <div
                    className='flex justify-between items-center gap-2 p-boxS bg-white'
                >
                    <BackButton href='/admin/product' />
                    <div
                        className='flex gap-2'
                    >
                        <DeleteButton
                        />
                        <SaveButton
                            onClick={onSubmit}
                        />
                    </div>
                </div>

                {/* edit content */}
                <form
                    onSubmit={onSubmit}
                    className='flex flex-col gap-[2rem] p-boxS bg-white'
                >
                    <div
                    >
                        <Label required>
                            Product Name
                        </Label>
                        <InputError message={errors.name && "Name is required"} />
                        <input
                            id='title'
                            placeholder='Product Name'
                            className='w-full p-[0.5rem] rounded-md bg-[#f0f3f5]'
                            type="text"
                            {...register("name", { required: true })}
                        />
                    </div>

                    <div
                        className='flex flex-col gap-1'
                    >
                        <Label required>
                            Image
                        </Label>
                        <InputError
                            message={errors.image && "Image is required"}
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
                                        setValue('image', url)
                                        registerImage.onChange(url as any)
                                    }}
                                    isOpen={isModalImageUploadOpen}
                                    onClose={handleCloseImageModal}
                                />
                                <img
                                    className='w-[1.5rem] h-[1.5rem] gap-[1rem] inline-flex justify-center items-center'
                                    src="https://www.svgrepo.com/show/458202/folder-open.svg" alt="" />
                                Upload Image
                            </div>
                            <div
                                className={`flex justify-center items-center ${imageState ? 'flex' : 'hidden'}`}
                            >
                                <img
                                    className='w-full h-full object-contain rounded-xl'
                                    src={imageState}
                                />
                            </div>
                        </div>
                    </div>
                    <div>
                        <Label required>
                            Description
                        </Label>
                        <InputError
                            message={errors.description && "Description is required"}
                        />
                        <TextEditor
                            data={Product?.description}
                            setContent={
                                (value: any) => {
                                    setValue('description', value.content)
                                    registerDescription.onChange(value.content as any)
                                }
                            }
                        />
                    </div>
                    <div
                        className='flex flex-col gap-1'
                    >
                        <Label required>
                            Price
                        </Label>
                        <InputError
                            message={errors.price && "Price is required"}
                        />
                        <input
                            placeholder='Price'
                            id='price'
                            className='w-full p-[0.5rem] rounded-md bg-[#f0f3f5]'
                            type="number"
                            {...register("price", { required: true })}
                        />
                    </div>

                    <div>
                        <Label>
                            Material
                        </Label>
                        <div
                            className='flex flex-col gap-1'
                        >
                            {
                                Product?.productmaterial?.map((productmaterial: ProductMaterialProps) => {
                                    return (
                                        <section
                                            className='flex flex-col gap-1 p-boxS bg-[#f0f3f5]'
                                        >
                                            <header
                                                className='flex flex-row justify-between p-[1rem]'
                                            >
                                                <div
                                                >
                                                    <h1
                                                        className='text-primaryBlack font-niramit font-[500] text-[1.125rem]'
                                                    >
                                                        {productmaterial.name}
                                                    </h1>

                                                    <h3>
                                                        {productmaterial.description}
                                                    </h3>
                                                </div>
                                                <button
                                                    type='button'
                                                    onClick={() => handleOpenModalMaterial(productmaterial)}
                                                    className='bg-primary text-white p-boxS rounded-xl hover:bg-opacity-70'
                                                >
                                                    <EditIcon className='invert w-[1rem]' />
                                                </button>
                                            </header>
                                            <div
                                                className='flex flex-col gap-2'
                                            >
                                                {
                                                    productmaterial.productmaterialitems?.map((productmaterialitem: ProductMaterialItemProps) => {
                                                        return (
                                                            <div
                                                                className='flex flex-row justify-between items-center gap-2 p-boxS bg-white rounded-xl
                                                                shadow-sm border border-gray-300'
                                                            >

                                                                <h1
                                                                    className='text-primaryBlack font-niramit font-[500] text-[1.125rem] flex flex-nowrap justify-center items-center gap-3'
                                                                >
                                                                    <div
                                                                        className='w-[1rem] h-[1rem] bg-primaryAdmin rounded-xl'
                                                                    />
                                                                    {productmaterialitem.name}
                                                                </h1>

                                                                <div
                                                                >
                                                                    {Rupiah(productmaterialitem.price)}
                                                                </div>

                                                                <button
                                                                    type='button'
                                                                    onClick={() => {
                                                                        handleOpenModalMaterialItem(productmaterialitem)
                                                                    }}
                                                                    className='bg-primary text-white p-[0.6rem] rounded-xl hover:bg-opacity-70'
                                                                >
                                                                    <EditIcon className='invert w-[1rem]' />
                                                                </button>
                                                            </div>
                                                        )
                                                    })
                                                }
                                                <button
                                                    type='button'
                                                    onClick={() => {
                                                        handleOpenModalMaterialItem({
                                                            productmaterial_id: productmaterial.id,
                                                            price: 0
                                                        })
                                                    }}
                                                    className='bg-primary text-white p-boxS rounded-xl hover:bg-opacity-70'
                                                >
                                                    Add New Material Item <PlusIcon className='invert w-[1rem]' />
                                                </button>
                                            </div>
                                        </section>
                                    )
                                })
                            }
                            <button
                                onClick={() => setIsModalMaterialOpen(true)}
                                type='button'
                                className='bg-primary text-white p-boxS rounded-xl hover:bg-opacity-70'
                            >
                                Add New Material <PlusIcon className='invert w-[1rem]' />
                            </button>
                        </div>
                    </div>

                    <button
                        onClick={onSubmit}
                        type='submit'
                        className='bg-primaryAdmin text-white p-boxS rounded-xl hover:bg-opacity-70'
                    >
                        Save as Draft
                    </button>
                </form>
                {/* add on modal */}
            </section>
        </AdminLayout >

        <MaterialModal
            isOpen={isModalMaterialOpen}
            onClose={() => setIsModalMaterialOpen(false)}
            material={currentMaterial}
        />
        <MaterialItemModal
            isCreate={true}
            isOpen={isModalMaterialItemOpen}
            onClose={() => setIsModalMaterialItemOpen(false)}
            materialitem={currentMaterialItem}
        />
    </>
    )
}


// Edit Material Modal
const MaterialModal = ({ material, isOpen, onClose, isCreate }:
    {
        isCreate?: boolean,
        material?: ProductMaterialProps,
        isOpen: boolean,
        onClose: () => void
    }) => {
    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors },
    } = useForm<ProductMaterialProps>({ defaultValues: material })

    useEffect(() => {
        if (isCreate) {
            reset()
        }
        if (material?.id !== undefined) {
            setValue('name', material?.name)
            setValue('description', material?.description)
        }
    }, [material])

    const onSubmit = handleSubmit((data) => {
        if (material?.id === undefined) {
            AddNewMaterial(data)
                .then((res) => {
                    console.log(res)
                    onClose && onClose()
                })
                .catch((err) => {
                    console.log(err)
                })
        }
        else {
            data.id = material?.id
            EditMaterial(data)
                .then((res) => {
                    console.log(res)
                    onClose && onClose()
                    router.reload()
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    })

    return (
        <>
            <ModalOverlay
                onClose={() => { onClose && onClose() }}
                show={isOpen}
            >
                <section
                    className='flex flex-col gap-[1rem] p-boxS bg-[#f0f3f5]
                    h-fit min-w-fit w-[40vw] overflow-y-scroll'
                >
                    <header className='flex justify-between'>
                        <h1
                            className='text-primaryBlack font-niramit font-[500] text-[1.5rem]'
                        >
                            {material?.name ? `Edit ${material?.name}` : 'Add New Material'}
                        </h1>
                        <CloseButton
                            onClick={() => { onClose && onClose() }}
                        />
                    </header>
                    {/* edit content */}
                    <form
                        className='flex flex-col gap-[2rem] p-boxS bg-white'
                    >
                        <div title='Title of the blog'>
                            <Label required>
                                Material Name
                            </Label>
                            <InputError
                                message={errors.name && "Name is required"}
                            />
                            <input
                                id='name'
                                className='w-full p-[0.5rem] rounded-md bg-[#f0f3f5]'
                                placeholder='Material Name'
                                {...register("name", { required: true })}
                            />
                        </div>

                        {/* article content */}
                        <div>
                            <Label required>
                                Description
                            </Label>
                            <InputError
                                message={errors.description && "Description is required"}
                            />
                            <textarea
                                id='content'
                                placeholder='Description'
                                className='w-full p-[0.5rem] rounded-md bg-[#f0f3f5]'
                                {...register("description", { required: true })}
                            >
                            </textarea>
                        </div>
                        <button
                            onClick={onSubmit}
                            className='bg-primary text-white p-boxS rounded-xl hover:bg-opacity-70'
                        >
                            Submit
                        </button>
                    </form>
                </section>
            </ModalOverlay>
        </>
    )
}


const MaterialItemModal = ({ materialitem, isOpen, onClose, isCreate }: {
    isCreate?: boolean,
    materialitem?: ProductMaterialItemProps,
    isOpen: boolean,
    onClose: () => void
}) => {
    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors },
    } = useForm<ProductMaterialItemProps>({ defaultValues: materialitem })

    useEffect(() => {
        if (isCreate) {
            reset()
        }
        if (materialitem?.id !== undefined) {
            setValue('name', materialitem?.name)
            setValue('price', materialitem?.price)
        }
    }, [materialitem])

    const onSubmit = handleSubmit((data) => {
        data.productmaterial_id = materialitem?.productmaterial_id
        if (materialitem?.id === undefined) {
            AddNewMaterialItem(data)
                .then((res) => {
                    console.log(res)
                    onClose && onClose()
                })
                .catch((err) => {
                    console.log(err)
                })
        }
        else {
            data.id = materialitem?.id
            EditMaterialItem(data)
                .then((res) => {
                    console.log(res)
                    onClose && onClose()
                    router.reload()
                })
                .catch((err) => {
                    console.log(err)
                })
        }
        router.reload()
    })

    return (<>

        <ModalOverlay
            onClose={onClose}
            show={isOpen}
        >
            <section
                className='flex flex-col gap-[1rem] p-boxS bg-[#f0f3f5]
                    h-fit min-w-fit w-[40vw] overflow-y-scroll'
            >
                <header className='flex justify-between'>
                    <h1
                        className='text-primaryBlack font-niramit font-[500] text-[1.5rem]'
                    >
                        {materialitem?.name ? `Edit ${materialitem?.name}` : 'Add New Material'}
                    </h1>
                    <CloseButton
                        onClick={() => { onClose && onClose() }}
                    />
                </header>
                {/* edit content */}
                <form
                    onSubmit={onSubmit}
                    className='flex flex-col gap-[2rem] p-boxS bg-white'
                >
                    <div title='Title of the blog'>
                        <Label required>
                            Material Name
                        </Label>
                        <InputError
                            message={errors.name && "Name is required"}
                        />

                        <input
                            id='name'
                            className='w-full p-[0.5rem] rounded-md bg-[#f0f3f5]'
                            placeholder='Material Name'
                            {...register("name", { required: true })}
                        />
                    </div>

                    {/* article content */}
                    <div>
                        <Label required>
                            Price
                        </Label>
                        <InputError
                            message={errors.price && "Price is required"}
                        />
                        <input
                            id='price'
                            placeholder='Price'
                            className='w-full p-[0.5rem] rounded-md bg-[#f0f3f5]'
                            type="number"
                            {...register("price", { required: true })}
                        />
                    </div>
                    <button
                        onClick={onSubmit}
                        className='bg-primary text-white p-boxS rounded-xl hover:bg-opacity-70'
                    >
                        Submit
                    </button>
                </form>
            </section>
        </ModalOverlay>
    </>)
}