const Menu = () => {
    const menuItems = [
        {
            label: "Home",
            href: "/",
        },
        {
            label: "Login",
            href: "/login",
        },
        {
            label: "Filter Product",
            href: "/filter-product",
        },
        {
            label: "Side Effects",
            href: "/side-effects",
        },
        {
            label: "Data Fetch",
            href: "/data-fetch",
        },
    ]

    return <div className="menu-container">
        <ul>    
        {menuItems.map((i,index:number) => (
            <li key={index}><a href={i.href} >{i.label}</a></li>
        ))}
        </ul>
    </div>
};

export default Menu;