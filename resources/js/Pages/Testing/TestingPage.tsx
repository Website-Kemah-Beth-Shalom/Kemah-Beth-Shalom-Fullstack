import { PageProps } from '@/types'
// import { Button } from 'antd'
import { EuiButton as Button, EuiFieldText as Input } from '@elastic/eui'
import React, { useEffect } from 'react'
import { useForm } from '@inertiajs/react'
import { router } from '@inertiajs/react'

const Card = (webconfig: any) => {

    const { data, setData, post, processing, errors } = useForm({
        value: webconfig.value,
        remember: false,
    })

    // submit form 
    const handleSubmit = (e: any) => {
        e.preventDefault()
        post(route('webconfig.update', webconfig.id))
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white overflow-hidden shadow-sm sm:rounded-lg"
        >
            <div className="p-6 bg-white border-b border-gray-200">
                <h1 className="text-2xl font-bold">{webconfig.alias}</h1>
                <Input className="text-gray-500"
                    defaultValue={webconfig.value}
                />

                <button
                    type='submit'
                    disabled={processing}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                >
                    Submit
                </button>
            </div>
        </form>
    )
}

export default function TestingPage({ webconfigs }: PageProps<{ webconfigs: any }>) {
    useEffect(() => {
        console.log(webconfigs)
    }, [])
    return (
        <div
            id="testing-page"
            className="py-12 text-black"
        >
            {/* <meter value={0.1}></meter> */}
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