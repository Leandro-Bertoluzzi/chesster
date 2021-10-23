import React, { Component } from 'react'; 
import Piece from '../widgets/Piece';

// Initial pieces
var initialPiecesInfo = [
    {x:1,y:1,color:"white",name:"rook"},
    {x:2,y:1,color:"white",name:"knight"},
    {x:3,y:1,color:"white",name:"bishop"},
    {x:4,y:1,color:"white",name:"king"},
    {x:5,y:1,color:"white",name:"queen"},
    {x:6,y:1,color:"white",name:"bishop"},
    {x:7,y:1,color:"white",name:"knight"},
    {x:8,y:1,color:"white",name:"rook"},
    {x:1,y:2,color:"white",name:"pawn"},
    {x:2,y:2,color:"white",name:"pawn"},
    {x:3,y:2,color:"white",name:"pawn"},
    {x:4,y:2,color:"white",name:"pawn"},
    {x:5,y:2,color:"white",name:"pawn"},
    {x:6,y:2,color:"white",name:"pawn"},
    {x:7,y:2,color:"white",name:"pawn"},
    {x:8,y:2,color:"white",name:"pawn"},
    {x:1,y:8,color:"black",name:"rook"},
    {x:2,y:8,color:"black",name:"knight"},
    {x:3,y:8,color:"black",name:"bishop"},
    {x:4,y:8,color:"black",name:"king"},
    {x:5,y:8,color:"black",name:"queen"},
    {x:6,y:8,color:"black",name:"bishop"},
    {x:7,y:8,color:"black",name:"knight"},
    {x:8,y:8,color:"black",name:"rook"},
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
var invalidPiece = {x: 99, y: 99, color: "", name: "", firstMove:true};
var invalidCell = {x: 99, y: 99};

class Board extends Component {
    constructor(props) {
        super(props);
        this.state = {
            piecesInfo: initialPiecesInfo,
            validMoves: [],
            selectedPiece: invalidPiece,
            isSelectedPiece: false,
            selectedCell: invalidCell,
            boardTable: [],
            whiteGraveyard: [],
            blackGraveyard: []
        };
        
        // This is needed to make `this` work in the callback
        this.setSelectedPiece = this.setSelectedPiece.bind(this);
        this.setSelectedCell = this.setSelectedCell.bind(this);
        this.setValidMoves = this.setValidMoves.bind(this);
    }

    componentDidMount() {
        // We set the first move to 'true' for all pieces
        var piecesInfo = this.state.piecesInfo;
        piecesInfo.forEach((element) => element.firstMove = true);
        this.setState({ piecesInfo });

        // We initialize the board data table
        var boardTable = this.state.boardTable;
        for (var i = 0; i < this.props.size; i++) {
            var cells = [];
            for(var j = 0; j < this.props.size; j++) {
                cells.push({ x: j+1, y: i+1, color: "", name: "", firstMove:true });
            }
            boardTable.push(cells);
        }
        for (i = 0; i < piecesInfo.length; i++) {
            var x = piecesInfo[i].x - 1;
            var y = piecesInfo[i].y - 1;
            boardTable[y][x] = piecesInfo[i];
        }
        this.setState({ boardTable });
    }
    
    setSelectedPiece(x, y, color, name, firstMove) {
        // If the same piece is clicked twice in a row, it is unselected
        if (JSON.stringify(this.state.selectedPiece) === JSON.stringify({x, y, color, name, firstMove})) {
            this.setState({ selectedPiece: invalidPiece });
            this.setState({isSelectedPiece: false});
        } else {
            // If there is a piece selected, we must clear validMoves so they are updated
            if(this.state.isSelectedPiece) {
                this.setState(prevState => {
                    if(prevState.validMoves.length){
                        return { validMoves: [] };
                    }
                });
            }
            // We assign the new selected piece
            this.setState({ selectedPiece: {x, y, color, name, firstMove} });
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
                piecesInfo[index].firstMove = false;
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

        var {x, y, color, name, firstMove} = this.state.selectedPiece;
        var validMoves = [];
        var i, j, k;

        // We look for the valid moves for the selected piece
        if(name === "pawn"){
            let _x = x;
            let _y = color === "white" ? y+1 : y-1;
            if (this.state.piecesInfo.findIndex(piece => piece.x === _x && piece.y === _y) === -1) {
                validMoves.push({x: _x, y: _y});
                if(firstMove) {
                    _y = color === "white" ? y+2 : y-2;
                    if (this.state.piecesInfo.findIndex(piece => piece.x === _x && piece.y === _y) === -1) {
                        validMoves.push({x: _x, y: _y});
                    }
                }
            }
        } else if(name === "knight"){
            validMoves.push({x: x+1, y: y+2});
            validMoves.push({x: x-1, y: y+2});
            validMoves.push({x: x+1, y: y-2});
            validMoves.push({x: x-1, y: y-2});
            validMoves.push({x: x+2, y: y+1});
            validMoves.push({x: x-2, y: y+1});
            validMoves.push({x: x+2, y: y-1});
            validMoves.push({x: x-2, y: y-1});
        } else if(name === "king"){
            for(i = -1; i <= 1; i++) {
                for(j = -1; j <= 1; j++) {
                    if (!i && !j) { break; }
                    let _x = x+i*1;
                    let _y = y+j*1;
                    validMoves.push({x: _x, y: _y});
                    if (this.state.piecesInfo.findIndex(piece => piece.x === _x && piece.y === _y) !== -1) {
                        break;
                    }
                }
            }
        } else if(name === "rook"){
            for(i = -1; i <= 1; i++) {
                for(j = -1; j <= 1; j++) {
                    for(k = 1; k < this.props.size; k++) {
                        if ((!i && !j) || (i && j)) { break; }
                        let _x = x+i*k;
                        let _y = y+j*k;
                        validMoves.push({x: _x, y: _y});
                        if (this.state.piecesInfo.findIndex(piece => piece.x === _x && piece.y === _y) !== -1) {
                            break;
                        }
                    }
                }
            }
        } else if(name === "bishop"){
            for(i = -1; i <= 1; i++) {
                for(j = -1; j <= 1; j++) {
                    for(k = 1; k < this.props.size; k++) {
                        if (!i || !j) { break; }
                        let _x = x+i*k;
                        let _y = y+j*k;
                        validMoves.push({x: _x, y: _y});
                        if (this.state.piecesInfo.findIndex(piece => piece.x === _x && piece.y === _y) !== -1) {
                            break;
                        }
                    }
                }
            }
        } else if(name === "queen"){
            for(i = -1; i <= 1; i++) {
                for(j = -1; j <= 1; j++) {
                    for(k = 1; k < this.props.size; k++) {
                        if (!i && !j) { break; }
                        let _x = x+i*k;
                        let _y = y+j*k;
                        validMoves.push({x: _x, y: _y});
                        if (this.state.piecesInfo.findIndex(piece => piece.x === _x && piece.y === _y) !== -1) {
                            break;
                        }
                    }
                }
            }
        }

        // We filter the moves outside the board
        validMoves = validMoves.filter(cell => cell.x > 0 && cell.x <= this.props.size && cell.y > 0 && cell.y <= this.props.size);
        // We filter the moves over ally pieces
        this.state.piecesInfo.forEach(function(piece) {
            let index = validMoves.findIndex(cell => piece.x === cell.x && piece.y === cell.y && piece.color === color);
            if (index !== -1) {
                validMoves.splice(index, 1);
            }
        });

        // We update validMoves
        this.setState(prevState => {
            if(prevState.validMoves.length === 0 && validMoves.length){
                return { validMoves };
            }
        });
    }
    
    render() {
        // We update the cells
        var rows = [];
        for (var i = 0; i < this.props.size; i++) {
            var cells = [];
            for(var j = 0; j < this.props.size; j++) {
                cells.push(<BoardCell setSelected={this.setSelectedCell} x={j+1} y={i+1} validMoves={this.state.validMoves} selectedPiece={this.state.selectedPiece} key={i*this.props.size+j} />);
            }
            rows.push(<div className="BoardRow" key={i}>{cells}</div>);
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