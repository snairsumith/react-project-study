
const Button = ({count,handleClick}:{count:number,handleClick:() => void}) => {
    return <button className="button" onClick={handleClick}>{count} Click me</button>;
};
export default Button;