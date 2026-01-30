export interface Product {
    id: string;
    name: string;
    price: number;
    description: string;
    images: string[];
    sizes: string[];
    colors: string[]; // hex codes
}
  
export interface CartItem extends Product {
    selectedSize: string;
    selectedColor: string;
    quantity: number;
}
