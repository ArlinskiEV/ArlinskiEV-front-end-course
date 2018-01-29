import React from 'react';
import Checkbox from 'material-ui/Checkbox';
// import ActionFavorite from 'material-ui/svg-icons/action/favorite';
// import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
// import Visibility from 'material-ui/svg-icons/action/visibility';
// import VisibilityOff from 'material-ui/svg-icons/action/visibility-off';

const styles = {
  block: {
    minWidth: 150,
    marginRight: 15,
  },
  checkbox: {
    // marginBottom: 16,
  },
};

export default class Filter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: true,
        }
    }
  updateCheck() {
    this.setState((oldState) => {
      return {
        checked: !oldState.checked,
      };
    });
  }

  render() {
    return (
      <div style={styles.block}>
        <Checkbox
          label="Show done"
          checked={this.state.checked}
          onCheck={() => {this.updateCheck()}}
          style={styles.checkbox}
        />
      </div>
    );
  }
}