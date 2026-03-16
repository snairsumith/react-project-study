import { useEffect, useState } from "react";
import ProductTable from "../components/FilterableProductTable/ProductTable";
import SearchBar from "../components/FilterableProductTable/SearchBar";
import { products } from "../utils/product";

const FilterableProductTable = () => {

    const [filterText, setFilterText] = useState("");
    const [inStockOnly, setInStockOnly] = useState(false);
   

    const handleFilterTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilterText(e.target.value);
    }

    const handleInStockOnlyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInStockOnly(e.target.checked);
    }

 


    return <>

        <div>

        </div>
        <SearchBar
            filterText={filterText}
            inStockOnly={inStockOnly}
            handleFilterTextChange={handleFilterTextChange}
            handleInStockOnlyChange={handleInStockOnlyChange}
        />


        <ProductTable products={products} filterText={filterText} inStockOnly={inStockOnly} />
    </>;
};

export default FilterableProductTable;