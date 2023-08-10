import { Input, Upload } from 'antd'
import React, { useState } from 'react'
import { router, useForm } from '@inertiajs/react'

export default function ProductEditCard(ProductData: any) {
    // ✨ form logic

    const { data, setData, post, progress } = useForm({
        id: ProductData.id,
        title: ProductData.title,
        description: ProductData.description,
        slug: ProductData.slug,
        price: ProductData.price,
        image: ProductData.image,

    })

    function handleChange(e: any) {
        const key = e.target.id;
        const value = e.target.value
        setData(data => ({
            ...data,
            [key]: value,
        }))
    }

    function handleSubmit(e: any) {
        e.preventDefault()
        console.log(data)
        router.post(`/admin/product/${data.id}`, data, {
            forceFormData: true,
        })
    }


    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white overflow-hidden shadow-sm sm:rounded-lg m-10"
        >
            <Input className="text-gray-500"
                defaultValue={data.title}
                onChange={handleChange}
                id='title'
            />
            <Input className="text-gray-500"
                defaultValue={data.description}
                onChange={handleChange}
                id='description'
            />
            <Input className="text-gray-500"
                defaultValue={data.slug}
                onChange={handleChange}
                id='slug'
            />
            <Input className="text-gray-500"
                defaultValue={data.price}
                onChange={handleChange}
                id='price'
            />
            <input type='file' className='input
            text-black'
                id="image" onChange={(event: any) => setData('image', event.target.files[0])} />
            {/* <h1
                className='text-black'
            >{data.image}</h1> */}
            <br />
            <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                Save
            </button>
        </form>
    )
}