import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

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
`;

const Button = styled.input.attrs({
    type: "button"
})`
width: 30%;
`;

export default class SubmitText extends React.Component {
    render () {
        return (
            <Tag>
                <Area
                    placeholder={this.props.placeholder}
                />
                <Button
                    value={this.props.buttonName}
                />
            </Tag>
        );
    }
}

SubmitText.propTypes = {
    placeholder: PropTypes.string,
    buttonName: PropTypes.string,
};