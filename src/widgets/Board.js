import Piece from '../widgets/Piece';

// Initial pieces
var initialPieces = [
    {x:1,y:1,color:"white",name:"tower"},
    {x:2,y:1,color:"white",name:"horse"},
    {x:3,y:1,color:"white",name:"bishop"},
    {x:4,y:1,color:"white",name:"king"},
    {x:5,y:1,color:"white",name:"queen"},
    {x:6,y:1,color:"white",name:"bishop"},
    {x:7,y:1,color:"white",name:"horse"},
    {x:8,y:1,color:"white",name:"tower"},
    {x:1,y:2,color:"white",name:"pawn"},
    {x:2,y:2,color:"white",name:"pawn"},
    {x:3,y:2,color:"white",name:"pawn"},
    {x:4,y:2,color:"white",name:"pawn"},
    {x:5,y:2,color:"white",name:"pawn"},
    {x:6,y:2,color:"white",name:"pawn"},
    {x:7,y:2,color:"white",name:"pawn"},
    {x:8,y:2,color:"white",name:"pawn"},
    {x:1,y:8,color:"black",name:"tower"},
    {x:2,y:8,color:"black",name:"horse"},
    {x:3,y:8,color:"black",name:"bishop"},
    {x:4,y:8,color:"black",name:"king"},
    {x:5,y:8,color:"black",name:"queen"},
    {x:6,y:8,color:"black",name:"bishop"},
    {x:7,y:8,color:"black",name:"horse"},
    {x:8,y:8,color:"black",name:"tower"},
    {x:1,y:7,color:"black",name:"pawn"},
    {x:2,y:7,color:"black",name:"pawn"},
    {x:3,y:7,color:"black",name:"pawn"},
    {x:4,y:7,color:"black",name:"pawn"},
    {x:5,y:7,color:"black",name:"pawn"},
    {x:6,y:7,color:"black",name:"pawn"},
    {x:7,y:7,color:"black",name:"pawn"},
    {x:8,y:7,color:"black",name:"pawn"}
];

function Board(props) {
    var rows = [];
    var pieces = [];
    for (var i = 0; i < props.size; i++) {
        rows.push(<BoardRow size={props.size} key={i} />);
    }
    for (i = 0; i < initialPieces.length; i++) {
        pieces.push(<Piece key={i} x={initialPieces[i].x} y={initialPieces[i].y} color={initialPieces[i].color} name={initialPieces[i].name} />);
    }
    return (
        <div className="Board">
            {rows}
            {pieces}
        </div>
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