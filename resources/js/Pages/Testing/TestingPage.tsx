import { PageProps } from '@/types'
import { Button } from 'antd'
import React, { useEffect } from 'react'
// import { useForm } from '@inertiajs/react'


const Card = ({ children }: { children: React.ReactNode }) => {
    // const { } = useForm()
    return (
        <div
            className="bg-white overflow-hidden shadow-sm sm:rounded-lg"
        >
            {children}
        </div>
    )
}

export default function TestingPage({ webconfigs }: PageProps<{ webconfigs: any }>) {
    useEffect(() => {
        console.log(webconfigs)
    }, [])
    return (
        <div
            className="py-12 text-black"
        >
            {
                webconfigs.map((webconfig: any) => {
                    return (
                        <Card key={webconfig.id}>
                            <div className="p-6 bg-white border-b border-gray-200">
                                <h1 className="text-2xl font-bold">{webconfig.alias}</h1>
                                <input className="text-gray-500"
                                    defaultValue={webconfig.value}
                                />
                                <Button
                                    color='black'
                                    className="ml-2"
                                    type="dashed"
                                >
                                    Save
                                </Button>
                            </div>
                        </Card>
                    )
                }
                )
            }
        </div>
    )
}