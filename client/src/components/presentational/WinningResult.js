import React, { Component } from 'react';
import '../../styles/css/polling.css';
import FontAwesome from 'react-fontawesome'

class WinningResult extends Component {

  render() {
    const { winner } = this.props;
    console.log("WINNER", winner);
    return (
      <div className="winner">
        <div className="winnerContent">
          <h1>
            <FontAwesome name='sign-language' size='2x' style={{ color: 'white' }} />
              Winner!
            <FontAwesome name='sign-language' size='2x' style={{ color: 'white' }} />
          </h1>
          <h1>{ winner.choice[0].locationName }</h1>
          <div><img className="profilePicture" alt={ winner.choice[0].locationName } src={ winner.choice[0].locationImg } /></div>
          <br></br>
          <button className="infoBtn">
                <a className="btnLink" href={winner.choice[0].locationInfo} target='_blank'>Info</a>
            </button>
        </div>
      </div>
    );
  }
};

export default WinningResult;
