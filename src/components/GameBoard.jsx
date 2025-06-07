import React from "react";
import { useEffect } from "react";
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
import { getComputerMove, isDraw, isWinner } from "../helper";
import Footer from "./Footer";
import GameCircle from "./GameCircle";
import Header from "./Header";
const GameBoard = () => {
  const [gameBoard, setGameBoard] = useState(Array(NO_CIRCLES).fill(NO_PLAYER));
  const [currentPlayer, setCurrentPlayer] = useState(PLAYER_1);
  const [gameState, setGameState] = useState(GAME_STATE_PLAYING);
  const [winPlayer, setWinPlayer] = useState(NO_PLAYER);

  const iniitGame = () => {
    setGameBoard(Array(NO_CIRCLES).fill(NO_PLAYER));
    setCurrentPlayer(PLAYER_1);
    setGameState(GAME_STATE_PLAYING);
    setWinPlayer(NO_PLAYER);
  };

  useEffect(() => {
    iniitGame();
  }, []);

  const initBoard = () => {
    const circles = [];
    for (let i = 0; i < NO_CIRCLES; i++) {
      circles.push(renderCircle(i));
    }

    return circles;
  };

  const handleClick = (id) => {
    if (
      gameBoard[id] !== NO_PLAYER ||
      gameState !== GAME_STATE_PLAYING ||
      id === null
    )
      return;
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

  const suggestMove = () => {
    handleClick(getComputerMove(gameBoard));
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
      <Footer
        onNewGameClick={iniitGame}
        onSuggestClick={suggestMove}
        gameState={gameState}
      />
    </>
  );
};

export default GameBoard;
