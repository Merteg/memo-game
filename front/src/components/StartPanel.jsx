import React from 'react';
import { images } from '../config.json'


const StartPanel = props => {
  return (
    <div className="start-panel">
      <div className="start-wrap">
        <label htmlFor="nickname-input">Nickname</label>
        <input id="nickname-input" type="text" placeholder="Your Nickame"
          onChange={props.nicknameHandler} />
        <label htmlFor="img-count-select">Choose count of images</label>
        <select id="img-count-select" value={props.selectValue}
          onChange={props.difficultHadler}>
          {images.map((element, index) => {
            return <option value={index + 1}>{index + 1}</option>
          })}
        </select>
        <button
          className={props.nickname === '' ? 'disabled' : ''}
          disabled={props.nickname === '' ? true : false}
          onClick={props.startGame}>Start</button>
      </div>
    </div>
  )
}

export default StartPanel;
