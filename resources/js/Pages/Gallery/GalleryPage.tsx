import Guest from "@/Layouts/GuestLayout";
import React, { useEffect } from "react";
import "@/Styles/Gallery/GalleryPage.scss";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { PaginateImageProps, ImageProps } from "@/types";
import { ModalOverlay } from "@/Components/Modal";
import { Head, usePage } from "@inertiajs/react";
import SectionContainer from "@/Components/General/SectionContainer";
// import GalleryCard from '@/Components/Gallery/GalleryCard'

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
                    <h1 className="text-accent font-jost font-[700] text-[2.2rem]">
                        {companyData?.gallery_title}
                    </h1>
                    <p>{companyData?.gallery_description}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {images.data.map((image: ImageProps) => (
                            <GalleryCard key={image.id} image={image} />
                        ))}
                    </div>
                </SectionContainer>
            </Guest>
        </>
    );
}

// Card
const GalleryCard = ({ image }: { image: ImageProps }) => {
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);
    return (
        <div
            title={image.title}
            className="hover:opacity-70 rounded-xl overflow-hidden
        w-[300px] h-[300px] cursor-pointer flex flex-col relative"
            onClick={handleOpenModal}
        >
            <img
                className="aspect-square object-cover "
                src={image.url}
                alt={image.title}
            />
            <h1
                className="absolute bottom-0 left-0 w-full text-white font-jost font-[700] text-[1.2rem
                p-boxS text-left
                "
            >
                {image.title}
            </h1>
            <p>{image.updated_at} </p>
        </div>
    );
};
