import React from 'react';


const GameInfo = props => {
  return (
    <div className="game-info">
      <div className="info-item">
        <span className="nick-field">Hello {props.nickname}</span>
      </div>
      <div className="info-item">Your score: {props.score}</div>
      <div className="info-item">Time left: {props.gameTime}</div>
      <div className="info-item">Your record: {props.record}</div>
    </div>
  )
}

export default GameInfo;
