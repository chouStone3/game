import { useState } from "react";

interface Iprops {
  value: boolean,
  onSquareClick: () => void;
}

// 用数组的形式存储每个正方形中的值
function Square({ value, onSquareClick }: Iprops) {
  return <button className="square" onClick={onSquareClick}>{value}</button>;
}

function Board({ xIsNext, squares, onPlay }: { xIsNext?: boolean, squares: Array<any>, onPlay: (nextS: Array<any>) => void }) {
  const Winner = calculateWinner(squares)
  const handleClick = (i: number) => {
    console.log(Winner);

    if (!Winner && !squares[i]) {
      const nextSquares = squares.slice();
      nextSquares[i] = xIsNext ? "X" : "O"
      onPlay(nextSquares)
    }
  }

  let status;
  if (Winner) {
    status = "Winner    is " + Winner
  } else {
    status = "next step is " + (xIsNext ? "X" : "O")
  }
  return <>
    <h1 >{status} </h1>
    <div className="board-row">
      <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
      <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
      <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
    </div>
    <div className="board-row">
      <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
      <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
      <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
    </div>
    <div className="board-row">
      <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
      <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
      <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
    </div>
  </>
}

export default function Game() {
  /* 
  1: 控制xIsNext
  2: 计算winner
  3：控制棋盘展示第几步的效果
  4: 点击右侧步骤列表回退
  
  */

  const [squares, setSquares] = useState([Array(9).fill(null)]);
  const [currentStep, setCurrentStep] = useState(0);
  const [xIsFrist, setXIsFrist] = useState(true)
  const xIsNext = xIsFrist ? currentStep % 2 === 0 : currentStep % 2 === 1;
  const currentSquares = squares[currentStep]
  function handlePlay(square: Array<string | null>) {
    const newSquares = [...squares.slice(0, currentStep + 1), square]
    setSquares(newSquares)
    setCurrentStep(currentStep + 1)
  }
  function setFirstPlayer() {
    if (currentStep === 0) {
      setXIsFrist(!xIsFrist)
    }
  }
  /* 
      1: 展示所有的=列
      2：点击列中元素控制棋盘显示历史记录
      */
  const moves = squares.map((square, index) => {
    const description = index > 0 ? 'Go to move #' + index : 'Go to game start';
    return <>
      <li key={index}>
        <button onClick={() => setCurrentStep(index)}>{description}</button>
      </li>
    </>
  })

  return <>
    <div className="game">
      <div className="game-board">
        <div onClick={setFirstPlayer}>first is {xIsFrist ? 'X' : 'O'}</div>
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="">
        <ol>{moves}</ol>
      </div>
    </div>
  </>;
}

function calculateWinner(squares: any[]) {
  const lines = [
    [1, 2, 0],
    [4, 5, 3],
    [7, 8, 6],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]
  for (let index = 0; index < lines.length; index++) {
    const [a, b, c] = lines[index]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null

}