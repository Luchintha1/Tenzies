export default function Die(props){
    return(
        <button 
        style={{backgroundColor: props.isHeld ? "#59E391" : "white"}} 
        onClick={() => props.clicked(props.id)}
        aria-pressed={props.isHeld}
        aria-label={`Die with value ${props.value}, 
            ${props.isHeld ? "held" : "not held"}`}>
            {props.value}
        </button>
    );
}