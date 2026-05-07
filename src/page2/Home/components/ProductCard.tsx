import type { ProductListTypes } from "../../../../types/Products";

interface ProductCardProps {
    product: ProductListTypes;
}
const ProductCard = ({ product }: ProductCardProps) => {
    return (
        <div className={`product-card-container ${product.isStock ? 'in-stock' : 'out-of-stock'}`}>
         <h6>{product.name}</h6>
            <p>{product.description}</p>
            <p>{product.price}</p>
            {product.isStock && <p>In Stock</p>}
            {!product.isStock && <p>Out of Stock</p>}
        </div>
    )
};

export default ProductCard;