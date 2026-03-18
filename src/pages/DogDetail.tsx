import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";

export interface Dog {
    id: string;
    type: string;
    attributes: {
        name: string;
        description: string;
        life: {
            max: number;
            min: number;
        };
    };
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

const DogDetail = () => {
    const { dogId } = useParams();
    const [searchParams] = useSearchParams();
    const type = searchParams.get('type');
    const size = searchParams.get('size');
    const life = searchParams.get('life');
    const [dog, setDog] = useState<Dog | null>(null);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchDog = async () => {
            try {
                const response = await axios.get(`https://dogapi.dog/api/v2/breeds/${dogId}`);
                setDog(response.data.data);
            }
            catch (error) {

            }
            finally {
                setLoading(false)
            }
        }
        fetchDog();
    }, [dogId]);
    return <div>
        <h1>Dog Detail</h1>
        {loading ? <p>Loading....</p> :
            <>

            <h1>Selected Type {type}</h1>
            <h1>Selected Size {size}</h1>
            <h1>Selected Life {life}</h1>
                <p>{dog?.attributes.name}</p>
                <p>{dog?.type}</p>
                <p>{dog?.attributes.description}</p>
                <p>{dog?.attributes.life.max}</p>
                <p>{dog?.attributes.life.min}</p>
                <p>{dog?.relationships.group.data.id}</p>
                <p>{dog?.country}</p>
            </>
        }
    </div>;
};

export default DogDetail;