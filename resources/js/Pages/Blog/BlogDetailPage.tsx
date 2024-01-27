import { BlogProps, PageProps } from '@/types'
import React, { useEffect, useState } from 'react'
import { Head, Link, usePage } from '@inertiajs/react'
import Guest from '@/Layouts/GuestLayout'
import { Button, notification, Space, Modal } from 'antd';
import SectionContainer from '@/Components/General/SectionContainer';
import ProductCard from '@/Components/Product/ProductCard';
import Header from '@/Components/General/Header';
import BackIcon from '@/Assets/Icon/back-icon.svg'
import ShareIcon from '@/Assets/Icon/ShareIcon.svg'
import CopyIcon from '@/Assets/Icon/CopyIcon.svg'
import "@/Styles/ContentPreview.scss"
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Highlight from '@tiptap/extension-highlight';
import TextAlign from '@tiptap/extension-text-align';
import TagComponent from '@/Components/Product/TagComponent';
import TiptapLink from '@tiptap/extension-link';
import { convertDate } from '@/Utils/ConvertDate';
import CharacterCount from '@tiptap/extension-character-count';
import Orderedlist from "@tiptap/extension-ordered-list";
import HorizontalRule from '@tiptap/extension-horizontal-rule';
import TipTapImage from '@tiptap/extension-image'

type NotificationType = 'success' | 'info' | 'warning' | 'error';


interface Props {
    html: string;
}


const ShareText = () => {
    const link = window.location.href
    return `Hey Check this Out! ${link}`
}


const Preview = ({ html }: any) => {
    const editor = useEditor({
        editable: false,
        content: html,
        extensions: [
            HorizontalRule.configure({
                HTMLAttributes: {
                    class: 'horizontal-rule',
                },
            }),
            StarterKit,
            TipTapImage.configure({
                inline: true,
                // allowBase64: true,
            }),

            TextAlign.configure({
                types: ["heading", "paragraph", "highlight"],
            }),
            Highlight,
            CharacterCount,
            Orderedlist,
        ]
    })

    useEffect(() => {
        console.log(html)
    }, [html])
    return (
        <div
            className='TextEditor'
        >
            <div
            >
                <EditorContent
                    editor={editor}
                    content={html}
                    className="content-preview" />
            </div>
        </div>
    )
}



export default function BlogDetailPage({ Blog }: { Blog: BlogProps }) {
    const ProductData: any = usePage().props.Blog
    const RecommendedProduct: any = usePage().props.RecommendedProduct
    const description = ProductData.description
    //modal state
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    // Debugger
    useEffect(() => {
        console.log(ProductData)
        // console.log(RecommendedProduct)
    }, [])

    const [api, contextHolder] = notification.useNotification();

    const openNotificationWithIcon = (type: NotificationType) => {
        api[type]({
            message: 'Copied to clipboard',
        });
    };

    return (
        <>
            <Head>
                <title>
                    {ProductData.title}
                </title>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta property="og:type" content="website" />
                <meta property="og:title" content={ProductData.title} />
                <meta property="og:description" content={ProductData.title} />
                <meta property="og:image" content={ProductData.image} />
                <meta property="og:url" content="https://ivann.my.id/" />
            </Head>
            {contextHolder} {/*for notification*/}
            <Modal
                centered
                className='ModalShare'
                title="Share to your friends!"
                open={isModalOpen}
                onOk={handleOk} onCancel={handleCancel}
                footer={null}
            >
                {/* share on instagram dll */}
                <div
                    className='flex flex-col gap-2'
                >
                    <a href={`https://api.whatsapp.com/send?text=${ShareText()}`} data-action="share/whatsapp/share">Share via Whatsapp web</a>
                </div>
            </Modal>
            <Guest>
                <div
                    id='product-detail-container'
                    className='
                    flex justify-center items-center w-full h-full'
                >
                    <div className="flex flex-col justify-start items-start min-h-screen">
                        <div
                            id='header-container'
                            className='w-full relative'
                        >
                            <Link
                                title='Back to Blog Page'
                                className='flex justify-center items-center w-fit aspect-square absolute top-[1rem] left-[1rem] 
                                bg-primary py-[0.5rem] px-[1rem] rounded-[100%] hover:opacity-50 
                                text-white
                                border-[0.1rem] border-white'
                                href='/blog'
                            >
                                <img
                                    className='w-[1.7rem] h-[1.7rem]'
                                    src={BackIcon}
                                    alt="back button"
                                />
                            </Link>
                            <img
                                className='w-screen
                                h-fit max-h-[30rem]
                                object-cover object-center'
                                src={ProductData.image}
                                alt="header image" />
                        </div>
                        <div
                            id='blog-content-container'
                            className='flex flex-row justify-start items-start gap-5 p-[2rem] w-full'
                        >
                            <div
                                id='blog-date'
                                className='flex gap-5 pl-[1.5rem] pr-[2rem] pb-[2rem] whitespace-nowrap w-[10rem]
                                border-l-[0.1rem] border-primaryBlack'
                            >
                                {convertDate(Blog.created_at)}
                            </div>
                            <div
                                id='blog-content'
                                className='flex flex-col justify-start items-start gap-[2.5rem] px-[2rem] w-full'
                            >
                                <h1
                                    className='text-primaryBlack font-playfair font-[600] text-[2rem]'
                                >
                                    {ProductData.title}
                                </h1>

                                <Preview
                                    html={description}
                                />
                                <div
                                    className='flex gap-2'>
                                    {/* Share Button */}
                                    {/* <button
                                    className={` w-fit ${ButtonStyle}`}
                                    onClick={showModal}
                                >
                                    Share

                                    <img className='h-[1.5rem] aspect-square invert-[1]'
                                        src={ShareIcon} alt="" />
                                </button>
                                <button
                                    className={` w-fit ${ButtonStyle}`}
                                    onClick={() => {
                                        navigator.clipboard.writeText(window.location.href);
                                        openNotificationWithIcon('success')
                                    }}
                                >
                                    Copy Link
                                    <img className='
                                        h-[1.5rem] invert-[1]
                                        aspect-square'
                                        src={CopyIcon} alt="" />

                                </button> */}
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </Guest >
        </>
    )
}





const ButtonStyle = `
px-[2rem] py-[0.5rem] rounded-[0.5rem]  font-poppins font-[500] text-[1rem]
transition duration-300 ease-in-out
flex justify-center items-center text-center
shadow-[0_20px_50px_rgba(8,_112,_184,_0.3)]
text-white
border-secondary border-[0.1rem] gap-[0.5rem]
hover:shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)]
hover:bg-secondary
`