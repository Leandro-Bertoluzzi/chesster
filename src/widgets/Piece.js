function Piece(props) {
    return (
        <div className={"Piece " + props.color + "-" + props.name + " x-" + props.x + " y-" + props.y}></div>
    );
}

export default Piece;