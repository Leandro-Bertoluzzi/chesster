import React, { Component } from 'react'; 

var movesArray = [
    "abc", "bcd",
    "cde", "def",
    "efg"
];

class MovesList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            moves: movesArray,
            activeMove: 0
        };
        // This is needed to make `this` work in the callback
        this.setActiveMove = this.setActiveMove.bind(this);
    }

    setActiveMove(index) {
        this.setState( {activeMove: index} );
    }
    
    render(){
        var moves = [];
        var total = this.state.moves.length;
        for (var i = 0; i < total; i++) {
            if(i%2 === 0){
                moves.push(<div className="index" key={i+total}>{Math.floor(i/2) + 1}</div>);
            }
            moves.push(<Move index={i} content={this.state.moves[i]} setActive={this.setActiveMove} isActive={this.state.activeMove === i} key={i} />);
        }
        return (
            <div className="MovesList">
                <h3 className="title">List of movements</h3>
                <div className="moves">
                    {moves}
                </div>
            </div>
        );
    }
}

// Individual move

function Move(props) {
    function setActive() {
        props.setActive(props.index);
    }
    return (
        <div onClick={setActive} className={"move" + (props.isActive ? " active" : "")}>
            {props.content}
        </div>
    );
}

export default MovesList;