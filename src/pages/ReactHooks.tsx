import Menu from "../components/Home/Menu";
import { useTheme } from "../components/ReactHooks/ReactContext";
import ReactRef from "../components/ReactHooks/ReactRef";

const ReactHooks = () => {
    const {theme, toggleTheme} = useTheme();

    return <div className={`main-container ${theme === 'light' ? 'light-theme' : 'dark-theme'}`}>
        <Menu />
        <h1>Theme: {theme}</h1>
        <ReactRef />
        <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
}

export default ReactHooks;