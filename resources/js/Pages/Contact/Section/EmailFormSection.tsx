import React from 'react'
import { usePage } from '@inertiajs/react'
import { router } from '@inertiajs/react'

export default function EmailFormSection() {

    const [values, setValues] = React.useState<any>({
        email: '',
        name: '',
        message: ''
    })


    function handleChange(e: any) {
        const key = e.target.id;
        const value = e.target.value
        setValues((values: any) => ({
            ...values,
            [key]: value,
        }))
    }

    const handleSubmit = (e: any) => {
        e.preventDefault()
        console.log(values)
        router.post('/api/send-email', values)
    }
    return (
        <div>
            <h2>
                Kirim pesan ke kami:
            </h2>
            <form
                onSubmit={handleSubmit}
                className='flex flex-col gap-3'
            >
                <input id='email' onChange={handleChange} placeholder='Email / Nomor Telepon' className='w-96 h-10 border-2 rounded-md shadow-sm m-y shadow-red-100 form-input text-black' type="text" />
                <input id='name' onChange={handleChange} placeholder='Nama' className='w-96 h-10 border-2 rounded-md shadow-sm m-y shadow-red-100 form-input text-black' type="text" />
                <textarea id='message' onChange={handleChange} placeholder='Pesan' className='w-96 h-20 border-2 rounded-md shadow-sm m-y shadow-red-100 resize-none form-input text-black'>
                </textarea>
                <button
                    className='w-full h-10 border-2 rounded-md shadow-sm m-y shadow-red-100 form-input text-black '
                >
                    Submit
                </button>
            </form>
        </div>
    )
}
