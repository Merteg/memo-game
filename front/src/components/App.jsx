import React, { Component } from 'react';
import FlipCard from './FlipCard';
import GameInfo from './GameInfo';
import StartPanel from './StartPanel';
import { shuffleArray, request } from '../utils';
import { images } from '../config.json'


class App extends Component {
  constructor() {
    super();
    this.state = {
      openedCards: 0,
      closeCards: false,
      totalScore: 0,
      nextAddPoints: 1000,
      openIds: [],
      imgArray: [],
      cardCount: -1,
      startTime: 0,
      gameTime: 0,
      timerId: 0,
      nickname: '',
      ownRecord: 0,
      gameId: 0,
      imgCount: 10,
    }
    this.openCardsControll = this.openCardsControll.bind(this);
  }

  componentDidMount() {
    this.setState({
      imgArray: images,
      cardCount: images.length,
    });
  }

  componentDidUpdate() {
    if (this.state.openedCards === 2) {
      this.setState({
        closeCards: true,
        openedCards: 0,
      });
      setTimeout(function () {
        let flipBlocks = document.getElementsByClassName('flip-container');
        let score = this.state.totalScore;
        let points = this.state.nextAddPoints;
        let cardCount = this.state.cardCount;

        // If the images are the same
        if (this.state.imgArray[this.state.openIds[0]]
          === this.state.imgArray[this.state.openIds[1]]) {
          for (let i = 0; i < flipBlocks.length; i++) {
            if (flipBlocks[i].classList.contains('flip')) {
              flipBlocks[i].style.display = 'none';
            }
          }

          const newTotal = score + points - this.state.gameTime;
          this.setState({
            totalScore: newTotal,
            cardCount: cardCount - 2,
          });

          let requestData = {
            nickname: this.state.nickname,
            score: newTotal
          }
          if (this.state.gameId) {
            requestData.id = this.state.gameId;
          }
          request('/game-score', 'POST', JSON.stringify(requestData)).then(data => {
            if ('id' in data) {
              this.setState({ gameId: data.id });
            }
          });

          if (cardCount - 2 === 0) {
            clearInterval(this.state.timerId);
            document.getElementById('endBlock').style.display = 'block';
          }
        } else {
          for (let i = 0; i < flipBlocks.length; i++) {
            flipBlocks[i].classList.remove('flip');
          }
          this.setState({ nextAddPoints: points - 50 });
        }

        this.setState({
          closeCards: false,
          openIds: [],
        });
      }.bind(this), 1500);
    }
  }

  openCardsControll(cardId) {
    let cardCount = this.state.openedCards;
    let openIndexes = this.state.openIds;
    openIndexes.push(cardId)
    this.setState({
      openIds: openIndexes,
      openedCards: ++cardCount,
      closeCards: false,
    });
  }

  startGame = e => {
    let imgArr = images.slice(0, this.state.imgCount);

    this.setState({
      startTime: new Date(),
      imgArray: shuffleArray(imgArr),
      cardCount: this.state.imgCount * 2,
    });

    const timerId = setInterval(function () {
      let now = new Date()
      this.setState({
        gameTime: Math.round((now - this.state.startTime) / 1000),
      })
    }.bind(this), 1000);

    this.setState({ timerId: timerId })

    request(`/record/${this.state.nickname}`).then(data => {
      if ('record' in data) this.setState({ ownRecord: data.record });
    })
    e.currentTarget.parentElement.parentElement.style.display = 'none';
  }

  nicknameHandler = e => this.setState({ nickname: e.currentTarget.value.trim() });

  difficultHadler = e => this.setState({ imgCount: parseInt(e.target.value, 10) });

  renderCards() {
    return (
      <React.Fragment>
        {
          this.state.imgArray.map((element, index) => {
            return (
              <div className="flip-container-wrap" key={index}>
                <FlipCard
                  id={index}
                  back={element}
                  closeCard={this.state.closeCards}
                  openedCounter={this.openCardsControll}
                />
              </div>
            )
          })
        }
      </React.Fragment>
    )
  }

  reloadPage = () => window.location.reload();

  render() {
    return (
      <div className="App">
        <StartPanel
          nicknameHandler={this.nicknameHandler}
          nickname={this.state.nickname}
          difficultHadler={this.difficultHadler}
          selectValue={this.state.imgCount}
          startGame={this.startGame}
        />
        <GameInfo
          nickname={this.state.nickname}
          score={this.state.totalScore}
          gameTime={this.state.gameTime}
          record={this.state.ownRecord}
        />
        <div className="card-wrapper">
          {this.renderCards()}
        </div>
        <div id="endBlock">
          <p>Congratulations {this.state.nickname}! You end game with {this.state.totalScore} points.</p>
          <button onClick={this.reloadPage}>Reload page, and play again</button>
        </div>
      </div>
    );
  }
}

export default App;
