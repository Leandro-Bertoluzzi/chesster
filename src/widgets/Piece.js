function Piece(props) {
    function setSelected() {
        var {x, y, color, name} = props.data;
        props.setSelected(x, y, color, name);
    }

    var { x, y, color, name } = props.data;
    return (
        <div onClick={setSelected} className={"Piece " + color + "-" + name + " x-" + x + " y-" + y}></div>
    );
  }

export default Piece;