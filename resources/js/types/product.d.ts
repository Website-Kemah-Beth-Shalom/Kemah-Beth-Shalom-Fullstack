export interface ProductProps {
    id: number;
    name: string;
    description: string;
    image: string;
    price: number;
    is_display: number;
    priority: number;
    created_at: string;
    updated_at: string;
    deleted_at: string;
    // product_add_on?: ProductAddOnProps[];
    productmaterial?: ProductMaterialProps[];
}

export interface ProductMaterialProps {
    id: number;
    name?: string;
    description?: string;
    product_id: number;
    created_at?: string;
    updated_at?: string;
    deleted_at?: string;
    productmaterialitems?: ProductMaterialItemProps[];
}


export interface ProductMaterialItemProps {
    id?: number;
    name?: string;
    productmaterial_id?: number;
    price: number;
    description?: string;
    created_at?: string;
    updated_at?: string;
    deleted_at?: string;
}