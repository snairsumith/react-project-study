import { useEffect, useRef, useState } from "react";

const DataFetchV2 = () => {
    const [search, setSearch] = useState<string>("");
    const [count, setCount] = useState<number>(0);
    const inputRef = useRef<HTMLInputElement | null>(null)
    const divRef = useRef<HTMLDivElement | null>(null)


    useEffect(() => {
      if(divRef.current){
        divRef.current.style.backgroundColor = 'red';
      }
    }, []); 

    
    useEffect(() => {
      if(divRef.current){
        divRef.current.style.backgroundColor = 'red';
      }
    }, [count,search]); 
   

    useEffect(() => {
    
      if(inputRef.current&&divRef.current){
        if(count>5){
        inputRef.current.style.backgroundColor = 'red';
        divRef.current.style.backgroundColor = 'red';
        }else{
          inputRef.current.style.backgroundColor = 'blue';
          divRef.current.style.backgroundColor = 'blue';
        }
      }
    }, [count]);


  return (
  <div ref={divRef}>
    <h1>Data Fetch V2</h1>
    <h1>{count}</h1>
    <button onClick={() => setCount(count + 1)}>Increment</button>
    <button onClick={() => setCount(count - 1)}>Decrement</button>
    <input ref={inputRef} type="text" placeholder="Search by name" value={search} onChange={(e) => setSearch(e.target.value)}
    
    style={{
      width: '500px',
      height: '30px',
      border: '1px solid #ccc',
      borderRadius: '5px',
      margin: '10px',
      padding: '10px',
    }} />
    {/* {breeds.map((breed) => (
      <div key={breed.id}>{breed.name}</div>
    ))} */}
  </div>
  )
};

export default DataFetchV2;