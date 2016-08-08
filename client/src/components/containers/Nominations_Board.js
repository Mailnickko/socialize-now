import React, { Component } from 'react';
import '../../styles/css/temp.css';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/actionCreators';
import NomineesList from '../presentational/Nominations_NomineesList';
import WinningResult from '../presentational/WinningResult';

class NominationsBoard extends Component {

  componentWillMount() {
    // fetch commitments based on user
  }

  // Do this to reuse the nominations board component
    //Will probably have to refactor to render via external methods for modularity
  render() {
    if (!this.props.winningResult) {
      return (
        //Would have to change to include commitments
        <div>
          <div>
            <span>Left Arrow</span>
          </div>
          <div>
            {this.props.nominees.map((nominee, i) =>
              <NomineesList
                key={i}
                nominee={nominee}
              />
            )}
          </div>
          <div>
            <span>Right Arrow</span>
          </div>
        </div>
      );
    } else {
      return (
        <WinningResult />
      )
    }
  }
};

function mapStateToProps(state) {
  return {
    //would need data for commitments
    nominees: state.nominees
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(NominationsBoard);
