import { PageProps } from "@/types";
import React, { useEffect } from "react";
import { useForm } from "@inertiajs/react";
import { router } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import { ImageModal } from "@/Components/TextEditor/ImageModal";
import { toast } from 'react-toastify';

interface Webconfig {
    image: WebconfigData[];
    text: WebconfigData[];
    textarea: WebconfigData[];
}
interface WebconfigData {
    id: number;
    title: string;
    category: string;
    value: string;
    thumbnail?: string;
    updated_at: string;
    alias: string;
    type: string;
}

export default function AdminWebConfigPage({
    home,
    general,
    cost,
    blog,
    contact,
}: PageProps & {
    home: Webconfig;
    general: Webconfig;
    cost: Webconfig;
    blog: Webconfig;
    contact: Webconfig;
}) {

    return (
        <AdminLayout>
            <div className="text-black flex flex-col justify-center items-center">
                <div
                    className=" overflow-visible sm:rounded-lg
                    flex flex-col w-full gap-[1rem] p-[1rem] "
                >
                    <Section title="General" data={general} />
                    <Section title="Home" data={home} />
                    <Section title="Cost" data={cost} />
                    <Section title="Blog" data={blog} />
                    <Section title="Contact" data={contact} />
                </div>
            </div>
        </AdminLayout>
    );
}

const Type = ["all", "text", "textarea", "image", "file"];

const Section = ({
    title,
    data,
}: {
    title: string;
    children?: React.ReactNode;
    data: Webconfig;
}) => {
    const [tab, setTab] = React.useState<
        "all" | "text" | "textarea" | "image" | "file"
    >("all");
    const { image, text, textarea } = data ?? {
        image: [],
        text: [],
        textarea: [],
    };
    // all data
    const allData = [...image, ...text, ...textarea];

    return (
        <section className="flex flex-col gap-[1rem]">
            <div className="flex flex-row justify-between items-center">
                <h1 className="text-[1.5rem] font-semibold text-primaryAdmin font-poppins">
                    {title} Section
                </h1>
                <div className="flex gap-2">
                    {Type.map((type: any) => {
                        return (
                            <button
                                className={`
                                    px-[1rem] py-[0.5rem] rounded-md uppercase
                                    ${tab === type
                                        ? "bg-primaryAdmin text-white"
                                        : "bg-slate-100 text-primaryAdmin"
                                    }`}
                                key={type}
                                onClick={() => setTab(type)}
                            >
                                {type}
                            </button>
                        );
                    })}
                </div>
            </div>
            <div className="flex flex-col gap-[1rem]">
                {tab === "all" &&
                    allData.map((webconfig: WebconfigData) => {
                        if (webconfig.type === "image") {
                            return (
                                <ImageCard key={webconfig.id} {...webconfig} />
                            );
                        } else if (webconfig.type === "textarea") {
                            return (
                                <TextCard key={webconfig.id} {...webconfig} />
                            );
                        } else {
                            return (
                                <TextCard key={webconfig.id} {...webconfig} />
                            );
                        }
                    })}
                {tab === "text" &&
                    text.map((webconfig: WebconfigData) => {
                        return <TextCard key={webconfig.id} {...webconfig} />;
                    })}
                {tab === "textarea" &&
                    textarea.map((webconfig: WebconfigData) => {
                        return <TextCard key={webconfig.id} {...webconfig} />;
                    })}
                {tab === "image" &&
                    image.map((webconfig: WebconfigData) => {
                        return <ImageCard key={webconfig.id} {...webconfig} />;
                    })}
            </div>
        </section>
    );
};

const TextCard = (webconfig: WebconfigData) => {
    const defaultData = {
        id: webconfig.id,
        title: webconfig.title,
        category: webconfig.category,
        value: webconfig.value,
    };
    const { data, setData, post, processing, errors } = useForm({
        id: webconfig.id,
        title: webconfig.title,
        category: webconfig.category,
        value: webconfig.value,
    });
    // submit form
    const [isDisabled, setIsDisabled] = React.useState(false);

    // handle change
    const handleChange = (e: any) => {
        const key = e.target.id;
        const value = e.target.value;
        setData((data) => ({
            ...data,
            [key]: value,
        }));
    };
    const handleSubmit = (e: any) => {
        e.preventDefault();
        router.post(`/admin/webconfig`, data, {
            forceFormData: true,
            onSuccess: () => {
                toast.success('Content updated!')
            },
            onError: (errors) => {
                console.log(errors);
                toast.error('Failed to update content')
            }
        })
    };

    // check if value doesn't change
    useEffect(() => {
        if (
            JSON.stringify(defaultData) === JSON.stringify(data) ||
            errors.value ||
            data.value === ""
        ) {
            setIsDisabled(true);
        } else {
            setIsDisabled(false);
        }
    }, [data]);

    const [showModal, setShowModal] = React.useState(false);

    useEffect(() => {
        if (showModal) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
    }, [showModal]);
    return (
        <>
            <section
                title={webconfig.alias}
                data-tooltip-target="tooltip-default"
                className="
                    flex flex-col justify-between items-start
                    bg-slate-100 shadow-sm
                    border border-gray-300
                    rounded-md w-full group"
            >
                <div className="py-2 px-boxS bg-slate-200 w-full rounded-t-md text-sm">
                    {webconfig.alias}
                </div>
                <div className="p-boxS flex justify-between items-center w-full">
                    <div
                        className="font-poppins text-[1.125rem] text-primaryAdmin font-[600]
                        w-[20rem] line-clamp-3"
                    >
                        {webconfig.value}
                    </div>

                    <div className="text-primaryAdmin font-poppins">
                        Updated {webconfig.updated_at ?? "-"}
                    </div>

                    <button
                        onClick={() => setShowModal(true)}
                        title="Edit this item"
                        className="bg-primaryAdmin border-none outline-none
                rounded-md px-[1rem] py-[0.5rem] hover:bg-opacity-70
                transition duration-300 ease-in-out"
                    >
                        <img
                            src="https://www.svgrepo.com/show/511906/edit-1483.svg"
                            className="w-[1rem] h-[1rem] filter invert"
                            alt=""
                        />
                    </button>
                </div>
            </section>

            {/* Edit Modal */}
            <section
                className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-50
        flex flex-col justify-center items-center
        ${showModal ? "flex" : "hidden"}`}
            >
                <form
                    onClick={(e: any) => {
                        e.stopPropagation();
                        e.preventDefault();
                        setShowModal(false);
                    }}
                    className={`bg-white shadow-md rounded-md p-boxS w-[30rem] flex flex-col gap-[1rem]
                `}
                >
                    <div
                        onClick={(e: any) => {
                            e.stopPropagation();
                        }}
                        className="flex flex-row justify-between items-center"
                    >
                        <h1 className="font-poppins text-[1.5rem] text-primaryAdmin font-semibold">
                            Edit {webconfig.alias}
                        </h1>
                        <button
                            onClick={(e: any) => {
                                e.stopPropagation();
                                e.preventDefault();
                                setShowModal(false);
                            }}
                            className="text-[2rem] rounded-md px-[1rem] text-black font-poppins"
                        >
                            &times;
                        </button>
                    </div>
                    {webconfig.type === "textarea" ? (
                        <textarea
                            onClick={(e: any) => {
                                e.stopPropagation();
                            }}
                            placeholder="Input description"
                            defaultValue={webconfig.value}
                            onChange={handleChange}
                            id="value"
                            className="h-[10rem]"
                        />
                    ) : (
                        <input
                            onClick={(e: any) => {
                                e.stopPropagation();
                            }}
                            defaultValue={webconfig.value}
                            onChange={handleChange}
                            id="value"
                        />
                    )}
                    <button
                        onClick={handleSubmit}
                        className="bg-primaryAdmin text-white p-boxS
                    rounded-md px-[1rem] py-[0.5rem] hover:bg-opacity-70
                    "
                    >
                        Apply Changes
                    </button>
                </form>
            </section>
        </>
    );
};

const ImageCard = (webconfig: WebconfigData) => {
    const handleChangeImageCallback = (url: string) => {
        router.post(
            `/admin/webconfig`,
            {
                id: webconfig.id,
                title: webconfig.title,
                category: webconfig.category,
                value: url,
            },
            {
                forceFormData: true,
                onSuccess: () => {
                    toast.success('Content updated!')
                },
                onError: (errors) => {
                    console.log(errors);
                    toast.error('Failed to update content')
                }
            }
        );
    };

    const [showModal, setShowModal] = React.useState(false);

    useEffect(() => {
        if (showModal) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
    }, [showModal]);

    return (
        <>
            <section
                title={webconfig.alias}
                className="
                    flex flex-col justify-between items-start
                    bg-slate-100 shadow-sm
                    border border-gray-300
                    rounded-md w-full group"
            >
                <div className="py-2 px-boxS bg-slate-200 w-full rounded-t-md text-sm">
                    {webconfig.alias}
                </div>
                <div className="p-boxS flex justify-between items-center w-full">
                    <div
                        className="font-poppins text-[1.125rem] text-primaryAdmin font-[600]
                    w-[20rem] line-clamp-3
                    "
                    >
                        <img
                            className="object-contain"
                            src={webconfig.value}
                            alt={webconfig.title}
                        />
                    </div>

                    <div className="text-primaryAdmin font-poppins">
                        Updated {webconfig.updated_at ?? "-"}
                    </div>

                    <button
                        onClick={() => setShowModal(true)}
                        title="Edit this item"
                        className="bg-primaryAdmin border-none outline-none
                    rounded-md px-[1rem] py-[0.5rem] hover:bg-opacity-70
                    transition duration-300 ease-in-out"
                    >
                        <img
                            src="https://www.svgrepo.com/show/511906/edit-1483.svg"
                            className="w-[1rem] h-[1rem] filter invert"
                            alt=""
                        />
                    </button>
                </div>
            </section>

            {/* Edit Modal */}
            <ImageModal
                isOpen={showModal}
                onAddImage={(url: string) => {
                    handleChangeImageCallback(url);
                }}
                onClose={() => setShowModal(false)}
            />
        </>
    );
};
