import { useEffect, useState } from "react";
import Card from "./Cards";
import "../styles/style.css";

export default function MemCard(){
    const [data, setData] = useState([]);
    const [info, setInfo] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedItemId, setSelectedItemId] = useState('');
    const [score, setScore] = useState(0);
    const [highestScore, setHighestScore] = useState(0);
    const [selections, setSelections] = useState([]);
    let url = "https://pokeapi.co/api/v2/pokemon?limit=12";

    useEffect(() => {
        fetchData();
    }, [url]);

    useEffect(() => {
        const shuffleItems = () => {
            try{
                const shuffledItems = [...data].sort(() => Math.random() - 0.5);
                console.log(shuffledItems);
                setData(shuffledItems);
            }catch (err){
                setError(err);
            }            
        };
        shuffleItems();
    }, [selectedItemId]);

    const fetchData = async () => {
        try{
            const response = await fetch(url);
            setLoading(true);
            setError(null);
            if(!response.ok){
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const json = await response.json();
            //setData(json);

            function createObject(result){
                result.forEach(async (obj) => { // iterate through pokemon's result array
                    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${obj.name}`); //fetch each pokemon's info by pokemon's name
                    const info = await res.json();
                    setData((prev) => [...prev, info]);
                });
            }

            createObject(json.results);
            // storeDataInArray(data);
        }catch (err){
            setError(err);
        }finally{
            setLoading(false);
        }
    }

    function handleItemClickChange(id){
        setSelectedItemId(id);
        // setSelections([
        //     ...selections,
        //     id
        // ]);
        setSelections((prevSelections) => [...prevSelections, id]);
        console.log(selections);

        const itemId = selections.find(
            a => a === id
        );
        console.log(itemId);
        if(itemId) {
            setSelections([]);
            if(highestScore < score){
                setHighestScore(score);
            }
            setScore(0);
        }else{
            setScore(score + 1);
        }
        
    }


    // return (
    //     <div>
    //         <pre>{JSON.stringify(data, null, 2)}</pre>
    //     </div>
    // );

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
    if (!data) return null;
    
        return (
            <div className="container">
                
                <div className="row-one">
                        <div className="info">
                            <h1>Memory Game</h1>
                            <h4>Get points by clicking on a pokemon but don't click on any more than once!</h4>
                        </div>
                        <div className="info score">
                            <label>Score: <span>{score}</span></label>  
                            <label>Highest score: <span>{highestScore}</span></label>  
                        </div>
                </div>
                <div className="card-container">
                    {data.map((d) => (
                        <Card 
                            key = {d.id}
                            id = {d.id}
                            name = {d.name}
                            image = {d.sprites.other.dream_world.front_default}
                            itemClick={handleItemClickChange}
                        />
                    ))}
                    
                </div>
            </div>
        );
    
    
}