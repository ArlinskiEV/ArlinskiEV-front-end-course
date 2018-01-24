import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Tag = styled.div.attrs({
    // we can define dynamic props
    shift: props => props.shift || 0,
    show: props => props.show || "no",
  })`
margin-left: ${props => `${props.shift * 5}px`};
display: ${props => props.show === "yes" ? 'flex' : 'none'};

border: 1px solid black;

position: relative;
padding: 15px;
padding-left: 35px;
&:hover {
    background-color: pink;
}
`;

const Nested = styled.i`
position: absolute;
left: 20px;
&:hover {
    background-color: red;
}
`;

export default class CategoryItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.itemId,
            name: props.name,
            haveNested: props.haveNested || false,
            isOpen: props.isOpen || false,
            shift: props.shift || 0,
            visible: props.visible || false,
        }
    }

    render() {
        return (
            <Tag
                shift = {this.state.shift}
                show = {this.state.visible ? "yes" : "no"}
            >
                {this.state.haveNested ? <Nested className={`fas fa-angle-${this.state.isOpen ? 'up' : 'down'}`}></Nested> : ''}
                <span> ||| </span>
                <span>{this.state.name}</span>
                <i className="fas fa-edit"></i>
                <i className="fas fa-trash"></i>
                <i className="far fa-plus-square"></i>
            </Tag>
        );
    }
}

CategoryItem.propTypes = {
    itemId: PropTypes.number,
    name: PropTypes.string,
    haveNested: PropTypes.bool,
    isOpen: PropTypes.bool,
    shift: PropTypes.number,
    visible: PropTypes.bool
  };