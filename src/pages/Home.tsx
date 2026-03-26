import Menu from "../components/Home/Menu";
import Banner from "../components/Home/Banner";
import About from "../components/Home/About";
import { useTheme } from "../components/ReactHooks/ReactContext";

const Home = () => {
  const {theme, toggleTheme} = useTheme();
  return <div className={`main-container ${theme === 'light' ? 'light-theme' : 'dark-theme'}`}>
    <Menu />
    <Banner />
    <About />
    <h1>Theme: {theme}</h1>
    <button onClick={toggleTheme}>Toggle Theme</button>
  </div>;
};


export default Home;