export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
}

export interface ImageProps {
    id: number;
    title: string;
    url: string;
    size: number;
    thumbnail: string;
    created_at: string;
    updated_at: string;
}

export interface PaginateImageProps {
    current_page: number;
    data: ImageProps[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    next_page_url: string;
    path: string;
    per_page: number;
    prev_page_url: string;
    to: number;
    total: number;
    links: {
        url: string;
        label: string;
        active: boolean;
    }[];
}


export interface GalleryImageProps {
    id: number;
    description: string;
    image_id: number;
    published: number;
    created_at: string;
    updated_at: string;
    deleted_at?: string;
    image: ImageProps;
}

export interface BlogProps {
    id: number;
    title: string;
    slug: string;
    description: string;
    preview?: string;
    category: string;
    image: string;
    published: number;
    created_at: string;
    updated_at: string;
    deleted_at: string;
}

export interface PaginateBlogProps {
    current_page: number;
    data: BlogProps[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    next_page_url: string;
    path: string;
    per_page: number;
    prev_page_url: string;
    to: number;
    total: number;
    links: {
        url: string;
        label: string;
        active: boolean;
    }[];
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
    };
};