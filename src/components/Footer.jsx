import React from "react";
import { GAME_STATE_PLAYING } from "../Constants";

const Footer = ({ onNewGameClick, onSuggestClick, gameState }) => {
  return (
    <div className="panel footer">
      {gameState === GAME_STATE_PLAYING ? (
        <button onClick={onSuggestClick}>Suggest</button>
      ) : (
        <button onClick={onNewGameClick}>New game</button>
      )}
    </div>
  );
};

export default Footer;
