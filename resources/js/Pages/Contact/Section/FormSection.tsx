import React from 'react'
import { usePage } from '@inertiajs/react'
import { router } from '@inertiajs/react'

export default function EmailFormSection() {

    const [values, setValues] = React.useState<any>({
        email: '',
        fName: '',
        lName: '',
        title:'',
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
            <form onSubmit={handleSubmit}>
                <div className='inputName inputGroup'>
                    <label>First Name
                    <br />
                    <input id='fName' onChange={handleChange} placeholder="John" type="text" />
                    </label>
                </div>
                <div className='inputName inputGroup'>
                    <label>Last Name
                    <br />
                    <input id='lName' onChange={handleChange} placeholder='Doe' type="text" />
                    </label>
                </div>
                <div className='inputEmail inputGroup'>
                    <label>Email
                    <br />
                    <input id='email' onChange={handleChange} placeholder='johndoe@gmail.com' type="text" />
                    </label>
                </div>
                <div className='inputTitle inputGroup'>
                    <label>Judul Pesan
                    <br />
                    <input id='title' onChange={handleChange} placeholder='Lorem Ipsum...' type="text" />
                </label>
                </div>
                <div className='inputMessage inputGroup'>
                    <label>Isi Pesan
                    <br />
                    <textarea id='message' onChange={handleChange} placeholder='Lorem Ipsum dolor sit amet...' />
                </label>
                </div>
                <button>Kirim Pesan</button>
            </form>
        </div>
    )
}
