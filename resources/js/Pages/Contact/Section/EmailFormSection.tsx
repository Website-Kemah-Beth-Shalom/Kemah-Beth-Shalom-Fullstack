import React from 'react';
import { usePage } from '@inertiajs/react';
import { router } from '@inertiajs/react';
import "../Contact.scss";


export default function EmailFormSection() {
    const companyData: any = usePage().props.companyData;

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

        <div className="w-auto h-auto flex flex-col justify-center items-center">

            <div className="flex flex-col md:flex-row w-auto h-auto md:w-[70rem] md:h-[41.6875rem] shrink-0 rounded-[0.625rem] py-[0.63rem] md:pb-0 pb-[6.6rem] px-[0.56rem] bg-[#FFF] shadow-[0_4px_40px_5px_rgba(0,0,0,0.15)]">
                <div className="flex flex-col w-[27.4375rem] h-[40.4375rem] shrink-0 leading-normal bg-[#292F36] py-[2.5rem] px-[1.87rem] rounded-md">
                    <h2 className='text-[2rem] not-italic font-[700] text-[#FFF]'>Informasi Kontak Kami</h2>
                    <p className='w-[23.6875rem] text-[#C9C9C9] text-[1.25rem] mt-[1.87rem] not-italic font-[500]'>Kirimkan pesan untuk Kemah Beth Shalom jika ingin mengadakan kegiatan atau kerjasama lainnya</p>
                    <div className="w-[23.6875rem] h-[13.5625rem] shrink-0 flex flex-col gap-[3.19rem] mt-[3rem] text-[#FFF]">
                        <div className="flex flex-row gap-[1.76rem]">
                            <svg xmlns="http://www.w3.org/2000/svg" width="27" height="24" viewBox="0 0 27 24" fill="none">
                                <path d="M22.4925 10.999H24.7418C24.7418 5.869 20.3861 2 14.6089 2V4C19.1771 4 22.4925 6.943 22.4925 10.999Z" fill="white"/>
                                <path d="M14.6201 7.99999C16.9852 7.99999 17.994 8.89699 17.994 11H20.2433C20.2433 7.77499 18.2471 5.99999 14.6201 5.99999V7.99999ZM18.4686 13.443C18.2525 13.2683 17.9686 13.1752 17.6767 13.1832C17.3848 13.1912 17.1078 13.2998 16.9043 13.486L14.213 15.947C13.5652 15.837 12.2629 15.476 10.9224 14.287C9.58181 13.094 9.17581 11.933 9.05548 11.361L11.8209 8.96699C12.0306 8.78612 12.1529 8.53982 12.1619 8.2802C12.1709 8.02059 12.066 7.76804 11.8693 7.57599L7.7138 3.51299C7.51703 3.32035 7.24357 3.2035 6.95147 3.18725C6.65937 3.17101 6.37166 3.25665 6.14944 3.42599L3.70899 5.28699C3.51456 5.46051 3.3985 5.69145 3.38285 5.93599C3.36598 6.18599 3.04434 12.108 8.20863 16.702C12.7139 20.707 18.3573 21 19.9115 21C20.1387 21 20.2782 20.994 20.3153 20.992C20.5903 20.9783 20.8498 20.8747 21.044 20.701L23.1358 18.53C23.3264 18.3325 23.4229 18.0768 23.4049 17.817C23.3868 17.5573 23.2556 17.3141 23.0391 17.139L18.4686 13.443Z" fill="white"/>
                            </svg>
                            <p className='w-[10.96513rem] text-[1rem] not-italic font-[400] leading-normal'>
                                {companyData?.company_whatsapp_number}
                            </p>
                        </div>
                        <div className="flex flex-row gap-[1.76rem]">
                            <svg xmlns="http://www.w3.org/2000/svg" width="27" height="24" viewBox="0 0 27 24" fill="none">
                                <path d="M24.7416 4H2.24902V20H24.7416V4ZM22.4923 8L13.4953 13L4.49828 8V6L13.4953 11L22.4923 6V8Z" fill="white"/>
                            </svg>
                            <p className='w-[14.339rem] text-[1rem] not-italic font-[400] leading-normal'>
                                {companyData?.company_email}
                            </p>
                        </div>
                        <div className="flex flex-row gap-[1.76rem]">
                            <svg xmlns="http://www.w3.org/2000/svg" width="27" height="24" viewBox="0 0 27 24" fill="none">
                                <path d="M13.4955 1.5C11.0356 1.50258 8.67739 2.3726 6.93802 3.91922C5.19865 5.46584 4.2202 7.56276 4.2173 9.75C4.21435 11.5374 4.87097 13.2763 6.08643 14.7C6.08643 14.7 6.33947 14.9963 6.3808 15.039L13.4955 22.5L20.6135 15.0353C20.6507 14.9955 20.9045 14.7 20.9045 14.7L20.9054 14.6978C22.1202 13.2747 22.7766 11.5366 22.7737 9.75C22.7708 7.56276 21.7923 5.46584 20.0529 3.91922C18.3136 2.3726 15.9553 1.50258 13.4955 1.5ZM13.4955 12.75C12.8282 12.75 12.1759 12.5741 11.6211 12.2444C11.0662 11.9148 10.6338 11.4462 10.3784 10.8981C10.1231 10.3499 10.0562 9.74667 10.1864 9.16473C10.3166 8.58279 10.6379 8.04824 11.1098 7.62868C11.5816 7.20912 12.1828 6.9234 12.8373 6.80764C13.4917 6.69189 14.1701 6.7513 14.7866 6.97836C15.4031 7.20542 15.93 7.58994 16.3008 8.08329C16.6715 8.57664 16.8694 9.15666 16.8694 9.75C16.8683 10.5453 16.5124 11.3078 15.8799 11.8702C15.2475 12.4326 14.39 12.749 13.4955 12.75Z" fill="white"/>
                            </svg>
                            <p className='w-[20.24331rem] text-[1rem] not-italic font-[400] leading-normal'>
                                {companyData?.address}
                            </p>
                        </div>
                    </div>
                    <div className="relative">
                        <svg className='absolute right-[1rem] top-[-2.5rem]' xmlns="http://www.w3.org/2000/svg" width="138" height="138" viewBox="0 0 138 138" fill="none">
                          <circle cx="69" cy="69" r="69" fill="#FFF9F9" fill-opacity="0.13"/>
                        </svg>
                        <svg className='absolute left-[16rem] top-[-1rem]' xmlns="http://www.w3.org/2000/svg" width="350" height="350" viewBox="0 0 350 350" fill="none">
                          <circle cx="150" cy="150" r="150" fill="#FFF9F9" fill-opacity="0.13"/>
                        </svg>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="w-[27.4375rem] h-[40.4375rem] flex flex-col py-[3.75rem] px-[4.25rem] relative">
                    <div className="flex flex-col md:flex-row gap-x-[2.28rem] gap-y-[2.65rem]">
                        <div className="flex flex-col">
                            <label htmlFor="firstName" className='text-[0.75rem] not-italic text-[#333] font-[500] leading-[1.25rem]'>First Name</label>
                            <input 
                                id='firstName'
                                onChange={handleChange}
                                placeholder='John'
                                className='outline-none border-b-[#333] border-2 w-auto md:w-[16.27088rem] font-[500]  text-[#8D8D8D] focus:outline-none focus:ring focus:ring-blue-300'
                                type='text'
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="lastName" className='text-[0.75rem] not-italic text-[#333] font-[500] leading-[1.25rem]'>Last Name</label>
                            <input 
                                id='lastName'
                                onChange={handleChange}
                                placeholder='Doe'
                                className='outline-none border-b-[#333] border-2 w-auto md:w-[16.27088rem] font-[500]  text-[#8D8D8D] focus:outline-none focus:ring focus:ring-blue-300'
                                type='text'
                            />
                        </div>
                    </div>
                    <div className="flex flex-col py-[3.12rem]">
                        <label htmlFor="email" className='text-[0.75rem] not-italic text-[#333] font-[500] leading-[1.25rem]'>Email</label>
                        <input 
                            id='email'
                            onChange={handleChange}
                            placeholder='johndoe@gmail.com'
                            className='outline-none border-b-[#333] border-2 w-auto md:w-[16.27088rem] font-[500]  text-[#8D8D8D] focus:outline-none focus:ring focus:ring-blue-300'
                            type='email'
                        />
                    </div>
                    <div className="flex flex-col pb-[3.12rem]">
                        <label htmlFor="title" className='text-[0.75rem] not-italic text-[#333] font-[500] leading-[1.25rem]'>Judul Pesan</label>
                        <input 
                            id='title'
                            onChange={handleChange}
                            placeholder='Lorem Ipsum...'
                            className='outline-none border-b-[#333] border-2 w-auto md:w-[34.97088rem] font-[500]  text-[#8D8D8D] focus:outline-none focus:ring focus:ring-blue-300'
                            type='text'
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="message" className='text-[0.75rem] not-italic text-[#333] font-[500] leading-[1.25rem] mb-[0.3rem]'>Isi Pesan</label>
                        <textarea 
                            id="message" 
                            name="message" 
                            onChange={handleChange}
                            placeholder='Lorem ipsum dolor sit amet...'
                            className='resize-none w-auto md:w-[34.8125rem] h-[6.3125rem] border-2 border-[#333] font-[500] text-[#8D8D8D]'
                        ></textarea>
                    </div>
                    <div className="w-auto md:w-[34.8125rem] pt-[3.13rem] h-auto flex justify-center md:justify-end">
                        <button type='submit' className='w-[12.52506rem] md:py-[0.94rem] px-[3rem] bg-[#011C2A] rounded-[0.315rem] shadow-[0_0_14px_0_rgba(0,0,0,0.12)] text-[#FFF] '>
                            Kirim Pesan
                        </button>
                    </div>
                    
                </form>
            </div>
        </div>
    )
}
