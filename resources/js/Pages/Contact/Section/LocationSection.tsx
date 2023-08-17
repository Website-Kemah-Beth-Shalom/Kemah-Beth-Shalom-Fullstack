import React from 'react'
import { usePage } from '@inertiajs/react'
import { router } from '@inertiajs/react'

export default function LocationSection() {
    return (
        <div className='box'>
            <h2 className='titleLocation'>Lokasi Kami</h2>
            <div className='containerMap'>
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7931.273886064705!2d106.67871147619726!3d-6.311334200000005!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69e554aa409fab%3A0xe9115f4a97449ef8!2sTaman%20Kafe%20Beth%20Manna!5e0!3m2!1sen!2sid!4v1691976603930!5m2!1sen!2sid"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade" />
                <button className='locationButton'>DAPATKAN RUTE LOKASI</button>    
            </div>
        </div>
    )
}
