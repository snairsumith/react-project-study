import './home.css';
import Nav from './components/Nav';
import Banner from './components/Banner';
import ProductList from './components/ProductList';
import { useState } from 'react';
import { TextInput } from '@mantine/core';
import { Button } from '@mantine/core';

const Home1 = () => {
    const products = [
        {
            id: 1,
            name: "Product 1",
            price: 100,
            isStock: true,
            description: "Description 1",
        },
        {
            id: 2,
            name: "Product 2",
            price: 200,
            isStock: true,
            description: "Description 2",
        },  
        {
            id: 3,
            name: "Product 3",
            price: 300,
            isStock: true,
            description: "Description 3",
        },
        {
            id: 4,
            name: "Product 4",
            price: 400, description: "Description 4",
            isStock: true,
        },
        {
            id: 5,
            name: "Product 5",
            price: 500, description: "Description 5",
            isStock: true,
        },
        {
            id: 6,
            name: "Product 6",
            price: 600,
            isStock: false,
            description: "Description 6",
        },
        {
            id: 7,
            name: "Product 7",
            price: 700,
            isStock: false,
            description: "Description 7",
        },
        {
            id: 8,
            name: "Product 8",
            price: 800,
            isStock: true,
            description: "Description 8",
        },
        {
            id: 9,
            name: "Product 9",
            price: 900,
            isStock: false,
            description: "Description 9",
        },
        {
            id: 10,
            name: "Product 10",
            price: 1000,
            isStock: false,
            description: "Description 10",
        },
    ];
    const [result, setResult] = useState<number>(0);
    const [firstNo, setFirstNo] = useState<number>(0);
    const [secondNo, setSecondNo] = useState<number>(0);
    const handleAdd = () => {
        setResult(firstNo + secondNo);
    }   
    const handleMouseEnter = () => {
        console.log("Mouse entered");
    }
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if(e.key === 'Enter') {
            handleAdd();
        }
    }
    return <div>
        <Nav />
        <Banner />
        <ProductList products={products} title="Product List" />
        <ProductList products={products} title="Featured Products List 2" />
        <div >
            <TextInput placeholder="First No" onChange={(e) => setFirstNo(parseInt(e.target.value))} size='md' />
            <TextInput placeholder="Second No" onChange={(e) => setSecondNo(parseInt(e.target.value))} onKeyDown={(e) => handleKeyDown(e)} />
            <p>Result: {result}</p>
            <Button onClick={handleAdd}>Add</Button>
        </div>
        
    </div>;
};

export default Home1;