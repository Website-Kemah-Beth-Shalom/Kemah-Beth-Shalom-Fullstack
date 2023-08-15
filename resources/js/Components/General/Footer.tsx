import { usePage } from '@inertiajs/react'

//images
import FooterLogo from "../../../../storage/app/public/logo-footer.png"
import Instagram from "../../../../storage/app/public/sosmed/instagram.svg"
import Whatsapp from "../../../../storage/app/public/sosmed/whatsapp.svg"
import Youtube from "../../../../storage/app/public/sosmed/youtube.svg"

export default function Footer() {
    return (
        <div className='bg-oldLace text-gunMetal pt-12 w-full'>
            <div className='bg-white flex w-1/2 mx-auto text-3xl justify-between rounded-full pt-8 pb-8 pr-12 pl-12' >
                <h1 className='p-4'>Home</h1>
                <h1 className='p-4'>Dokumentasi</h1>
                <h1 className='p-4'>Kontak Kami</h1>
                <button className='bg-sepia text-white p-4 rounded-lg items-center'>Donasi</button>
            </div>
            <div className='flex justify-center mt-12 gap-12'>
                <img src={Instagram} alt="instagram logo" className='w-16'/>
                <img src={Whatsapp} alt="whatsapp logo" className='w-16'/>
                <img src={Youtube} alt="youtube logo" className='w-16'/>
            </div>
            <div className='flex justify-center items-center mt-12 gap-12'>
                <p>Copyright © Yayasan Shekinah Glory</p>
                <img src={FooterLogo} alt="Footer"  className='w-80'/>
                <p>"Growing In Love Impacting Life"</p>
            </div>
        </div>
    )
}

