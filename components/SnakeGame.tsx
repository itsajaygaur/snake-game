"use client";
import { useEffect, useState } from "react";

const gridSize = 20;
const snakeLength = 3;
const snakeDirection = "DOWN";

export default function SnakeGame() {
  const [snake, setSnake] = useState([
    { x: 2, y: 0 },
    { x: 1, y: 0 },
    { x: 0, y: 0 },
  ]);

  const [food, setFood] = useState({ x: 0, y: 0 });
  const [direction, setDirection] = useState(snakeDirection);
  // const [gameOver, setGameOver] = useState(false);

  async function moveSnake() {
    const newSnake = [...snake];
    const head = { ...newSnake[0] };

    switch (direction) {
      case "UP":
        head.y -= 1;
        break;
      case "DOWN":
        head.y += 1;
        break;
      case "LEFT":
        head.x -= 1;
        break;
      case "RIGHT":
        head.x += 1;
        break;
      default:
        break;
    }


    if (
      head.x < 0 ||
      head.x >= gridSize ||
      head.y < 0 ||
      head.y >= gridSize ||
      newSnake.some((segment) => segment.x === head.x && segment.y === head.y)
    ) {
      // setGameOver(true);
      window.location.reload()
      startGame()
      alert('Game Over')
      return;
    }

    if (head.x === food.x && head.y === food.y) {
      generateFood();
    } else {
      newSnake.pop();
    }

    newSnake.unshift(head);
    setSnake(newSnake);
  }

  async function generateFood() {
    const x = Math.floor(Math.random() * gridSize);
    const y = Math.floor(Math.random() * gridSize);
    setFood({ x, y });
  }

  useEffect(() => {
    startGame();
  }, []);

  async function startGame() {
    const initialSnake = [];
    for (let i = 0; i < snakeLength; i++) {
      initialSnake.push({ x: i, y: 0 });
    }
    setSnake(initialSnake);
    generateFood();
  }

  useEffect(() => {
    const i = setInterval(moveSnake, 100);
    return () => clearInterval(i);
  }, [snake, direction]);

  function handleKeyPress(event: React.KeyboardEvent<HTMLDivElement>): void {
    if (event.key === "ArrowUp" && direction !== "DOWN") {
      setDirection("UP");
    }
    if (event.key === "ArrowDown" && direction !== "UP") {
      setDirection("DOWN");
    }
    if (event.key === "ArrowLeft" && direction !== "RIGHT") {
      setDirection("LEFT");
    }
    if (event.key === "ArrowRight" && direction !== "LEFT") {
      setDirection("RIGHT");
    }
  };

  return (
    <div
      className="grid place-content-center h-screen"
      onKeyDown={handleKeyPress}
      autoFocus
      tabIndex={0}
    >
      <div>
        <h1 className="text-center mb-2">Snake Game</h1>

        <div className="border">
          {/* {gameOver && (
            <div className="absolute flex flex-col justify-center items-center gap-5 inset-0 z-10  backdrop-blur-sm ">
              <p className="text-red-500 font-semibold text-4xl"> Game Over </p>
              <button
                className="bg-green-500 hover:bg-green-600 px-4 py-2 text-white rounded-md"
                onClick={() => window.location.reload()}
              >
                {" "}
                Start again
              </button>
            </div>
          )} */}
          {Array.from({ length: gridSize }).map((_, y) => (
            <div key={y} className="flex">
              {Array.from({ length: gridSize }).map((_, x) => (
                <div
                  key={x}
                  className={`size-6 border ${
                    snake.some(
                      (segment) => segment.x === x && segment.y === y
                    ) && "bg-green-500"
                  } 
                                    ${
                                      food.x === x &&
                                      food.y === y &&
                                      "bg-red-500"
                                    }
                                    `}
                ></div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
