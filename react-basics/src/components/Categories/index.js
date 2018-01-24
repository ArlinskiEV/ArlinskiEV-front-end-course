import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import CategoryItem from '../../components/CategoryItem';
import generateState from './generateState'
const Tag = styled.div`
   -webkit-box-shadow: 0px 0px 3px 2px rgba(0,0,0,0.75);
    -moz-box-shadow: 0px 0px 3px 2px rgba(0,0,0,0.75);
    box-shadow: 0px 0px 3px 2px rgba(0,0,0,0.75);
`;

export default class Categories extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: generateState.generate(props.categoriesList), // {id:0, name: "name", parentId: 0} parentId = 0 => root
        }
    }

    showed(id) {
        // window.console.log(`showed=${id} prev:${JSON.stringify(this.state.list)}`);
        // window.console.log(this.state.list);
        this.setState((prevState) => {
            return (
                generateState.showed(id, prevState.list)
            );
        });
    }

    render() {
        return (
            <Tag>
                <hr/>
                {this.state.list
                    .filter((item) => item.visible)
                    .map((item) => {
                        window.console.log(`list:!!!!!!!${item.name} id=${item.id}!!!!!!!-${item.isOpen ? 'up' : 'down'}`);
                        return (
                            <CategoryItem
                                key = {item.id.toString()}
                                itemId = {item.id}
                                name = {`${item.name} id=${item.id}`}
                                haveNested = {item.haveNested}
                                isOpen = {item.isOpen}
                                shift = {item.shift}
                                showed = {() => {this.showed(item.id)}}
                            />
                        );
                })}
                <hr/>
            </Tag>
        );
    }
}

Categories.propTypes = {
    categoriesList: PropTypes.array,
  };