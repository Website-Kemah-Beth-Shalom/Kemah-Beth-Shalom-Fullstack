import React, { useEffect, useState } from 'react';
import { useImages } from '@/Hooks/useImages';
import { FileSizeConverter } from '@/Utils/FileSize';
import { convertDate } from '@/Utils/ConvertDate';
import { useDebounce } from '@/Utils/Hooks';
import { Spinner } from '../General/Spinner';
import { ImageProps } from '@/types';
import { ModalOverlay } from '../Modal';
import { CloseIcon } from '../General/Icon';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onAddImage: (url: string, id?: any) => void;
}

export const ImageModal = ({ isOpen, onClose, onAddImage }: Props) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<any>(null);
    const [keyword, setKeyword] = useState("");

    const [openDropdownId, setOpenDropdownId] = useState(null);
    const handleDropdownToggle = (imageId: any) => {
        setOpenDropdownId(openDropdownId === imageId ? null : imageId);
    };

    // get all images and mutate
    const debouncedKeyword = useDebounce(keyword, 500);
    useEffect(() => {
        query.refetch();
    }, [debouncedKeyword])
    const { query, addImageMutation, deleteImageMutation } = useImages(debouncedKeyword) as any;


    // track if addImageMutation is loading
    const { isSuccess: isAddImageSuccess } = addImageMutation;

    useEffect(() => {
        query.refetch();
    }, [addImageMutation.mutate])

    useEffect(() => {
        if (isAddImageSuccess) {
            setLoading(false)
        }
    }, [isAddImageSuccess])

    // handle drag and drop
    const [dragging, setDragging] = useState(false);
    const handleDragEnter = (e: any) => {
        e.preventDefault();
        e.stopPropagation();
        setDragging(true);
        console.log("dragging enter")
    };
    const handleDragOver = (e: any) => {
        e.preventDefault();
        e.stopPropagation();
        setDragging(false);
        console.log("dragging over")
    };
    const handleDrop = (e: any) => {
        e.preventDefault();
        e.stopPropagation();
        setLoading(true);
        console.log("dragging drop")
        addImageMutation.mutate(e.dataTransfer.files[0]);
    };

    if (!isOpen) {
        return null;
    }

    return (
        <ModalOverlay
            onClose={() => {
                setLoading(false)
                setError(null)
                setKeyword("")
                setOpenDropdownId(null)
                onClose()
            }}
            show={isOpen}
            // on file drop event
            onDragEnter={handleDragEnter}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
        >
            {/* Modal body */}
            <div
                className="modal-content bg-white w-[50rem] h-[30rem] rounded-md fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-[1rem] overflow-y-scroll max-w-[90vw]"
                >
                {/* Modal header */}
                <div className="modal-header flex justify-between items-start
                h-[3rem] w-full mb-[1rem]
                ">
                    <h2
                        className='text-primaryAdmin font-poppins'
                    >
                        Add Image
                    </h2>
                    <span
                        title='Close Modal'
                        className="text-primaryBlack text-opacity-50 font-poppins w-fit cursor-pointer
                        hover:text-opacity-100 text-[3rem]"
                        onClick={() => {
                            setLoading(false)
                            setError(null)
                            setKeyword("")
                            setOpenDropdownId(null)
                            onClose()
                        }}>
                        <CloseIcon />
                    </span>
                </div>
                <div
                    id='search bar'
                    className='flex justify-between items-center gap-[1rem] w-full h-[3rem] pb-[2rem] border-b border-[#9e9e9e] '
                >
                    <input
                        autoFocus
                        type="text"
                        placeholder="Search Image"
                        className='w-full p-[0.5rem] rounded-md bg-[#f0f3f5]'
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                    />
                    <label
                        title='Upload new Image'
                        htmlFor="file-upload"
                        className={`bg-green text-white py-[0.5rem] px-[2rem] rounded-md cursor-pointer w-fit flex-nowrap
                    whitespace-nowrap hover:bg-accent flex gap-[0.1rem] justify-center items-center
                    ${loading ? "cursor-not-allowed opacity-50" : "cursor-pointer"}
                    `}>
                        {
                            loading ?
                                <>
                                    Uploading...
                                </>
                                :
                                <>
                                    Upload
                                    <img
                                        className='w-[1.5rem] h-[1.5rem] ml-[0.5rem] invert-[1]'
                                        src="https://www.svgrepo.com/show/521018/upload.svg" alt="" />
                                </>
                        }
                    </label>
                    <input
                        title='Upload new Image'
                        disabled={loading}
                        id='file-upload'
                        type="file"
                        accept='image/*'
                        onChange={(event: any) => {
                            setLoading(true)
                            addImageMutation.mutate(event.target.files[0])
                        }}
                        className='hidden'
                    />
                </div>
                <div
                    className="modal-body flex flex-col justify-center items-center"
                >
                    {error && <p>{error}</p>}
                </div>
                {/* image list */}
                <div
                    className='flex flex-col justify-center items-center h-fit w-full'
                >

                    {
                        // if uploading image
                        loading &&
                        <div
                            className='flex justify-center items-center h-[3rem] w-full gap-2
                            border border-primaryBlack border-opacity-50 rounded-md p-[1rem]
                            text-primaryWhite font-poppins bg-green flex-nowrap'
                        >
                            Uploading Image... Please wait <Spinner
                                isShow={loading} />
                        </div>
                    }
                    {/* <div
                        className='bg-[#f0f3f5] border-x border-[#9e9e9e] border-opacity-50
                        text-primaryBlack  font-poppins flex justify-start w-full gap-[1rem] p-[0.5rem]'
                    >
                        <div
                            className='h-full w-auto aspect-square'
                        >
                            File
                        </div>
                        <div
                            className='w-full text-left'
                        >
                            Name
                        </div>
                        <div
                            className='w-fit text-center
                            min-w-[10rem]'
                        >
                            Size
                        </div>
                        <div
                            className='truncate w-fit
                        min-w-[8rem] text-center'
                        >
                            Uploaded At
                        </div>
                    </div> */}
                    {query.data?.data.map((image: any) => (
                        // if image is can be displayed
                        <ImageCard
                            key={image.id}
                            image={image}
                            onClick={() => {
                                onAddImage(image.url, image.id)
                                onClose();
                            }}
                            onDelete={(e: any) => {
                                e.preventDefault();
                                e.stopPropagation();
                                deleteImageMutation.mutate(image.id);
                                query.refetch();
                            }}

                            onDropdownToggle={() => handleDropdownToggle(image.id)}
                            isDropdownOpen={openDropdownId === image.id}
                        />
                    ))}
                    {query.data?.data.length === 0 &&
                        <div
                            className='flex flex-col justify-center items-center h-[20rem] w-full'
                        >
                            <p
                                className='text-primaryBlack text-opacity-50 font-poppins'
                            >No images found</p>
                        </div>
                    }
                    {loading && <p>Loading...</p>}
                </div>
            </div>
        </ModalOverlay >
    );
}

type ImageCardProps = {
    image: ImageProps;
    onClick: () => void;
    onDelete: (e: any) => void;
    onDropdownToggle: () => void;
    isDropdownOpen: boolean;
}

const ImageCard = ({ image, onClick, onDelete, onDropdownToggle, isDropdownOpen }: ImageCardProps) => {


    const [data, setData] = useState<ImageProps>({
        id: image.id,
        title: image.title,
        url: image.url,
        thumbnail: image.thumbnail,
        size: image.size,
        created_at: image.created_at,
        updated_at: image.updated_at,
    });

    const handleDropdownClick = (e: any) => {
        e.stopPropagation();
        e.preventDefault();
    };

    const { updateImageMutation } = useImages();

    const handleRename = (e: any) => {
        e.stopPropagation();
        e.preventDefault();
        // window.prompt("Rename Image", image.title);
        var titleData = window.prompt("Rename Image", image.title);
        setData({
            ...data,
            title: titleData as string
        })
        updateImageMutation.mutate(
            {
                id: image.id,
                data: {
                    title: data.title
                }
            }
        );
    }

    return (
        <div
            title={image.title}
            onClick={onClick}
            className='flex flex-row justify-between items-center gap-[1rem] hover:bg-[#f0f3f5]
              p-[0.5rem] w-full h-[4rem] pointer-events-auto cursor-pointer
             border-b border-x border-[#9e9e9e] border-opacity-50 relative'
        >
            <img
                src={image.thumbnail}
                alt={image.title}
                className='h-full w-auto aspect-square object-cover'
            />
            <h1
                className='text-primaryBlack font-poppins truncate w-full text-left'
            >
                {image.title}
            </h1>
            <h1
                className='text-primaryBlack font-poppins truncate w-fit text-center
                min-w-[10rem]'
            >
                {FileSizeConverter(image.size)}
            </h1>
            <h1
                className='text-primaryBlack font-poppins truncate w-fit
                min-w-[8rem] text-center'
            >
                {convertDate(image.created_at)}
            </h1>
            <div
                onClick={handleDropdownClick}
                className="dropdown inline-block relative overflow-visible
                z-[500]">
                <button
                    title='More Options'
                    onClick={(e: React.MouseEvent) => {
                        e.stopPropagation();
                        e.preventDefault();
                        onDropdownToggle()
                    }}
                    className="bg-white text-primaryBlack cursor-pointer
                    aspect-square w-[2rem] h-[2rem] rounded-full
                    flex justify-center items-center
                    transition duration-300 ease-in-out hover:bg-[#828282]
                    "
                >
                    ...
                </button>
                {/* content */}
                <div
                    className={`dropdown-menu absolute text-gray-700 pt-1
                    rounded-md bg-white w-[10rem] pointer-events-none
                    z-[100] flex-col gap-2 justify-center items-center top-[3rem] left-[-10rem]
                    shadow-[rgba(0,_0,_0,_0.34)_0px_5px_8px] p-[0.5rem]
                    ${isDropdownOpen ? "flex" : "hidden"}
                    `}>
                    <button
                        onClick={(e: React.MouseEvent) => {
                            handleDropdownClick(e);
                            handleRename(e);
                        }}
                        className="rounded-t bg-gray-200  py-[0.3rem] block whitespace-nowrap
                        hover:bg-[#a2a2a2] hover:text-white z-[200]
                        pointer-events-auto w-full text-center"
                    >
                        Edit
                    </button>
                    <button
                        onClick={(e: React.MouseEvent) => {
                            handleDownloadImage(image.url, `${image.title}`)
                        }}
                        className="bg-gray-200  py-[0.3rem] block whitespace-nowrap
                        hover:bg-[#a2a2a2] hover:text-white z-[200]
                        pointer-events-auto w-full text-center"
                    >
                        Download
                    </button>
                </div>
            </div>
        </div>
    )
}

const filterImages = (images: any, query: string) => {
    if (!query) {
        return images;
    }

    // prevent white screen
    if (!images) {
        return [];
    }

    query = query.toLowerCase();
    return images.filter((image: any) => {
        const imageTitle = image.title.toLowerCase();
        return imageTitle.includes(query);
    });
}


const handleDownloadImage = (url: string, filename: string) => {
    fetch(url)
        .then((response) => response.blob())
        .then((blob) => {
            const blobUrl = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = blobUrl;
            a.download = filename;
            a.click();
        });
};