import ProductCategoryRow from "./ProductCategoryRow";
import ProductRow from "./ProductRow";
import type { Product } from "../../../types/Products";

interface ProductTableProps {
    products: Product[];
    filterText: string;
    inStockOnly: boolean;
}
const  ProductTable = ({ products, filterText, inStockOnly }: ProductTableProps) => {
    const rows: any = [];
    let lastCategory: string | null = null;


  
    products.forEach((product) => {
        if (product?.name?.toLowerCase().indexOf(filterText.toLowerCase()) === -1) {
            return;
        }
        if (inStockOnly && !product?.stocked) {
            return;
        }
      if (product.category !== lastCategory) {
        rows.push(
          <ProductCategoryRow
            category={product.category}
            key={product.category} />
        );
      }
      rows.push(
        <ProductRow
          product={product}
          key={product.name} />
      );
      lastCategory = product.category;
    });
  
    return (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }

export default ProductTable;