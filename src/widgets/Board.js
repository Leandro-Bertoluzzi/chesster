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
var invalidPiece = {x: 99, y: 99, color: "", name: ""};
var invalidCell = {x: 99, y: 99};

class Board extends Component {
    constructor(props) {
        super(props);
        this.state = {
            piecesInfo: initialPiecesInfo,
            validMoves: [],
            selectedPiece: invalidPiece,
            isSelectedPiece: false,
            selectedCell: invalidCell
        };
        
        // This is needed to make `this` work in the callback
        this.setSelectedPiece = this.setSelectedPiece.bind(this);
        this.setSelectedCell = this.setSelectedCell.bind(this);
        this.setValidMoves = this.setValidMoves.bind(this);
    }
    
    setSelectedPiece(x, y, color, name) {
        // If the same piece is clicked twice in a row, it is unselected
        if (JSON.stringify(this.state.selectedPiece) === JSON.stringify({x, y, color, name})) {
            this.setState({ selectedPiece: invalidPiece });
            this.setState({isSelectedPiece: false});
        } else {
            this.setState({ selectedPiece: {x, y, color, name} });
            this.setState({isSelectedPiece: true});
        }
        
        // We mark the cell with the piece as the selected one
        this.setSelectedCell(x, y);
    }

    setSelectedCell(x, y) {
        this.setState({ selectedCell: {x, y} });

        var index = this.state.validMoves.findIndex((element) => element.x === x && element.y === y);
        var isValidMove = index !== -1;

        // If there is a piece selected and the selected cell is valid, we move it to the selected cell
        if(this.state.isSelectedPiece && isValidMove) {
            var xP = this.state.selectedPiece.x;
            var yP = this.state.selectedPiece.y;
            index = this.state.piecesInfo.findIndex((element) => element.x === xP && element.y === yP);

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

    componentDidUpdate() {
        this.setValidMoves();
    }

    setValidMoves() {
        // If there is a piece selected and validMoves is already set, we have nothing to do
        if(this.state.isSelectedPiece && this.state.validMoves.length) return;

        // If there is no piece selected, we only must clear validMoves if needed
        if(!this.state.isSelectedPiece) {
            this.setState(prevState => {
                if(prevState.validMoves.length){
                    return { validMoves: [] };
                }
            });
            return;
        }

        var {x, y, color, name} = this.state.selectedPiece;
        var validMoves = [];
        var i = 0;

        // We look for the valid moves for the selected piece
        if(name === "pawn"){
            validMoves.push({x: x, y: color === "white" ? y+1 : y-1});
            validMoves.push({x: x, y: color === "white" ? y+2 : y-2});
        } else if(name === "horse"){
            validMoves.push({x: x+1, y: y+2});
            validMoves.push({x: x-1, y: y+2});
            validMoves.push({x: x+1, y: y-2});
            validMoves.push({x: x-1, y: y-2});
            validMoves.push({x: x+2, y: y+1});
            validMoves.push({x: x-2, y: y+1});
            validMoves.push({x: x+2, y: y-1});
            validMoves.push({x: x-2, y: y-1});
        } else if(name === "king"){
            validMoves.push({x: x, y: y-1});
            validMoves.push({x: x, y: y+1});
            validMoves.push({x: x+1, y: y-1});
            validMoves.push({x: x+1, y: y});
            validMoves.push({x: x+1, y: y+1});
            validMoves.push({x: x-1, y: y-1});
            validMoves.push({x: x-1, y: y});
            validMoves.push({x: x-1, y: y+1});
        } else if(name === "tower"){
            for(i = 0; i < this.props.size; i++) {
                validMoves.push({x: x, y: i+1});
                validMoves.push({x: i+1, y: y});
            }
        } else if(name === "bishop"){
            for(i = 0; i < this.props.size; i++) {
                validMoves.push({x: x+i, y: y+i});
                validMoves.push({x: x+i, y: y-i});
                validMoves.push({x: x-i, y: y+i});
                validMoves.push({x: x-i, y: y-i});
            }
        } else if(name === "queen"){
            for(i = 0; i < this.props.size; i++) {
                validMoves.push({x: x, y: i+1});
                validMoves.push({x: i+1, y: y});
                validMoves.push({x: x+i, y: y+i});
                validMoves.push({x: x+i, y: y-i});
                validMoves.push({x: x-i, y: y+i});
                validMoves.push({x: x-i, y: y-i});
            }
        }

        // We filter the moves outside the board
        validMoves = validMoves.filter(cell => cell.x > 0 && cell.x <= this.props.size && cell.y > 0 && cell.y <= this.props.size);

        // We update validMoves
        this.setState(prevState => {
            if(prevState.validMoves.length === 0 && validMoves.length){
                return { validMoves };
            }
        });
    }
    
    render() {
        // We update the rows
        var rows = [];
        for (var i = 0; i < this.props.size; i++) {
            rows.push(<BoardRow setSelected={this.setSelectedCell} y={i+1} size={this.props.size} validMoves={this.state.validMoves} selectedPiece={this.state.selectedPiece} key={i} />);
        }
        // We update the pieces
        var pieces = [];
        var piecesInfo = this.state.piecesInfo;
        for (i = 0; i < piecesInfo.length; i++) {
            pieces.push(<Piece key={i} setSelected={this.setSelectedPiece} data={piecesInfo[i]} />);
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
        cells.push(<BoardCell setSelected={props.setSelected} x={i+1} y={props.y} validMoves={props.validMoves} selectedPiece={props.selectedPiece} key={i} />);
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

    var {x, y} = props;
    var isSelectedPiece = (props.selectedPiece.y === y) && (props.selectedPiece.x === x);
    
    var index = props.validMoves.findIndex((element) => element.x === x && element.y === y);
    var isValidMove = index !== -1;
    return (
        <div onClick={setSelected} className={"BoardCell" + (isValidMove ? " validMove" : "") + (isSelectedPiece ? " selectedPiece" : "")}></div>
    );
}

export default Board;