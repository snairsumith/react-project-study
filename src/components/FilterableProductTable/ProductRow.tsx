import React from "react";
import type { Product } from "../../../types/Products";
const ProductRow = ({ product }: { product: Product }) => {
    const name = product.stocked ? product.name :
        <span style={{ color: 'red', fontWeight: 'bold', fontSize: '1.2rem', textDecoration: 'line-through', backgroundColor: '#535353' }}>
            {product.name}
        </span>;

    return (
        <tr>
            <td>{name}</td>
            <td>{product.price}</td>
        </tr>
    );
};

export default ProductRow;