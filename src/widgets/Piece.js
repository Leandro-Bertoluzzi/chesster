function Piece(props) {
    function setSelected() {
        var {x, y, color} = props;
        props.setSelected(x, y, color);
    }
    return (
        <div onClick={setSelected} className={"Piece " + props.color + "-" + props.name + " x-" + props.x + " y-" + props.y}></div>
    );
  }

export default Piece;