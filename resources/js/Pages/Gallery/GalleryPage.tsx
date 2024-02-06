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
                <SectionContainer className="flex flex-col items-center justify-center text-center p-boxS">
                    <h1 className='text-accent font-josh font-[700] text-[2.2rem]'>{companyData?.gallery_title}</h1>
                    <p className='mt-[0.5rem] mb-[1.5rem]'>{companyData?.gallery_description}</p>
                    <MasonryGrid>
                        {images.data.map((image: ImageProps) => (
                            <div className="p-4">
                                <GalleryCard key={image.id} image={image}/>
                            </div>
                        ))}
                    </MasonryGrid>
                </SectionContainer>
            </Guest>
        </>
    )
}

const GalleryCard = ({ image }: {  image: ImageProps }) => {
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);
    return (
        <div
            title={image.title} 
            className="hover:opacity-70 rounded-xl overflow-hidden
            w-auto h-auto cursor-pointer flex flex-col relative"
            onClick={handleOpenModal}
        >
            <img 
                className='w-full object-contain aspect-1'
                src={image.url}
                alt={image.title}
                draggable={false}
            />
            <h1 className="absolute bottom-0 left-0 w-full text-white font-jost font-[700] text-[1.5rem]
                p-boxS text-left"
            >
                {image.title}
            </h1>
            {/* <p>{image.updated_at}</p> */}
        </div>
    );
};

// const GalleryCard: React.FC = () => {
//     return (
//         <>
//             <Head>
//                 <title>Documentation</title>
//             </Head>
//             <Guest>
//                 <div className='w-7/12 mx-auto'>
//                     <h1 className='mt-44 text-gold text-4xl text-center'>Dokumentasi</h1>
//                     <p className='text-black text-4xl text-center'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Malesuada fames ac turpis egestas maecenas pharetra. Tempus quam pellentesque nec nam aliquam. A erat nam at lectus urna duis convallis convallis tellus. Id velit ut tortor pretium viverra suspendisse potenti. Nunc scelerisque viverra mauris in aliquam sem fringilla ut morbi. Massa sed elementum tempus egestas. Ac placerat vestibulum lectus mauris ultrices eros. </p>
//                     <MasonryGrid>

//                         {Content.map((item, index) => (
//                         <div key={index} className="p-4">
//                             <img src={item.imageSrc} alt={item.title} className="w-full" />
//                         </div>
//                         ))}
//                     </MasonryGrid>
//                 </div>
//             </Guest>
//         </>
//     )
// }

