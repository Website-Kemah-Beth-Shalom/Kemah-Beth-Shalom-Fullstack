import { usePage } from '@inertiajs/react'
import React from 'react'

export default function Footer() {
    const pageInfo = usePage();
    const [companyData, setCompanyData] = React.useState<any>(pageInfo?.props?.companyData)
    // React.useEffect(() => {
    //     console.log(pageInfo?.props?.companyData)
    // }, [])
    return (
        <div
            className='Footer min-h-full bg-black flex flex-col justify-center items-center p-5'
        >
            <h1
                className='text-2xl'
            >
                <div>{companyData.company_name}</div>
                <div>{companyData.company_address}</div>
                <div>{companyData.company_email}</div>
                <div>{companyData.company_phone}</div>
            </h1>
        </div>
    )
}

