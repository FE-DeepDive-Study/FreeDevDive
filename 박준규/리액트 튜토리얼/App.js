import { useState } from 'react';

function Square({ value, emphasized, onSquareClick }) {
    return (<button
      className={`square ${emphasized ? 'emphasized' : ''}`}
      onClick={onSquareClick}
    >
      {value}
    </button>);
}

function Board({ xIsNext, squares, onPlay }) {

  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
  
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return [a, b, c];
      }
    }
    return null;
  }

  function handleClick(i) {
    if (squares[i]) {
      return;
    }
    if (calculateWinner(squares)) {
      return;
    }
    const nextSquares = squares.slice(); // 복사해서 새로 세팅
    if (xIsNext)
      nextSquares[i] = "X";
    else
      nextSquares[i] = "O";
    onPlay(nextSquares);
  }

  const winnerIdx = calculateWinner(squares);
  let status;
  if (winnerIdx) {
    status = 'Winner: ' + squares[winnerIdx[0]];
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  function getBoard(y, x) {
    const res = [];

    Array.from({ length: y}).map((_, i) => (
      res.push(
      <div className='board-row'>
        {Array.from({ length: x }).map((_, j) => {
          let idx = i * x + j;
          
          return (
            <Square value={squares[idx]} emphasized={null !== winnerIdx && winnerIdx.includes(idx) ? true : false} onSquareClick={() => handleClick(idx)} />
          );
          
        })}
      </div>)
    ));
    return res;
  }

  return (
    <>
      <div className="status">{status}</div>
      {getBoard(3, 3)}
    </>
  );
}

export default function Game() {

  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];
  const [isAsc, setIsAsc] = useState(true);

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares]
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function handleOrder() {
    setIsAsc(!isAsc);
  }

  function JumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    // squares = 원소, moec = 원소 번호
    let description;
    if (move === currentMove) {
      description = "You are in #" + move;
    } else if (move > 0) {
      description = "Go to move #" + move;
    } else {
      description = "Go to game start";
    }
    return (
      <li key={move}>
        <button onClick={() => JumpTo(move)}>{description}</button>
      </li>
    );
  })
  if (!isAsc)
    moves.reverse();

  return (
    <div className='game'>
      <div className='game-board'>
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay}/>
      </div>
      <button className='game-info' onClick={handleOrder}>Ascending order: {isAsc ? "true" : "false"}</button>
      <div className='game-info'>
        <ol>{moves}</ol>
      </div>
    </div>
  )
}