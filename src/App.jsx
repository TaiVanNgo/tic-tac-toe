import { useState } from "react";

const Game = () => {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  //the xIsNext will be true if the nextMOve is even, and false if the next move is odd
  const currentSquares = history[currentMove];

  const handlePlay = (nextSquares) => {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    //This setHIstory will create the new array that contains all the items in "history"
    //followed by the nextSquares.
    //For example, if history is [[null,null,null], ["X",null,null]]
    //and nextSquares is ["X",null,"O"], then the
    //new [...history, nextSquares] array will be
    //[[null,null,null], ["X",null,null], ["X",null,"O"]].
  };

  const jumpTo = (nextMove) => {
    setCurrentMove(nextMove);
  };

  const moves = history.map((squares, move) => {
    let description;

    if (move > 0) {
      description = "Go to move #" + move;
    } else {
      description = "Go to game start";
    }

    return (
      <li key={move} className="list">
        <button
          className="step-button"
          onClick={() => {
            jumpTo(move);
          }}
        >
          {description}
        </button>
      </li>
    );
  });

  return (
    <div className="big-div">
      <h3>You are at move {currentMove} </h3>
      <div className="game">
        <div className="game-board">
          <Board
            xIsNext={xIsNext}
            squares={currentSquares}
            onPlay={handlePlay}
          />
        </div>
        <div className="game-info">
          <ol>{moves}</ol>
        </div>
      </div>
    </div>
  );
};
export default Game;

const Square = ({ value, onSquareClick, isWinningSquare }) => {
  let className = "";
  if (isWinningSquare) {
    className = "winning-square"
  }
  return (
    <button onClick={onSquareClick} className={`square ${className}` } >
      {value}
    </button>
  );
};

function Board({ xIsNext, squares, onPlay }) {
  const winningSquare = calculateWinner(squares);

  let status;
  if (winningSquare) {
    status = "Winner: " + squares[winningSquare[0]];
  } else {
    status = "Next Player: " + (xIsNext ? "X" : "O");
  }

  const handleClick = (i) => {
    if (squares[i] || calculateWinner(squares)) {
      //If the square at the index i already has data
      //we return it to prevent overwrite the existing data
      return;
      //or if the users already win (calculateWinner function), we return do not perform the tasks below
    }

    const nextSquares = squares.slice(); //Create the copy of the squares
    if (xIsNext) {
      //if X is the next move, we set the data to X
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }

    onPlay(nextSquares);
  };



  return (
    <>
      <div className="status">{status}</div>
      {/* show the status of the game */}
      <div className="board-row">
        <Square
          value={squares[0]}
          onSquareClick={() => {
            handleClick(0);
          }}
          isWinningSquare={winningSquare && winningSquare.includes(0)}
        />
        <Square
          value={squares[1]}
          onSquareClick={() => {
            handleClick(1);
          }}
          isWinningSquare={winningSquare && winningSquare.includes(1)}
        />
        <Square
          value={squares[2]}
          onSquareClick={() => {
            handleClick(2);
          }}
          isWinningSquare={winningSquare && winningSquare.includes(2)}
        />
      </div>
      <div className="board-row">
        <Square
          value={squares[3]}
          onSquareClick={() => {
            handleClick(3);
          }}
          isWinningSquare={winningSquare && winningSquare.includes(3)}
        />
        <Square
          value={squares[4]}
          onSquareClick={() => {
            handleClick(4);
          }}
          isWinningSquare={winningSquare && winningSquare.includes(4)}
        />
        <Square
          value={squares[5]}
          onSquareClick={() => {
            handleClick(5);
          }}
          isWinningSquare={winningSquare && winningSquare.includes(5)}
        />
      </div>
      <div className="board-row">
        <Square
          value={squares[6]}
          onSquareClick={() => {
            handleClick(6);
          }}
          isWinningSquare={winningSquare && winningSquare.includes(6)}
        />
        <Square
          value={squares[7]}
          onSquareClick={() => {
            handleClick(7);
          }}
          isWinningSquare={winningSquare && winningSquare.includes(7)}
        />
        <Square
          value={squares[8]}
          onSquareClick={() => {
            handleClick(8);
          }}
          isWinningSquare={winningSquare && winningSquare.includes(8)}
        />
      </div>
    </>
  );
}

const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    // If the values at indexes a, b, and c are all equal (either "X" or "O")
    // and not null, then we have a winner
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      const winningSquare = [a, b, c];

      return winningSquare;
    }
  }
  return null;
};
