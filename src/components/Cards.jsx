import "../styles/card.css";

export default function Card({
    id,
    name,
    image,
    itemClick
}){
    return (
        <div key={id} onClick={() => itemClick(id)} className="card">
            
            <img 
                src={image}
                alt={name}
                key={id}                
            />
            <label className="lbl-name">{name}</label>            
        </div>
    );
}