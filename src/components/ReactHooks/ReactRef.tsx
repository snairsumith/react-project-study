import { useEffect, useRef, useState } from "react";

const ReactRef = () => {
    const [count, setCount] = useState(0);
    
    const inputRef = useRef<HTMLInputElement>(null);
    const divRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);
    useEffect(() => {
         
        if (divRef.current) {
            if(count<10) {
                divRef.current.style.backgroundColor = 'red';
            } else {
                divRef.current.style.backgroundColor = 'blue';
            }
        }
    }, [count]);
    return <div>
         
         <div ref={divRef} style={{ width: '100px', height: '100px', backgroundColor: 'red' }}>
            <h1>Count: {count}</h1>
         </div>
         <input  placeholder="Type here..." style={{ border: '1px solid red',height: '100px' }} />
         <input ref={inputRef}  placeholder="Second Type here..." style={{ border: '1px solid red',height: '100px' }} />
        <button onClick={() => {setCount(count + 1);}}>Increment</button>
    </div>
}

export default ReactRef;