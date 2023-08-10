import { PageProps } from '@/types'
// import { Button } from 'antd'
// import { EuiButton as Button, EuiFieldText as Input } from '@elastic/eui'
import React, { useEffect } from 'react'
import { useForm } from '@inertiajs/react'
import { router } from '@inertiajs/react'

const Card = (webconfig: any) => {
    const { data, setData, post, processing, errors } = useForm({
        id: webconfig.id,
        title: webconfig.title,
        category: webconfig.category,
        value: webconfig.value,
    })
    // submit form 

    // handle change
    const handleChange = (e: any) => {
        const key = e.target.id;
        const value = e.target.value
        setData(data => ({
            ...data,
            [key]: value,
        }))
    }

    const handleSubmit = (e: any) => {
        e.preventDefault()
        console.log(data)
        router.post(`/admin/webconfig`, data, {
            forceFormData: true,
        })
        // post(route('admin.webconfig.update', data))
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white overflow-hidden shadow-sm sm:rounded-lg
            w-[50rem] m-10 flex flex-col gap-3
            p-5"
        >
            <h1 className="text-2xl font-bold">{webconfig.alias}</h1>


            {
                webconfig.type === 'image' ?
                    <input type='file' className='input border border-gray-400 rounded-md focus:outline-none        focus:ring-2 focus:ring-blue-600 focus:border-transparent text-black'
                        id="value"
                        onChange={(event: any) => setData('value', event.target.files[0])} />
                    :
                    <input className="text-gray-500"
                        defaultValue={webconfig.value}
                        onChange={handleChange}
                        id='value'
                    />
            }
            <button
                type='submit'
                disabled={processing}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
            >
                Submit
            </button>
        </form>
    )
}

export default function TestingPage({ webconfigs }: PageProps<{ webconfigs: any }>) {
    // useEffect(() => {
    //     console.log(webconfigs)
    // }, [])
    return (
        <div
            id="testing-page"
            className="py-12 text-black flex flex-col justify-center sm:py-12 items-center"
        >
            <h1
                className='text-4xl font-bold text-white'
            >
                Web Configs
            </h1>
            {
                webconfigs.map((webconfig: any) => {
                    return (
                        <Card key={webconfig.id}
                            {...webconfig}
                        />
                    )
                })
            }
        </div>
    )
}