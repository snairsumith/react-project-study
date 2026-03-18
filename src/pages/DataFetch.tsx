import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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


const DataFetch = () => {
    const [dogs, setDogs] = useState<DogResponse[]>([]);
    const [loading, setLoading] = useState(true);
    const [loadDogs, setLoadDogs] = useState(false);
    const [search, setSearch] = useState('');
    const navigate = useNavigate();
    useEffect(() => {
        const fetchDogs = async () => {
            const response = await axios.get("https://dogapi.dog/api/v2/breeds");
            setDogs(response.data.data);
            setLoading(false);
        }
        fetchDogs();
    }, []);
   

    return (
        <div>
            <h1>Data Fetch</h1>
            {loading && <h2>Loading...</h2>}
            <input type="text" placeholder="Search by name" onChange={(e) => setSearch(e.target.value)} />
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                
            {dogs.map((dog) => (
                <div key={dog.id} style={{ border: '1px solid black', padding: '10px', margin: '10px',width: '250px',cursor:'pointer' }} onClick={() => navigate(`/dog-detail/${dog.id}?type=${dog.type}&size=12&life=2`)}>
                    <h2>{dog.attributes.name}</h2>
                    <p>{dog.type}</p>
                   
                </div>
            ))}
            </div>
        </div>
    )
}

export default DataFetch;