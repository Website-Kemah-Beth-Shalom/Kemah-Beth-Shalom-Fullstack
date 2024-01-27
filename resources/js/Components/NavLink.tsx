import { Link, InertiaLinkProps } from '@inertiajs/react';

export default function NavLink({ active = false, className = '', children, ...props }: InertiaLinkProps & { active: boolean }) {
    return (
        <Link
            {...props}
        >
            <span
                className={`flex flex-row items-center text-lg focus:none text-text1
                    justify-center relative hover:text-text3
                    ${active ? 'underline text-text1' : ''}
                    `}
            >
                {children}
            </span>
        </Link>
    );
}
