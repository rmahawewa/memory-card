import { useEffect, useState } from "react";
import Card from "./Cards";
import "../styles/style.css";


export default function MemCard1(){

    const [data, setData] = useState(null);
    const [data1, setData1] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedItemId, setSelectedItemId] = useState('');
    const [score, setScore] = useState(0);
    const [highestScore, setHighestScore] = useState(0);
    const [selections, setSelections] = useState([]);

    let url = "https://pokeapi.co/api/v2/pokemon?limit=12";

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try{
                const response = await fetch(url);
                if (!response.ok){
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const json = await response.json();
                setData(json.results);
                storeDataInArray(json.results);
                // displayCardsInRandomOrder();
            }catch (err){
                setError(err);
            }finally{
                setLoading(false);
            }
        };
        fetchData();
    }, [url]);


    useEffect(() => {
        const shuffleItems = () => {
            try{
                const shuffledItems = [...data1].sort(() => Math.random() - 0.5);
                console.log(shuffledItems);
                setData1(shuffledItems);
            }catch (err){
                setError(err);
            }            
        };
        shuffleItems();
    }, [selectedItemId]);


    function storeDataInArray(data){
        let nextId = 0;
        const newData = data.map((d) => ({
            id: nextId++,
            name: d.name,
            url: d.url,
        }));
        setData1((prevData1) => [...prevData1, ...newData]);
    }    
    
    function handleItemClickChange(id){
        setSelectedItemId(id);
        setSelections([
            ...selections,
            id
        ]);
        // setSelections((prevSelections) => [...prevSelections, id]);
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

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
    if (!data) return null;

    return (
        <div className="container">
            
            {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
            <div className="row-one">
                {/* <div> */}
                    <div className="info">
                        <h1>Memory Game</h1>
                        <h4>Get points by clicking on an image but don't click on any more than once!</h4>
                    </div>
                    <div className="info score">
                        <label>Score: <span>{score}</span></label>  
                        <label>Highest score: <span>{highestScore}</span></label>  
                    </div>                  
                {/* </div> */}
            </div>
            <div className="card-container">
                {data1.map((d) => (
                    <Card 
                        key = {d.id}
                        id = {d.id}
                        name = {d.name}
                        url = {d.url}
                        image = {d.url}
                        itemClick={handleItemClickChange}
                    />
                ))}
                
            </div>
        </div>
    );

}