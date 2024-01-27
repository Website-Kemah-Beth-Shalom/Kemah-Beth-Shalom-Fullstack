import React, { useEffect } from "react";
import { router, usePage } from "@inertiajs/react";
import Guest from "@/Layouts/GuestLayout";
import ProductPricingCard from "./Components/ProductPricingCard";
import { ProductMaterialItemProps } from "@/types/product";
import { useCart } from "@/Hooks/useCart";
import { Rupiah } from "@/Utils/Currency";
import SectionContainer from "@/Components/General/SectionContainer";

type Props = {
    Product_add_on: any;
    Products: any;
};

interface CartContextProps {
    UserCart: {
        selectedMaterialItem: ProductMaterialItemProps[];
        totalPrice: number;
    }[];
    setUserCart: any;
}

export default function CostEstimatorPage() {
    const companyData: any = usePage().props.companyData; //get page info

    const { Products } = usePage<Props>().props;
    const [UserCart, setUserCart] = React.useState<any>([]);

    const handleSubmit = () => {
        router.visit("/cost/submit");
    };

    return (
        <Guest footer={false}>
            <SectionContainer>
                <div className="flex flex-col items-center justify-center gap-8
                    w-full min-h-[35rem] h-fit py-[3.5rem]" >
                    {/* Header */}
                    <div className="flex flex-col justify-center items-start gap-[0.5rem] w-full">
                        <h1 className="font-playfair text-[2.5rem] font-medium">
                            {companyData.cost_title}
                        </h1>
                        <hr className="w-[30%] h-[0.1rem] bg-primaryBlack mb-[1rem]" />
                        {/* Content */}
                        <p
                            className="text-primaryBlack w-full max-w-[60rem] text-[1.125rem] text-left"
                        >
                            {companyData.cost_description}
                        </p>
                    </div>

                    <div className="w-full pb-[5rem]">
                        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                            {Products?.map((item: any) => {
                                return (
                                    <ProductPricingCard
                                        key={item.id}
                                        {...item}
                                    />
                                );
                            })}
                        </div>
                        {/* Cart Floatting Button */}
                        <button
                            className="bg-deco2 shadow-lg
                            fixed right-10 bottom-10
                            rounded-r-full flex flex-col gap-1 z-30
                            p-3 opacity-90
                            pointer-events-auto hover:bg-opacity-70"
                            onClick={handleSubmit}
                        >
                            <div
                                className="flex flex-col justify-center items-start
                                px-3
                                text-xs font-light"
                            >
                                2 item(s)
                            </div>
                            <div
                                id="cart-content"
                                className="flex flex-col justify-center items-start gap-1 h-fit
                                px-3 w-full font-[500]"
                            >
                                {Rupiah(CalculateTotalCart())}
                            </div>
                        </button>
                    </div>
                </div>
            </SectionContainer>
        </Guest>
    );
}

// Get total price from cart (localstorage & context)
export const CalculateTotalCart = () => {
    const { cart } = useCart();
    let total = 0;
    cart?.map((item: any) => {
        total += item.totalPrice;
    });
    return total;
};
