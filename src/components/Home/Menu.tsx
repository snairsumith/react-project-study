import { Link } from "react-router-dom";

const Menu = () => {
    const menuItems = [
        {
            label: "Home",
            href: "/",
            isSub: false,
        },
        {
            label: "Login",
            href: "/login",
            isSub: false,
        },
        {
            label: "Filter Product",
            href: "/filter-product",
            isSub: true,
        },
        {
            label: "Side Effects",
            href: "/side-effects",
            isSub: true,
        },
        {
            label: "Data Fetch",
            href: "/data-fetch",
            isSub: true,
        },
        {
            label: "React Hooks",
            href: "/react-hooks",
            isSub: true,
        },
    ]

    return <div className="menu-container">
        <ul style={{ display: 'flex', gap: '10px', listStyle: 'none', margin: 0, padding: 0 }}>
            {menuItems.map((i, index: number) => (
                <li key={index} className={`menu-item ${i.isSub ? 'sub-style' : 'no-sub-style'}`}
                    // style={{
                    //     padding: '10px',
                    //     backgroundColor: i.isSub ? '#065d7f' : '#0e836c',
                    //     borderRadius: '5px',
                    // }}
                    >
                    <Link to={i.href} style={{ textDecoration: 'none', color: '#333', padding: '10px' }}>
                        {i.label}
                    </Link>
                </li>
            ))}
        </ul>
    </div>
};

export default Menu;