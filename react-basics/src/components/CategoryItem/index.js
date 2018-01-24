import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Tag = styled.div.attrs({
    // we can define dynamic props
    shift: props => props.shift || 0,
    // show: props => props.show || "no",
})`
margin-left: ${props => `${props.shift * 20}px`};
display: flex;

border: 1px solid black;

position: relative;
padding: 15px;
padding-left: 35px;
&:hover {
    background-color: pink;
}
`;

const Icon = styled.i`
margin: 0px 5px;
&:hover {
    background-color: red;
}
`;

const Nested = Icon.extend.attrs({
    show: props => props.show || "no",
})`
position: absolute;
left: 10px;
display: ${props => props.show === "yes" ? 'inline' : 'none'};
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
            // visible: props.visible || false,
            showed: props.showed,
        }
        window.console.log(`constructor:!!!!!!!${this.state.name} id=${this.state.id}!!!!!!!-${this.state.isOpen ? 'up' : 'down'}`);
    }

    render() {
        window.console.log(`render:!!!!!!!${this.state.name} id=${this.state.id}!!!!!!!-${this.state.isOpen ? 'up' : 'down'}`);
        return (
            <Tag
                shift = {this.state.shift}
            >
                <Nested 
                    className={`fas fa-angle-${this.state.isOpen ? 'up' : 'down'}`}
                    show={this.state.haveNested ? "yes" : "no"}
                    onClick = {()=> {this.state.showed();}}
                ></Nested>
                <span>||| {this.state.name} |||</span>
                <Icon className="fas fa-edit"></Icon>
                <Icon className="fas fa-trash"></Icon>
                <Icon className="far fa-plus-square"></Icon>
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
    // visible: PropTypes.bool,
    showed: PropTypes.func,
  };