import { useEffect, useState } from "react";
import axios from "axios";
import { type Dog } from "../../types/Dogs";

type DogResponse = {

    id: string;
    type: string;
    attributes: {
        name: string;
        description: string;
        life: {
            max: number;
            min: number;
        };
    },
    relationships: {
        group: {
            data: {
                id: string;
                type: string;
            };
        };
    };
    country?: string;
}

const SideEffects = () => {
    //--------------------------------API call to get dogs--------------------------------
    const [dogs, setDogs] = useState<DogResponse[]>([]);
    const [loading, setLoading] = useState(true);
    const [loadDogs, setLoadDogs] = useState(false);

    useEffect(() => {
        if(loadDogs){
        axios.get("https://dogapi.dog/api/v2/breeds")
            .then((res) => {
                console.log(res.data.data)
                setDogs(res.data.data)
            }
            )
            .catch(err => {
                console.log(err)
            })
            .finally(() => {
                setLoading(false)
            });
        }
        return () => {
            setLoadDogs(false)
            setDogs([])
            setLoading(true)
        }
    },[loadDogs]);
    const onClickLoadDogs = () => {
        setLoadDogs(true)
    }
    
    //--------------------------------timer to load dogs every 10 seconds--------------------------------
    const [time,setTime] = useState(0);
    useEffect(() => {
        const timer = setInterval(() => {
            setTime(prev => prev + 1)
        }, 1000)
        return () => clearInterval(timer)
    }, [])

   
    return <div>
        <h1>Side Effects</h1>
        {loading && <h2>Loading...</h2>}
        <button onClick={onClickLoadDogs}>Load Dogs</button>
        {dogs.map(dog => <div key={dog.id} style={{ border: '1px solid black', padding: '10px', margin: '10px' }}>
            <h2>{dog.attributes.name}</h2>
            <p>{dog.attributes.description}</p>
            <p>Life: {dog.attributes.life.max} - {dog.attributes.life.min}</p>
            <p>Group: {dog.relationships.group.data.id}</p>
            <p>Country: {dog.country}</p>
        </div>)}


        {/* timer to show the time */}
        <h2>Time: {time}</h2>
    </div>;
};
export default SideEffects;