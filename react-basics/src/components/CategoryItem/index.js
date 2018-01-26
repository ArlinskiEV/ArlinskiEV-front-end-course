import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {NavLink} from 'react-router-dom';

const Tag = styled.div.attrs({
    // we can define dynamic props
    shift: props => props.shift || 0,
})`
margin-left: ${props => `${props.shift * 20}px`};
min-width: max-content;

border: 1px solid black;
position: relative;
padding: 15px;
padding-left: 35px;
&:hover {
    background-color: pink;
}
.selected & {
    background-color: yellow;
}
`;

const MyLink = styled(NavLink)`
text-decoration: none;
color: inherit;
`;

function check(match, location) {
    window.console.log(`categoryItem-check: match=${match}, location=${location}`);
    return match;
}

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
    // constructor(props) {
    //     super(props);
    // }

    render() {
        return (
            <MyLink 
                to={`/category/${this.props.itemId}`}
                activeClassName="selected"
                isActive={check}
            >
            <Tag
                shift = {(this.props.shift || 0)}
            >
                <Nested 
                    className={`fas fa-angle-${(this.props.isOpen || false) ? 'up' : 'down'}`}
                    show={(this.props.haveNested || false) ? "yes" : "no"}
                    onClick = {()=> {this.props.showed();}}
                ></Nested>
                <span>{this.props.name}</span>
                <Icon className="fas fa-edit"></Icon>
                <Icon className="fas fa-trash"></Icon>
                <Icon className="far fa-plus-square"></Icon>
            </Tag>
            </MyLink>
        );
    }
}

CategoryItem.propTypes = {
    itemId: PropTypes.number,
    name: PropTypes.string,
    haveNested: PropTypes.bool,
    isOpen: PropTypes.bool,
    shift: PropTypes.number,
    showed: PropTypes.func,
  };