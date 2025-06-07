import React from "react";
import { useState } from "react";
import {
  GAME_STATE_DRAW,
  GAME_STATE_PLAYING,
  GAME_STATE_WIN,
  NO_CIRCLES,
  NO_PLAYER,
  PLAYER_1,
  PLAYER_2,
} from "../Constants";
import { isDraw, isWinner } from "../helper";
import Footer from "./Footer";
import GameCircle from "./GameCircle";
import Header from "./Header";
const GameBoard = () => {
  const [gameBoard, setGameBoard] = useState(Array(NO_CIRCLES).fill(NO_PLAYER));
  const [currentPlayer, setCurrentPlayer] = useState(PLAYER_1);
  const [gameState, setGameState] = useState(GAME_STATE_PLAYING);
  const [winPlayer, setWinPlayer] = useState(NO_PLAYER);

  const initBoard = () => {
    const circles = [];
    for (let i = 0; i < NO_CIRCLES; i++) {
      circles.push(renderCircle(i));
    }

    return circles;
  };

  const handleClick = (id) => {
    if (gameBoard[id] !== NO_PLAYER || gameState !== GAME_STATE_PLAYING) return;
    setGameBoard((prev) => {
      return prev.map((circle, pos) => {
        if (pos === id) return currentPlayer;
        return circle;
      });
    });
    setCurrentPlayer(currentPlayer === PLAYER_1 ? PLAYER_2 : PLAYER_1);
    if (isWinner(gameBoard, id, currentPlayer)) {
      setGameState(GAME_STATE_WIN);
      setWinPlayer(currentPlayer);
    }
    if (isDraw(gameBoard, id, currentPlayer)) {
      setGameState(GAME_STATE_DRAW);
      setWinPlayer(NO_PLAYER);
    }
  };

  const renderCircle = (id) => (
    <GameCircle
      key={id}
      id={id}
      handleClick={handleClick}
      className={`player_${gameBoard[id]}`}
    />
  );

  return (
    <>
      <Header
        currentPlayer={currentPlayer}
        gameState={gameState}
        winPlayer={winPlayer}
      />
      <div className="gameBoard">{initBoard()}</div>
      <Footer />
    </>
  );
};

export default GameBoard;
