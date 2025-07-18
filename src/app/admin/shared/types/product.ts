export interface Product {
    name: string
    image_url: string
    price: string;
    stock: number;
    specifications: Specification[];
    explanation: Explanation[];
}

export interface Specification {
    value: string;
    category_id: number;
    category_name: string;
    subcategory_id: number;
    subcategory_name: string;
}

export interface Explanation {
    partname: string;
    value: string;
}
