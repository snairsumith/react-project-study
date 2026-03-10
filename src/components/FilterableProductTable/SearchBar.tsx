interface SearchBarProps {
    filterText: string;
    inStockOnly: boolean;
    handleFilterTextChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleInStockOnlyChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const SearchBar = ({ filterText, inStockOnly, handleFilterTextChange, handleInStockOnlyChange }: SearchBarProps) => {
    return <form>
        <input
            type="text"
            value={filterText}
            placeholder="Search..."
            onChange={handleFilterTextChange}
        />
        <label>
            <input
                type="checkbox"
                checked={inStockOnly}
                onChange={handleInStockOnlyChange}
            />
            {' '}
            Only show products in stock
        </label>
    </form>;
};

export default SearchBar;