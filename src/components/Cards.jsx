import "../styles/card.css";

export default function Card({
    id,
    name,
    url,
    image,
    itemClick
}){
    return (
        <div key={id} onClick={() => itemClick(id)} className="card">
            
            <img 
                // src="https://media1.giphy.com/media/gH2bKIakvLuW4/giphy.gif?cid=fb293c2dhj2rnzkmzxpihtte0y2gvsuq5cweur3z6k9nn36b&ep=v1_gifs_translate&rid=giphy.gif&ct=g"
                src={image}
                // src=`data:image/png;base64,${url}`
                alt={name}
                key={id}                
            />
            <label className="lbl-name">{name}</label>            
        </div>
    );
}