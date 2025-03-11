import { useEffect, useState } from "react";
import Card from "./Cards";
import "../styles/style.css";

export default function MemCard(){
    const [data, setData] = useState([]);
    let url = "https://pokeapi.co/api/v2/pokemon?limit=1";

    const fetchData = async () => {
        try{
            const response = await fetch(url);
            if(!response.ok){
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const json = await response.json();
            //setData(json);

            function createObject(result){
                result.forEach(async (obj) => {
                    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${obj.name}`);
                    const info = await res.json();
                    setData((prev) => [...prev, info]);
                });
            }
            createObject(json.results);
        }catch (err){

        }finally{

        }
    }

    useEffect(() => {
        fetchData();
    }, [url]);


    return (
        <div>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    );
}