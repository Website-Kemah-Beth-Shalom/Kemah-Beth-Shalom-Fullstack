import { usePage } from "@inertiajs/react";

type Props = {
    src?: string;
    alt?: string;
    className?: string;
};

const Image = ({ src, alt, ...props }: Props) => {
    const companyData: any = usePage().props.companyData; //get page info
    return (
        <img
            className={`aspect-square object-cover ${props.className}`}
            src={src ? src : companyData?.placeholder_image}
            alt={alt}
            {...props}
        />
    );
};

export default Image;
