import React, { useState, useEffect, useContext } from "react";
import { CloseIcon } from "@/Components/General/Icon";
import { useForm, useWatch } from "react-hook-form";
import {
    ProductMaterialItemProps,
    ProductMaterialProps,
} from "@/types/product";
import { CloseButton } from "@/Components/Button";
import { ModalOverlay } from "@/Components/Modal";
import { MetricUnit, metricConverter } from "@/Utils/metricConverter";
import { useCart } from "@/Hooks/useCart";
import { Rupiah } from "@/Utils/Currency";

type seletectedProduct = {
    selectedWidth: number;
    selectedLength: number;
    // selectedDepth: number,
    selectedTotalSize: number;
    selectedPrice: number[];
    selectedMaterialItem: ProductMaterialItemProps[];
    notes?: string;
};

type ProductPricingCardProps = {
    id: number;
    name: string;
    image: string;
    price: number;
    description: string;
    productmaterial: ProductMaterialProps[];
};

export default function ProductPricingCard({
    ...props
}: ProductPricingCardProps) {
    const { cart, addCartMutation } = useCart(); // context

    const {
        register,
        handleSubmit,
        setValue,
        control,
        formState: { errors },
    } = useForm<seletectedProduct>();

    const selectedMaterialItem = useWatch({
        control,
        name: "selectedMaterialItem",
        defaultValue: [],
    });

    const selectedPrice = useWatch({
        control,
        name: "selectedPrice",
        defaultValue: [],
    });

    const selectedWidth = useWatch({
        control,
        name: "selectedWidth",
        defaultValue: 0,
    });
    const selectedLength = useWatch({
        control,
        name: "selectedLength",
        defaultValue: 0,
    });
    // const selectedDepth = useWatch({
    //     control,
    //     name: "selectedDepth",
    //     defaultValue: 0
    // })

    // calculate total price
    const [totalPrice, setTotalPrice] = useState<number>(0);

    useEffect(() => {
        setTotalPrice(
            CalculateTotal({
                selectedMaterialItem: selectedMaterialItem,
                width: selectedWidth,
                length: selectedLength,
                basePrice: props.price,
                // depth: selectedDepth,
            })
        );
    }, [selectedMaterialItem, selectedWidth, selectedLength]);
    // }, [selectedMaterialItem, selectedWidth, selectedLength, selectedDepth])

    const onSubmit = handleSubmit((data) => {
        addCartMutation({
            id: props.id,
            name: props.name,
            image: props.image,
            description: props.description,
            basePrice: props.price,
            totalPrice: totalPrice,
            selectedLength: data.selectedLength,
            selectedWidth: data.selectedWidth,
            // selectedDepth: data.selectedDepth,
            selectedMaterialItem: selectedMaterialItem,
            selectedPrice: selectedPrice,
            notes: data.notes,
        });
        handleCloseModal(); // close modal after submit
    });

    // Modal State
    const [openModal, setOpenModal] = useState<boolean>(false);
    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);

    return (
        <>
            {/* Card and trigger */}
            <button
                onClick={handleOpenModal} // trigger modal
                className="flex flex-col justify-center items-center gap-5 p-boxS w-full
                    border-2 border-deco1 rounded-lg cursor-pointer
                    hover:border-deco2"
            >
                <img
                    className="w-full
                        h-auto aspect-square
                        object-cover rounded-md bg-secondary"
                    src={props.image}
                    alt={props.name}
                />
                <h3 className="font-niramit font-[400] text-[1.375rem]">
                    {props.name}
                </h3>
            </button>

            {/* Modal Section */}
            <ModalOverlay onClose={handleCloseModal} show={openModal}>
                {/* Modal content */}
                <div
                    key={props.id}
                    onClick={(e) => {
                        e.stopPropagation();
                    }}
                    className="bg-bg2 flex flex-col gap-2 rounded-lg border-2 border-deco1
                    md:min-w-[30rem] max-h-[80vh] w-[80vw] md:w-auto md:max-w-[90vw] pt-5 font-niramit"
                >
                    {/* Modal Header */}
                    <header className="px-10 flex justify-between items-center gap-2">
                        <h1 className="text-3xl md:text-[2rem] font-semibold ">
                            {props.name}
                        </h1>
                        <CloseButton onClick={handleCloseModal} />
                    </header>

                    {/* divider */}
                    <hr className="border border-deco1 w-[90%] mx-auto" />

                    {/* Modal Body */}
                    <section
                        className="flex flex-col gap-8 px-10 py-2
                        md:flex-row overflow-y-scroll md:overflow-y-auto"
                    >
                        <div
                            className={`flex flex-col gap-4 md:overflow-y-scroll
                            max-h-[30rem] w-[100%] md:w-[25rem]
                            scrollbar md:pr-[1.5rem]
                            ${
                                props.productmaterial.length > 1
                                    ? "flex"
                                    : "hidden"
                            }`}
                        >
                            {props.productmaterial.map(
                                (material: ProductMaterialProps) => {
                                    return (
                                        <div
                                            key={material.id}
                                            className="flex flex-col items-start w-full"
                                        >
                                            <h1 className="font-semibold md:font-[500] text-xl md:text-[1.75rem]">
                                                {material.name}
                                            </h1>
                                            <label
                                                className="text-xs font-[400] text-deco1"
                                                htmlFor=""
                                            >
                                                Required - Select 1
                                            </label>

                                            {/* Mapping Material Items Selection */}
                                            <div className="flex flex-col gap-1.5 w-full">
                                                {material.productmaterialitems?.map(
                                                    (item: any) => {
                                                        return (
                                                            <div
                                                                key={item.id}
                                                                className="flex items-center gap-2 justify-between w-full"
                                                            >
                                                                <div className="flex flex-wrap text-md md:text-lg font-[400] text-text1 flex gap-2 justify-between w-full">
                                                                    <div>
                                                                        {
                                                                            item.name
                                                                        }
                                                                    </div>
                                                                    <div>
                                                                        +{" "}
                                                                        {Rupiah(
                                                                            item.price
                                                                        )}
                                                                    </div>
                                                                </div>
                                                                <input
                                                                    className="w-[1rem] h-[1rem] md:w-[1.5rem] md:h-[1.5rem] rounded-full
                                                                        checked:bg-text2 checked:border-transparent
                                                                        border border-deco1
                                                                        checked:hover:bg-deco2 checked:hover:border-transparent focus:ring-text3 focus:border-text3 text-text2"
                                                                    type="checkbox"
                                                                    name={
                                                                        material.name
                                                                    }
                                                                    id={item.id}
                                                                    value={item}
                                                                    onChange={(
                                                                        e
                                                                    ) => {
                                                                        if (
                                                                            e
                                                                                .target
                                                                                .checked
                                                                        ) {
                                                                            setValue(
                                                                                "selectedMaterialItem",
                                                                                [
                                                                                    ...selectedMaterialItem,
                                                                                    item,
                                                                                ]
                                                                            );
                                                                            setValue(
                                                                                "selectedPrice",
                                                                                [
                                                                                    ...selectedPrice,
                                                                                    item.price,
                                                                                ]
                                                                            );
                                                                        } else {
                                                                            setValue(
                                                                                "selectedMaterialItem",
                                                                                selectedMaterialItem.filter(
                                                                                    (
                                                                                        material: ProductMaterialItemProps
                                                                                    ) =>
                                                                                        material.id !==
                                                                                        item.id
                                                                                )
                                                                            );
                                                                            setValue(
                                                                                "selectedPrice",
                                                                                selectedPrice.filter(
                                                                                    (
                                                                                        price: number
                                                                                    ) =>
                                                                                        price !==
                                                                                        item.price
                                                                                )
                                                                            );
                                                                        }
                                                                    }}
                                                                />
                                                            </div>
                                                        );
                                                    }
                                                )}
                                            </div>
                                        </div>
                                    );
                                }
                            )}
                        </div>

                        {/* divider */}
                        <hr className="md:hidden border border-deco1 w-full mx-auto" />

                        {/* Section Dimensons */}
                        <div className="flex flex-col gap-1 items-start">
                            <h1 className="font-semibold md:font-medium text-xl md:text-2xl">
                                Dimensions
                            </h1>
                            <p className="text-red-500">
                                {errors.selectedWidth && "Width is required"}
                            </p>
                            <p className="text-red-500">
                                {errors.selectedLength && "Length is required"}
                            </p>
                            {/* <p className='text-red-500'>
                                {errors.selectedDepth && "Depth is required"}
                            </p> */}
                            <div className="flex gap-4 justify-center items-center font-bold">
                                <div className="flex items-center">
                                    <input
                                        min={0}
                                        className="w-[4rem] h-[2.5rem] text-center placeholder:text-center
                                        border border-deco1 rounded-s-md text-sm md:text-md font-medium focus:ring-text3 focus:border-text3"
                                        id="selectedWidth"
                                        type="number"
                                        placeholder="10"
                                        {...register("selectedWidth", {
                                            required: true,
                                        })}
                                    />
                                    <span className="inline-flex items-center h-[2.5rem] px-[.8rem] font-medium text-sm text-bg1 bg-deco1 border rounded-e-lg border-deco1">
                                        m
                                    </span>
                                </div>
                                <div className="text-xl font-light text-text2">
                                    x
                                </div>
                                <div className="flex items-center">
                                    <input
                                        min={0}
                                        className="w-[4rem] h-[2.5rem] text-center placeholder:text-center
                                        border border-deco1 rounded-s-md text-sm md:text-md font-medium focus:ring-text3 focus:border-text3"
                                        id="selectedLength"
                                        type="number"
                                        placeholder="10"
                                        {...register("selectedLength", {
                                            required: true,
                                        })}
                                    />
                                    <span className="inline-flex items-center h-[2.5rem] px-[.8rem] font-medium text-sm text-bg1 bg-deco1 border rounded-e-lg border-deco1">
                                        m
                                    </span>
                                </div>
                                {/* <div className="text-xl font-light text-text2">x</div>
                                <div className="flex items-center">
                                    <input
                                        min={0}
                                        className="w-[4rem] h-[2.5rem] text-center placeholder:text-center
                                        border border-deco1 rounded-s-md text-sm md:text-md font-medium focus:ring-text3 focus:border-text3"
                                        id="selectedLength"
                                        type="number"
                                        placeholder="10"
                                        {...register("selectedDepth", {
                                            required: true,
                                        })}
                                    />
                                    <span className="inline-flex items-center h-[2.5rem] px-[.8rem] font-medium text-sm text-bg1 bg-deco1 border rounded-e-lg border-deco1">
                                        m
                                    </span>
                                </div> */}
                            </div>
                            {/* {selectedData.selectedTotalSize} meter kubik */}
                            <input
                                type="text"
                                className="w-full mt-3 p-2 border border-deco1 rounded-md focus:ring-text3 focus:border-text3"
                                placeholder="notes"
                                {...register("notes", { required: false })}
                            />
                        </div>
                    </section>

                    <section
                        className="
                        px-[2.5rem] py-[1rem] rounded-md
                        text-bg1 text-2xl bg-text2 flex flex-row justify-between items-center p-[0.5rem] w-full"
                    >
                        {Rupiah(totalPrice)}
                        <button
                            onClick={onSubmit}
                            className="flex justify-center items-center border-white border rounded-md px-8 py-1.5
                            disabled:opacity-50 disabled:cursor-not-allowed hover:bg-bg2 hover:bg-opacity-20 transition ease-in-out duration-200"
                        >
                            Add
                        </button>
                    </section>
                </div>
            </ModalOverlay>
        </>
    );
}

interface CalculateProps {
    selectedMaterialItem: any[];
    width?: number;
    length?: number;
    depth?: number;
    basePrice: number;
    metric?: MetricUnit;
}

export const CalculateTotal = ({
    selectedMaterialItem = [],
    width = 1,
    depth = 1,
    length = 1,
    metric = "m",
    basePrice,
}: CalculateProps) => {
    // convert all item first
    width = metricConverter(width, metric);
    length = metricConverter(length, metric);
    // depth = metricConverter(depth, metric)
    // prevent zero
    // if (width === 0) width = 1
    // if (length === 0) length = 1
    if (depth === 0) depth = 1;

    const dimensions = width * length;
    // const dimensions = width * depth * length

    // total of selected material item
    let materialTotal = 0;
    selectedMaterialItem.forEach((item: ProductMaterialItemProps) => {
        // materialTotal +=  item.price
        // convert to number first
        materialTotal += Number(item.price);
    });

    console.log("materialTotal", materialTotal);
    let total_material_price = materialTotal * dimensions;

    // total base price of the product
    let total_base_price = 1 * basePrice * dimensions;

    const total = total_base_price + total_material_price;
    return total;
};
