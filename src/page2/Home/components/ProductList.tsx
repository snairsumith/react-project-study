import type { ProductListTypes } from "../../../../types/Products";
import ProductCard from "./ProductCard";


interface ProductListProps {
    products: ProductListTypes[];
    title: string;
}
const ProductList = ({ products, title }: ProductListProps) => {
   
    
    return <div className="product-list-container">
        <h1>{title}</h1>
        <div className="product-list-items">
            {products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>

        


    </div>;
};

export default ProductList;