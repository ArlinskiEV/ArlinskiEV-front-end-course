import React from 'react';

import {
  withRouter
} from 'react-router-dom';

import Checkbox from 'material-ui/Checkbox';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { toggleFilter } from '../../store/actions';

import 'url-search-params-polyfill';

const Tag = styled.div`
    flex-basis: 150px;
    margin-right: 15px;
`;

class Filter extends React.Component {
  componentWillMount() {
    if (this.props.state !== this.props.stateFromURL) {
      this.props.toggle(this.props.state);
      window.console.log('toggle_filter from url');
    }
  }

  render() {
    return (
      <Tag>
        <Checkbox
          label="Show done"
          checked={this.props.state}
          onCheck={() => {this.props.toggle(this.props.state)}}
        />
      </Tag>
    );
  }
}




Filter.propTypes = {
  state: PropTypes.bool,
  stateFromURL: PropTypes.bool,
  toggle: PropTypes.func,
};

const mapStateToProps = function(state, ownProps) {
  let i = ownProps.location.search.lastIndexOf('filter=') + 7;
  let test = i < 7 
    ? true
    : ownProps.location.search.slice(i).toLowerCase() === 'true';

  return {
    state: state.filter.showDone,
    stateFromURL: test,
  };
};

const mapDispatchToProps = function(dispatch, ownProps) {

  return {
    toggle: (value) => {
      dispatch(toggleFilter());

      let path = ownProps.location.pathname;
      let search = new URLSearchParams (ownProps.location.search);
      search.set("filter", !value);
      ownProps.history.push(`${path+'?'+search}`);
    },
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Filter));