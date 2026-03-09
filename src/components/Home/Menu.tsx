const Menu = () => {
    const menuItems = [
        {
            label: "Home",
            href: "/",
        },
        {
            label: "About",
            href: "/about",
        },
        {
            label: "Contact",
            href: "/contact",
        },
        {
            label: "Login",
            href: "/login",
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