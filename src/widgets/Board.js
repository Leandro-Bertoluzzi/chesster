import React, { Component } from 'react'; 
import Piece from '../widgets/Piece';

// Initial pieces
var initialPiecesInfo = [
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

// Useful global variables
var invalidPiece = {x: 99, y: 99, color: "white"};
var invalidCell = {x: 99, y: 99};

class Board extends Component {
    constructor(props) {
        super(props);
        this.state = {
            piecesInfo: initialPiecesInfo,
            selectedPiece: invalidPiece,
            isSelectedPiece: false,
            selectedCell: invalidCell
        };
        
        // This is needed to make `this` work in the callback
        this.setSelectedPiece = this.setSelectedPiece.bind(this);
        this.setSelectedCell = this.setSelectedCell.bind(this);
    }

    setSelectedPiece(x, y, color) {
        // First of all, we mark the cell with the piece as selected
        // this.setSelectedCell(x, y);

        // If the same piece is clicked twice in a row, it is unselected
        if (JSON.stringify(this.state.selectedPiece) === JSON.stringify({x, y, color})) {
            this.setState({ selectedPiece: invalidPiece });
            this.setState({isSelectedPiece: false});
        } else {
            this.setState({ selectedPiece: {x, y, color} });
            this.setState({isSelectedPiece: true});
        }
    }

    setSelectedCell(x, y) {
        this.setState({ selectedCell: {x, y} });

        if(this.state.isSelectedPiece) {
            var xP = this.state.selectedPiece.x;
            var yP = this.state.selectedPiece.y;
            var index = this.state.piecesInfo.findIndex((element) => element.x === xP && element.y === yP);

            if(index !== -1) {
                var piecesInfo = this.state.piecesInfo;
                piecesInfo[index].x = x;
                piecesInfo[index].y = y;
                this.setState({ piecesInfo });
                this.setState({ selectedPiece: invalidPiece });
                this.setState({isSelectedPiece: false});
            }
        }
    }
    
    render() {
        // We initialize rows
        var rows = [];
        for (var i = 0; i < this.props.size; i++) {
            rows.push(<BoardRow setSelected={this.setSelectedCell} y={i+1} size={this.props.size} selectedPieceX={this.state.selectedPiece.x} isSelectedPieceRow={this.state.selectedPiece.y === i+1} key={i} />);
        }
        // We initialize pieces
        var pieces = [];
        var piecesInfo = this.state.piecesInfo;
        for (i = 0; i < piecesInfo.length; i++) {
            pieces.push(<Piece key={i} setSelected={this.setSelectedPiece} x={piecesInfo[i].x} y={piecesInfo[i].y} color={piecesInfo[i].color} name={piecesInfo[i].name} />);
        }
        return (
            <div className="Board">
                {rows}
                {pieces}
            </div>
        );
    }
}

// Board row

function BoardRow(props) {
    var cells = [];
    for (var i = 0; i < props.size; i++) {
        cells.push(<BoardCell setSelected={props.setSelected} x={i+1} y={props.y} validMove={false} selectedPieceX={props.selectedPieceX} isSelectedPieceRow={props.isSelectedPieceRow} key={i} />);
    }
    return (
        <div className="BoardRow">{cells}</div>
    );
}

// Board cell

function BoardCell(props) {
    function setSelected() {
        var {x, y} = props;
        props.setSelected(x, y);
    }

    var isSelectedPiece = props.isSelectedPieceRow && props.selectedPieceX === props.x;
    return (
        <div onClick={setSelected} className={"BoardCell" + (props.validMove ? " validMove" : "") + (isSelectedPiece ? " selectedPiece" : "")}></div>
    );
}

export default Board;