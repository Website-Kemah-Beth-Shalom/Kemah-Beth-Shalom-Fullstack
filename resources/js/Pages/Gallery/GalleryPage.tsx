import { Head, usePage } from '@inertiajs/react'
import React from 'react';
import Guest from '@/Layouts/GuestLayout';
import MasonryGrid from "@/Components/Gallery/MasonryLayout";
import { PaginateImageProps, ImageProps } from '@/types';
import SectionContainer from '@/Components/General/SectionContainer';

export default function GalleryPage({
    images,
}: {
    images: PaginateImageProps;
}) {
    const companyData: any = usePage().props.companyData; //get page info
    return (
        <>
            <Head>
                <title>Gallery</title>
            </Head>
            <Guest>
                <div
                    className='flex flex-col items-center gap-4 w-full  text-center p-boxS rounded-md shadow-md'
                >
                    <section
                        className='flex flex-col items-start gap-4 w-full  text-left p-boxS rounded-md'
                    >
                        <h1 className="font-merriweather text-[3rem] text-accent font-bold ">
                            {companyData.gallery_title || 'Documentation'}
                        </h1>
                        <hr className="w-[30%] h-[0.1rem] bg-accent mb-[1rem]" />
                        {/* Content */}
                        <p
                            className="text-primaryBlack font-jost w-full max-w-[60rem] text-[1.125rem]
                        text-left"
                        >
                            {companyData.gallery_description}
                        </p>
                    </section>
                    <section
                        className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                    >
                        {
                            images.data.map((image: ImageProps) => (
                                <img
                                    className="w-full h-full object-cover
                                    aspect-[16/9] rounded-md shadow-md cursor-pointer
                                    "
                                    key={image.id}
                                    src={image.url}
                                    alt={image.title}
                                    draggable={false}
                                />
                            ))
                        }
                    </section>
                </div>
            </Guest>
        </>
    )
}
