import { Head } from '@inertiajs/react'
import React from 'react';
import Guest from '@/Layouts/GuestLayout';
import MasonryGrid from "../../Components/MasonryLayout";
import Content from "./content";

const DocumentationPage: React.FC = () => {
    return (
        <>
            <Head>
                <title>Documentation</title>
            </Head>
            <Guest>
                <div className='w-7/12 mx-auto'>
                    <h1 className='mt-44 text-gold text-4xl text-center'>Dokumentasi</h1>
                    <p className='text-black text-4xl text-center'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Malesuada fames ac turpis egestas maecenas pharetra. Tempus quam pellentesque nec nam aliquam. A erat nam at lectus urna duis convallis convallis tellus. Id velit ut tortor pretium viverra suspendisse potenti. Nunc scelerisque viverra mauris in aliquam sem fringilla ut morbi. Massa sed elementum tempus egestas. Ac placerat vestibulum lectus mauris ultrices eros. </p>
                    <MasonryGrid>
                        {Content.map((item, index) => (
                        <div key={index} className="p-4">
                            <img src={item.imageSrc} alt={item.title} className="w-full" />
                        </div>
                        ))}
                    </MasonryGrid>
                </div>
            </Guest>
        </>
    )
}

export default DocumentationPage;