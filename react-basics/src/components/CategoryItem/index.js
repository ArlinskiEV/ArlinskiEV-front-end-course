import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
    NavLink
} from 'react-router-dom';


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

const Icon = styled.i`
margin: 0px 5px;
&:hover {
    background-color: red;
}
`;

const ToolIcon = Icon.extend.attrs({
    show: props => props.show || 'no',
    move: props => props.move || 'no',
})`
transform: ${props => props.move === 'yes' ? 'rotate(180deg)' : 'none'};
display: ${props => props.show === 'yes' ? 'inline-block' : 'none'};
.selected & {
    display: ${props => (props.show === 'yes' && props.move === 'yes') 
        ? 'none' 
        : props.show === 'yes'
            ? 'inline-block'
            : 'none'
    };
}
`;

const Nested = Icon.extend.attrs({
    show: props => props.show || 'no',
})`
position: absolute;
left: 10px;
display: ${props => props.show === 'yes' ? 'inline' : 'none'};
`;

export default class CategoryItem extends React.Component {

    render() {
        return (
            <MyLink 
                to = {`/category/${this.props.itemId}`}
                activeClassName = "selected"
            >
            <Tag
                shift = {(this.props.shift || 0)}
            >
                <Nested 
                    className = {`fas fa-angle-${(this.props.isOpen || false) ? 'up' : 'down'}`}
                    show = {(this.props.haveNested || false) ? "yes" : "no"}
                    onClick = {(e) => {this.props.showed(); e.preventDefault();}}
                ></Nested>
                <span>{this.props.name}</span>

                <ToolIcon
                    className = "fas fa-edit"
                    onClick = {(e) => { e.preventDefault();}}
                    show = { !(this.props.task > 0) ? "yes" : "no"}
                ></ToolIcon>
                <ToolIcon
                    className = "fas fa-trash"
                    onClick = {(e) => {
                        this.props.remove(this.props.itemId);
                        e.preventDefault();
                        }
                    }
                    show = { !(this.props.task > 0) ? "yes" : "no"}
                ></ToolIcon>
                <ToolIcon
                    className = "far fa-plus-square"
                    onClick = {(e) => { e.preventDefault();}}
                    show = { !(this.props.task > 0) ? "yes" : "no"}
                ></ToolIcon>
                <ToolIcon
                    className = "fas fa-share"
                    onClick = {(e) => {
                            this.props.moveIn(this.props.itemId);
                            this.props.history.push(`/category/${this.props.itemId}/task/${this.props.task}`);
                            e.preventDefault();
                        }
                    }
                    show = {(this.props.task > 0) ? "yes" : "no"}
                    move = {"yes"}
                ></ToolIcon>
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
    task: PropTypes.number,

    showed: PropTypes.func,
    moveIn: PropTypes.func,
    remove: PropTypes.func,

    history: PropTypes.object,
  };