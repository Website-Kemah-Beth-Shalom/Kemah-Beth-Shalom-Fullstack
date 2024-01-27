import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import TipTapImage from '@tiptap/extension-image'
import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
import CharacterCount from "@tiptap/extension-character-count";
import Link from "@tiptap/extension-link";
import Orderedlist from "@tiptap/extension-ordered-list";
import React, { useEffect, useState } from 'react'
import "@/Styles/TextEditor.scss"
import HorizontalRule from '@tiptap/extension-horizontal-rule';
import axios from 'axios';
import Commands from './Suggestion/command';
import getSuggestionItems from './Suggestion/items';
import renderItems from './Suggestion/renderitem';
import { StarNode } from './Feature';
// import { getAllImages } from '@/Services/ImageServices';
import { useImages } from '@/Hooks/useImages';
import { ImageModal } from './ImageModal';


const Button = ({ func, className, children, disabled, active, tooltip }: {
    func?: any,
    className?: string,
    children: React.ReactNode
    disabled?: boolean,
    active?: boolean,
    tooltip: any
}) => {
    return (
        <button
            onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                func()
            }}
            disabled={disabled}
            className={`button bg-primaryBlack ${className}`}
            style={{
                pointerEvents: disabled ? "none" : "auto",
                backgroundColor: active ? "#1F2937" : "#F9F5F2",
                color: active ? "#F9F5F2" : "#1F2937",
                height: "2rem",
                width: "fit-content",
                padding: "0.2rem",
                border: "none",
                borderRadius: "0.25rem",
                outline: "none",
                zIndex: 100
            }}
            title={tooltip}
        >
            {children}
        </button>
    )
}



const MenuBar = ({ editor, setFullscreen, isFullscreen }: any) => {
    if (!editor) {
        return null
    }

    const [showImageModal, setShowImageModal] = useState(false);

    const addImage = (url: any) => {
        if (url) {
            editor.chain().focus().setImage({ src: url }).run();
        }
    };
    const TextEditorFeat = [

        {
            "title": "bold",
            "active": editor.isActive("bold"),
            "func": () => editor.chain().focus().toggleBold().run(),
            "disabled": !editor.can().chain().focus().toggleBold().run(),
            "icon": 'https://www.svgrepo.com/show/500789/bold.svg'
        },
        {
            "title": "italic",
            "active": editor.isActive("italic"),
            "func": () => editor.chain().focus().toggleItalic().run(),
            "disabled": !editor.can().chain().focus().toggleItalic().run(),
            "icon": 'https://www.svgrepo.com/show/500907/italic.svg'
        },
        {
            "title": "strike-through",
            "active": editor.isActive("strike"),
            "func": () => editor.chain().focus().toggleStrike().run(),
            "disabled": !editor.can().chain().focus().toggleStrike().run(),
            "icon": 'https://www.svgrepo.com/show/501021/strike.svg'
        },
        // {
        //     "title": "code",
        //     "active": editor.isActive("code"),
        //     "func": () => editor.chain().focus().toggleCode().run(),
        //     "disabled": !editor.can().chain().focus().toggleCode().run()
        // },
        {
            "title": "Highlight",
            "active": editor.isActive("highlight"),
            "func": () => editor.chain().focus().toggleHighlight().run(),
            "disabled": "",
            "icon": "https://www.svgrepo.com/show/435345/highlight.svg"
        },
        {
            "title": "align left",
            "active": editor.isActive("textAlign", { align: "left" }),
            "func": () => editor.chain().focus().setTextAlign('left').run(),
            "disabled": "",
            "icon": "https://www.svgrepo.com/show/500765/alignleft.svg"
        },
        {
            "title": "align center",
            "active": editor.isActive("textAlign", { align: "center" }),
            "func": () => editor.chain().focus().setTextAlign('center').run(),
            "disabled": "",
            "icon": "https://www.svgrepo.com/show/500762/aligncenter.svg"
        },
        {
            "title": "align right",
            "active": editor.isActive("textAlign", { align: "right" }),
            "func": () => editor.chain().focus().setTextAlign('right').run(),
            "disabled": "",
            "icon": "https://www.svgrepo.com/show/500764/alignright.svg"
        },
        {
            "title": "clear all format",
            "active": editor.isActive("textAlign", { align: "right" }),
            "func": () => editor.chain().focus().unsetAllMarks().run(),
            // "func": () => {
            //     editor.chain().focus().unsetAllMarks().run();
            //     editor.chain().focus().setTextAlign('left').run();
            // },
            "disabled": "",
            "icon": "https://www.svgrepo.com/show/500799/brush.svg"
        },
        // {
        //     "title": "clear nodes",
        //     "active": editor.isActive("textAlign", { align: "right" }),
        //     "func": () => editor.chain().focus().clearNodes().run(),
        //     "disabled": ""
        // },
        {
            "title": "paragraph",
            "active": editor.isActive("paragraph"),
            "func": () => editor.chain().focus().setParagraph().run(),
            "disabled": "",
            "icon": "https://www.svgrepo.com/show/489075/paragraph.svg"
        },
        {
            "title": "heading 1",
            "active": editor.isActive("heading", { level: 1 }),
            "func": () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
            "disabled": "",
            "icon": "https://www.svgrepo.com/show/335078/heading-h1.svg"
        },
        {
            "title": "heading 2",
            "active": editor.isActive("heading", { level: 2 }),
            "func": () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
            "disabled": "",
            "icon": "https://www.svgrepo.com/show/335079/heading-h2.svg"
        },
        {
            "title": "heading 3",
            "active": editor.isActive("heading", { level: 3 }),
            "func": () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
            "disabled": "",
            "icon": "https://www.svgrepo.com/show/335081/heading-h3.svg"
        },
        {
            "title": "bullet list",
            "active": editor.isActive("bulletList"),
            "func": () => editor.chain().focus().toggleBulletList().run(),
            "disabled": "",
            "icon": "https://www.svgrepo.com/show/500919/list.svg"
        },
        {
            "title": "ordered list",
            "active": editor.isActive("orderedList"),
            "func": () => editor.chain().focus().toggleOrderedList().run(),
            "disabled": "",
            "icon": "https://www.svgrepo.com/show/452319/list-numbered.svg"
        },
        {
            "title": "code block",
            "active": editor.isActive("codeBlock"),
            "func": () => editor.chain().focus().toggleCodeBlock().run(),
            "disabled": "",
            "icon": "https://www.svgrepo.com/show/500814/code.svg"
        },
        {
            "title": "block quote",
            "active": editor.isActive("blockquote"),
            "func": () => editor.chain().focus().toggleBlockquote().run(),
            "disabled": "",
            "icon": "https://www.svgrepo.com/show/493715/quote-close-editor.svg"
        },
        {
            "title": "horizontal rule",
            "active": editor.isActive("horizontalRule"),
            "func": () => editor.chain().focus().setHorizontalRule().run(),
            "disabled": "",
            "icon": "https://www.svgrepo.com/show/361201/horizontal-rule.svg"
        },
        {
            // for link
            "title": "set link",
            "active": editor.isActive("link"),
            "func": () => {
                const url = window.prompt('Enter the link URL')
                if (url) {
                    editor.chain().focus().setLink({ href: url }).run()
                }
            },
            "icon": "https://www.svgrepo.com/show/500920/link.svg"
        },
        {
            // for image
            "title": "set image",
            "active": editor.isActive("image"),
            "func": () => setShowImageModal(true),
            "icon": "https://www.svgrepo.com/show/532576/image-square.svg"
        },
        {
            "title": "fullscreen",
            "active": isFullscreen,
            "func": () => setFullscreen((prev: any) => !prev),
            "icon": "https://www.svgrepo.com/show/520719/expand.svg"
        }
    ]
    return (
        <div className={`menu-bar bg-white
        ${isFullscreen && "sticky top-0 left-0 right-0 z-[100]"}`}>
            {/* Modal Gallery */}
            {
                TextEditorFeat.map((item, index) => (
                    <Button
                        key={index}
                        func={item.func}
                        active={item.active}
                        className='align-middle rounded-md'
                        tooltip={item.title}
                    >
                        {item.icon ?
                            <img src={item.icon}
                                alt={item.title}
                                className={`object-contain h-full pointer-events-auto
                                ${item.active ? "filter invert" : ""}
                                `}
                            />
                            : item.title}
                    </Button>
                ))
            }

            {/* Upload Image Modal */}
            <ImageModal
                isOpen={showImageModal}
                onClose={() => setShowImageModal(false)}
                onAddImage={addImage}
            />
        </div>
    )
}

export default ({ setData, data, setContent }: any) => {

    function uploadImage(file: any) {
        const data = new FormData();
        data.append('image', file);
        const test = axios.post('/api/uploadimage', data);
        return test;
    };

    const editor = useEditor({
        onUpdate: ({ editor }: any) => {
            setContent({
                content: editor.getHTML(),
            })
        },
        extensions: [

            Commands.configure({
                suggestion: {
                    items: getSuggestionItems,
                    render: renderItems,
                } as any
            }),
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
            //custom class for styling "star" on highlight
            StarNode,
            Link.configure({
                HTMLAttributes: {
                    class: 'link',
                },
                openOnClick: false,
            }),
            CharacterCount,
            Orderedlist,
        ],
        editorProps: {
            handlePaste: function (view, event, slice) {
                const items = Array.from(event.clipboardData?.items || []);
                for (const item of items) {
                    if (item.type.indexOf("image") === 0) {
                        let file = item.getAsFile();
                        if (!file) {
                            return false;
                        }
                        let filesize: number = parseFloat(((file.size / 1024) / 1024).toFixed(4));
                        if (filesize < 10) { // check image under 10MB
                            let img = new Image();
                            img.onload = function () {
                                if ((this as HTMLImageElement).width > 5000 || (this as HTMLImageElement).height > 5000) {
                                    window.alert("Your images need to be less than 5000 pixels in height and width."); // display alert
                                } else {
                                    uploadImage(file).then(function (response) {
                                        alert("Image uploaded successfully.");
                                        // insert the image into the editor
                                        view.dispatch(view.state.tr.replaceSelectionWith(view.state.schema.nodes.image.create({
                                            src: response.data.data.url,
                                            // alt: file.name,
                                            // title: file.name,
                                        })));
                                        // do something with the response
                                    }).catch(function (error) {
                                        if (error) {
                                            window.alert("There was a problem uploading your image, please try again.");
                                        }
                                    }).catch(function (error) {
                                        console.log(error);
                                        if (error) {
                                            window.alert("There was a problem uploading your image, please try again.");
                                        }
                                    });
                                }
                            };
                            img.src = URL.createObjectURL(file);
                        } else {
                            window.alert("Images need to be less than 10mb in size.");
                        }
                        return true; // handled
                    }
                }
                return false; // not handled
            },
            handleDrop: function (view, event, slice, moved) {
                if (!moved && event.dataTransfer && event.dataTransfer.files && event.dataTransfer.files[0]) {
                    // if dropping external files
                    let file = event.dataTransfer.files[0]; // the dropped file
                    let filesize: number = parseFloat(((file.size / 1024) / 1024).toFixed(4));
                    if ((file.type === "image/jpeg" || file.type === "image/png") && filesize < 10) {
                        // check valid  image size under 10MB
                        // check the dimensions
                        let _URL = window.URL || window.webkitURL;
                        let img = new Image();

                        img.src = _URL.createObjectURL(file);
                        img.onload = function () {
                            if (img.width > 5000 || img.height > 5000) {
                                window.alert("Your images need to be less than 5000 pixels in height and width."); // display alert
                            } else {
                                // valid image so upload to server
                                // uploadImage will be your function to upload the image to the server or s3 bucket somewhere
                                uploadImage(file).then(function (response) { // response is the image url for where it has been saved
                                    // insert the image into the editor
                                    view.dispatch(view.state.tr.replaceSelectionWith(view.state.schema.nodes.image.create({
                                        src: response.data.data.url,
                                        alt: file.name,
                                        title: file.name,
                                    })));
                                    // do something with the response
                                }).catch(function (error) {
                                    console.log(error);
                                    if (error) {
                                        window.alert("There was a problem uploading your image, please try again.");
                                    }
                                });
                            }
                        };
                    } else {
                        window.alert("Images need to be in jpg or png format and less than 10mb in size.");
                    }
                    return true; // handled
                }
                return false; // not handled use default behaviour
            }
        },
        content: data,
        onBlur: ({ editor }: any) => {
            setContent({
                content: editor.getHTML(),
            })
        },
    })


    const [isFullscreen, setIsFullscreen] = useState(false);

    return (
        <div
            className={`TextEditor bg-white ${isFullscreen && "fixed bottom-0 left-0 right-0 top-0 z-[100] expanded"}`}
        >
            <div
                className='border border-gray-300 rounded-md
                scrollable
                w-full
                h-full
                overflow-y-auto'
            >
                <MenuBar
                    isFullscreen={isFullscreen}
                    setFullscreen={setIsFullscreen}
                    editor={editor}
                />

                <EditorContent
                    allowFullScreen={true}
                    placeholder='Start typing...'
                    aria-placeholder='Start typing...'
                    editor={editor}
                    className={`content-editor bg-white px-[1rem] py-[2rem]
                    ${isFullscreen && "expanded"}`}
                    onClick={() => {
                        editor?.chain().focus().run()
                    }}
                />

                <div className={`character-count p-[0.5rem] text-primaryBlack text-opacity-50 font-poppins bg-white
                ${isFullscreen && "fixed bottom-0 left-0 right-0 z-[50]"}
                `}>
                    {editor?.storage.characterCount.words()} words
                </div>
            </div>
        </div>
    )
}