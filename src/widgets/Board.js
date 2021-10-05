function Board(props) {
    var rows = [];
    for (var i = 0; i < props.size; i++) {
        rows.push(<BoardRow size={props.size} key={i} />);
    }
    return (
        <div className="Board">{rows}</div>
    );
}

// Board row

function BoardRow(props) {
    var cells = [];
    for (var i = 0; i < props.size; i++) {
        cells.push(<BoardCell key={i} />);
    }
    return (
        <div className="BoardRow">{cells}</div>
    );
}

// Board cell

function BoardCell() {
    return (
        <div className="BoardCell"></div>
    );
}

export default Board;