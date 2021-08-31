import React, { Component } from 'react'
import Board from './Board';

export default class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            xIsNext : true,
            stepNumber : 0, 
            history: [
                {squares: Array(9).fill(null)}
            ]
        }
        //this.handleClick = this.handleClick.bind(this);
        //this.jumpTo = this.jumpTo.bind(this);
    }

    jumpTo(step){
        this.setState({
            stepNumber: step,
            xIsNext: (step%2)===0
        });
    }

    handleClick(i){
        console.log(i);
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];       // get last item 
        const squares = current.squares.slice();        // create a copy of squares, assgin it to variable name squares( on the left of the equla sign)
        const winner = calculateWinner(squares);

        // if winner exist then there will no change. direct return
        // also if squares[i] exist that means player has fille the square then 
        // that will also not create any changes so that block will not get change. 
        if(winner || squares[i]){
            console.log(winner);
            return;
        }

        squares[i] = this.state.xIsNext ? 'X' : 'O' ;

        this.setState({
            history: history.concat({
                squares: squares
            }),
            xIsNext: !this.state.xIsNext,
            stepNumber: history.length
        }) 
/* 
        this.setState((state)=>({
            history: state.history.concate({
                squares: squares
            }) ,
            xIsNext: !state.xIsNext,
            stepNumber: state.history.length 
        }))
         */
    }
    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber]
        const winner = calculateWinner[current.squares];
        const moves = history.map((step, move)=> {
            const desc = move ? 'Go to #' + move : 'start the game';
            return (
                <li key={move}>
                    <button onClick={()=> this.jumpTo(move)}>
                        {desc}
                    </button>
                </li>
            )
        });

        let status;
        if(winner){
            status ="Winner is " + winner ;  
        }else {
            
            status = `Next player is ${(this.state.xIsNext ? 'X' : 'O')}`;
        }

        return (
            <div className='game'>
                <div className='game-board'>
                    <Board 
                        onClick={(i)=>this.handleClick(i)} 
                        squares={current.squares}
                    />                    
                </div>
                <div className='game-info'>
                    <div>{status}</div>
                    <div>{winner}</div>
                    <ul>{moves}</ul>                
                </div>
                
            </div>
        )
    }
}

function calculateWinner(squares) {
    const lines = [                //x or o fill these will win 
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let i=0; i < lines.length ; i++){
        const[a, b, c] = lines[i];
        if ( squares[a] && squares[a] === squares[b] && squares[b] === squares[c]) {
            return squares[a];          // if return value is 'x' then 'x' is winner. and same for 'o'.
        }
    } 
    // if return null then no winner . 
    return null;
}
