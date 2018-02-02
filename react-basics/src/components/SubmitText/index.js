import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import RaisedButton from 'material-ui/RaisedButton';

const Tag = styled.div`
margin: 5px;
display: flex;
-webkit-box-shadow: 0px 0px 3px 2px rgba(0,0,0,0.75);
-moz-box-shadow: 0px 0px 3px 2px rgba(0,0,0,0.75);
box-shadow: 0px 0px 3px 2px rgba(0,0,0,0.75);
`;

const Area = styled.input.attrs({
    type: "text"
})`
width: 70%;
border: 0px;
padding-left: 10px;
`;

const Button = styled(RaisedButton)`
width: 30%;
`;

export default class SubmitText extends React.Component {
    render () {
        return (
            <Tag>
                <Area
                    placeholder={this.props.placeholder}
                    value = {this.props.value}
                    onChange = {(e) => {this.props.changer(e.target.value)}}
                />
                <Button
                    label={this.props.buttonName}
                    onClick = {() => {this.props.clicker(this.props.value);}}
                />
            </Tag>
        );
    }
}

SubmitText.propTypes = {
    placeholder: PropTypes.string,
    buttonName: PropTypes.string,

    value: PropTypes.string,

    clicker: PropTypes.func,
    changer: PropTypes.func,
};