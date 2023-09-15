import { PageProps } from '@/types'
import { Card, Space, Button, Modal } from 'antd'
// import { EuiButton as Button, EuiFieldText as Input } from '@elastic/eui'
import React, { useEffect, useState, useRef} from 'react'
import { Link, useForm } from '@inertiajs/react'
import { router } from '@inertiajs/react'
import TestimoniCreate from '@/Components/Testimoni/FormAddTesti';

const TestiCard = (testimoni: any) => {
    const { data, setData, post, processing, errors } = useForm({
        id: testimoni.id,
        name: testimoni.name,
        description: testimoni.description,
    })
    // submit form 

    const handleDelete = (id: number) => {
        const confirmDelete = window.confirm('are you sure want to delete this?');

        if (confirmDelete){
            router.delete(`/testimonials/${id}`); 
        }
    }
    // handle change
    const handleChange = (e: any) => {
        const key = e.target.id;
        const value = e.target.value;
        setData(data => ({
            ...data,
            [key]: value, 
        }))
    }

    const handleSubmit = (e: any) => {
        e.preventDefault()
        console.log(data)
        router.post(`/testimonials/${data.id}`, data, {
            forceFormData: true,
        })
    }

    const textAreaRef = useRef <HTMLTextAreaElement | null> (null);

    useEffect(() => {
        textAreaRef.current.style.height = "auto";
        textAreaRef.current.style.height = textAreaRef.current.scrollHeight + "px";
    },[testimoni.description])

    return (
        <>          

        {/* form nanti harus dihapus */}
        <form
            onSubmit={handleSubmit}
            className="bg-white overflow-hidden shadow-sm sm:rounded-lg
            w-[33rem] h-auto flex flex-col gap-3 m-2
            p-5"
        >

            <input className='border-none outline-none font-medium text-black text-[1.75rem] capitalize mb-[1rem] focus:border-none focus:outline-none active:border-none active:outline-none'
                type='text'
                defaultValue={testimoni.name}
                onChange={handleChange}
                id='name'/>
               
            <textarea className='text-[1.5rem] w-[100%] h-auto leading-relaxed normal-case resize-none overflow-hidden border-none outline-none focus:border-transparent'
                defaultValue={testimoni.description}
                onChange={handleChange}
                id='description'
                ref={textAreaRef}
                rows={2}
            />
            
            <Space wrap className='flex justify-center items-end'>

                <button
                    type='submit'
                    disabled={processing}
                    className="bg-blue-500 hover:bg-blue-700 text-white text-[1.4rem] font-bold py-2 px-4 rounded-lg"
                >
                    Submit
                </button>

                <Button danger onClick={() => handleDelete(testimoni.id)}>Delete</Button>
            </Space>
        </form>
        </>
    )

    
}

export default function TestingPage({ testimonies }: PageProps<{ testimonies: any }>) {
    // useEffect(() => {
    //     console.log(webconfigs)
    // }, [])
    return (
        <div
            id="testimoni-page"
            className="py-12 text-black flex flex-col justify-center sm:py-12 items-center"
        >
            <div className="w-auto">
                <h1
                    className='text-4xl font-bold text-white mb-8'>
                    Testimonies
                </h1>
            </div>
            <hr className='w-[60%] h-[2px] bg-white mb-[5rem]'/>
            
            <TestimoniCreate/>

            <h3 className='text-white text-[2rem] mb-[2rem] border-b-2'>Edit Testimoni</h3>
            <div className="flex flex-row flex-wrap w-[100vw] h-auto px-[8rem]">
                {
                    testimonies.map((testimoni: any) => {
                        return (
                            
                            <TestiCard key={testimoni.id}
                                {...testimoni}
                            />
                        
                        )
                    })
                }  
            </div>
        </div>
    )
}

