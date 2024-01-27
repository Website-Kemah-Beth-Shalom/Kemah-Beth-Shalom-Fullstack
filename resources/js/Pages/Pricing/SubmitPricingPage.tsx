import { DevTool } from "@hookform/devtools";
import { router } from "@inertiajs/react";
import axios from "axios";
// import { router } from '@inertiajs/react'
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { CalculateTotalCart } from "./CostEstimatorPage";
import { Rupiah } from "@/Utils/Currency";
import { useCart } from "@/Hooks/useCart";
import SectionContainer from "@/Components/General/SectionContainer";
import { InputError } from "@/Components/Input";
import Guest from "@/Layouts/GuestLayout";

interface SubmitedData {
    name?: string;
    phone?: string;
    email?: string;
    note?: string;
    address?: string;
    cart?: any;
}

export default function SubmitPricingPage() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SubmitedData>({ defaultValues: {} });

    const [customer_id, setCustomer_id] = React.useState<any>(null);
    useEffect(() => {
        const id = localStorage.getItem("customer_id");
        if (id) setCustomer_id(id);
        console.log(customer_id);
    }, []);

    const { cart } = useCart();

    const onSubmit = handleSubmit((data) => {
        data.cart = cart.map((item: any) => {
            return {
                product_id: item.id,
                material_id: item.selectedMaterialItem.map((material: any) => {
                    return material.id;
                }),
                width: item.selectedWidth,
                length: item.selectedLength,
                // depth: item.selectedDepth,
                notes: item.notes,
            };
        });
        console.log(data);
        axios
            .post("/cost/submit", data)
            .then((res) => {
                console.log(res);
                const id = res.data.id;
                localStorage.setItem("customer_id", id);
                window.alert("success");
            })
            .catch((err) => {
                console.log(err);
            });
    });

    const [visit, setVisit] = useState(false)

    return (
        <Guest>
            <SectionContainer>
                <div
                    className="flex flex-col items-center justify-center gap-8
                    w-full min-h-[35rem] h-fit py-[3.5rem]"
                >
                    <div className="flex flex-col justify-center items-start gap-[0.5rem] p-boxS w-full">
                        <h1 className="font-playfair text-[2.5rem] font-[500]">
                            My Cart
                        </h1>
                        <hr className="w-[30%] h-[0.1rem] bg-text1 mb-[1rem]" />
                        {/* Content */}
                        <p
                            className="text-text1 w-full max-w-[60rem] text-[1.125rem]
                        text-left"
                        >
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Sed porta nunc lacus, quis fermentum justo
                            vestibulum eget. Ut faucibus a ligula vitae
                            condimentum. Nullam porttitor erat nec luctus
                            finibus. Lorem ipsum dolor sit amet.
                        </p>
                    </div>
                    <section className="flex flex-col justify-center items-start gap-5 p-boxS rounded-lg w-full bg-bg2 font-niramit">
                        {cart.map((item: any) => {
                            return (
                                <div className="md:p-5 w-full justify-start items-start gap-5 md:gap-12 flex text-text2">
                                    <div className="w-auto flex-col justify-start items-center gap-2.5 flex">
                                        <img
                                            className="w-[20vw] md:w-[12rem] h-auto aspect-square object-cover rounded md:rounded-xl bg-primaryAdmin"
                                            src={item.image}
                                            alt={item.name}
                                        />
                                        <div className="text-center text-sm md:text-2xl font-medium">
                                            {Rupiah(item.totalPrice)}
                                        </div>
                                    </div>
                                    <div className="flex-grow flex-col justify-start items-start gap-1 md:gap-2.5 flex">
                                        <div className="text-text1 text-xl md:text-4xl font-medium">
                                            {item.name}
                                        </div>
                                        <div className="text-xs md:text-xl font-normal">
                                            Dimension (m) : {item.selectedWidth}{" "}
                                            x {item.selectedLength}{" "}
                                            {/* x {item.selectedDepth} */}
                                        </div>
                                        <hr className="w-full border-text3" />
                                        <div className="flex flex-col">
                                            <div>
                                                <span className="text-xs md:text-xl font-semibold">
                                                    Material : {""}
                                                </span>
                                                <span className="text-xs md:text-xl font-normal">
                                                    {item.selectedMaterialItem.map(
                                                        (material: any) => {
                                                            return (
                                                                material.name + ", "
                                                            ); // gatau berhasil engga
                                                        }

                                                        // {item.selectedMaterialItem.map(
                                                        //     (material: any) => {
                                                        //         return (
                                                        //             <div className="bg-text1 text-white rounded-lg p-[0.5rem]">
                                                        //                 {material.name}
                                                        //             </div>
                                                        //         );
                                                        //     }
                                                        // )}
                                                    )}
                                                </span>
                                            </div>
                                            <div>
                                                <span className="text-xs md:text-xl font-semibold">
                                                    Notes : {""}
                                                </span>
                                                <span className="text-xs md:text-xl font-normal">
                                                    {item.notes}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </section>

                    <div className="flex flex-col gap-6 w-full">
                        <h2 className="text-text1 text-2xl md:text-[1.75rem] font-[600] font-playfair w-full">
                            Personal Information
                        </h2>
                        <div className="w-full rounded-lg p-5 md:p-10 bg-bg2 rounded-md flex-col justify-start items-start gap-5 inline-flex">
                            <div className="rounded-md flex-col justify-start items-start gap-1 flex w-full">
                                <InputLabel label="Name" required />
                                <InputError
                                    message={errors.name && "Name is required"}
                                />
                                <input
                                    {...register("name", { required: true })}
                                    placeholder="Enter name"
                                    className="w-full text-sm md:text-md p-[.8rem] md:p-boxS rounded-md border-none focus:ring-text3 focus:border-text3"
                                />
                            </div>
                            <div className="rounded-md flex-col justify-start items-start gap-2.5 flex w-full">
                                <InputLabel label="Phone Number" required />
                                <input
                                    {...register("phone", { required: true })}
                                    placeholder="Enter phone number"
                                    className="w-full text-sm md:text-md p-[.8rem] md:p-boxS rounded-md border-none focus:ring-text3 focus:border-text3"
                                />
                            </div>
                            <div className="rounded-md flex-col justify-start items-start gap-2.5 flex w-full">
                                <InputLabel label="Email Address" required />
                                <input
                                    {...register("email", { required: true })}
                                    placeholder="Enter email address"
                                    className="w-full text-sm md:text-md p-[.8rem] md:p-boxS rounded-md border-none focus:ring-text3 focus:border-text3"
                                />
                            </div>
                            <div className="rounded-md flex-col justify-start items-start gap-2.5 flex w-full">
                                <InputLabel label="Additional Notes" />
                                <textarea
                                    {...register("note")}
                                    placeholder="Enter any additional notes"
                                    className="w-full text-sm md:text-md p-[.8rem] md:p-boxS rounded-md border-none focus:ring-text3 focus:border-text3"
                                />
                            </div>
                            <div className="rounded-md justify-start items-center gap-2.5 inline-flex">
                                <input
                                    name="visitCheck"
                                    type="checkbox"
                                    className="w-4 h-4 md:w-6 md:h-6 bg-bg2 border border-text2 rounded
                                        checked:hover:bg-deco2 checked:hover:border-transparent
                                        focus:ring-text3 focus:border-text3 text-text2"
                                    onChange={(e) => {
                                        if (e.target.checked) setVisit(true)
                                        else setVisit(false)
                                    }}
                                />
                                <div className="text-text1 text-md md:text-xl font-normal">
                                    I want to be visited
                                </div>
                            </div>
                            {visit ? (
                                <div className="rounded-md flex-col justify-start items-start gap-2.5 flex w-full">
                                    <InputLabel label="Address to visit" />
                                    <textarea
                                        {...register("address")}
                                        placeholder="Enter full address to be visited"
                                        className="w-full text-sm md:text-md p-[.8rem] md:p-boxS rounded-md border-none focus:ring-text3 focus:border-text3"
                                    />
                                </div>
                            ) : null}
                        </div>
                    </div>

                    <div className="flex flex-col gap-6 w-full">
                        <h2 className="text-text1 text-2xl md:text-[1.75rem] font-[600] font-playfair w-full">
                            Estimated Total Price
                        </h2>
                        <div className="flex flex-row justify-center items-center p-boxS w-full bg-bg2 ">
                            <p className="w-full h-full font-[500] text-lg md:text-[1.5rem] text-text1 ">
                                {Rupiah(CalculateTotalCart())}
                            </p>
                            <button
                                type="button"
                                onClick={onSubmit}
                                className="bg-deco2 text-text1 p-boxS w-[10rem] h-[3rem] flex justify-center items-center rounded-md font-[500] md:text-[1.125rem]"
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            </SectionContainer>
        </Guest>
    );
}

function InputLabel({
    label,
    required = false,
}: {
    label: string;
    required?: boolean;
}) {
    return (
        <div className="flex-col justify-start items-start flex w-full font-niramit">
            <div className="text-text1 text-xl md:text-2xl font-medium">{label}</div>
            {required ? (
                <div className="text-text3 text-xs font-light">Required</div>
            ) : null}
        </div>
    );
}
