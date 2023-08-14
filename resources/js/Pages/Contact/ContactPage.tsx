import React from 'react'
import FormSection from './Section/FormSection'
import LocationSection from './Section/LocationSection'
import { Head } from '@inertiajs/react'
import './../../Styles/Contact/contact.scss'
import logoSrc from "./../../../../storage/app/public/logo.png"
import phoneIconSrc from "./../../../../storage/app/public/iconPhone.png"
import emailIconSrc from "./../../../../storage/app/public/iconEmail.png"
import mapIconSrc from "./../../../../storage/app/public/iconMap.png"

export default function ContactPage() {
    return (
        <>
            <Head>
                <title>Contact</title>
            </Head>
            <div className="container">
                <img className='logo' src={logoSrc}></img>
                <div className="containerContact">
                    <div className="infoContact">
                        <h2>Informasi Kontak Kami</h2>
                        <p className='infoDesc'>Kirimkan pesan untuk Kemah Beth Shalom jika ingin mengadakan kegiatan atau kerjasama lainnya.</p>
                        <div className='listContact'>
                            <ul>
                                <li>
                                    <img className='icon' src={phoneIconSrc}/>
                                    <p>0877 7428 8670 (WA)</p>
                                </li>
                                <li>
                                    <img className='icon' src={emailIconSrc}/>
                                    <p>kemahbethshalom@gmail.com</p>
                                </li>
                                <li>
                                    <img className='icon' src={mapIconSrc}/>
                                    <p>Gang Mushola Nurul Amal Jalan Ciater Rawa Mekar Jaya No.14, Kecamatan Serpong, Kota Tangerang Selatan, Banten, Indonesia</p>
                                </li>
                            </ul>
                        </div>
                        <div className='smallCircle'/>
                        <div className='bigCircle'/>
                    </div>
                    <div className="formContact">
                        <FormSection />
                    </div>
                </div>
                <div className="containerLocation">
                        <LocationSection />
                </div>
            </div>
        </>
    )
}