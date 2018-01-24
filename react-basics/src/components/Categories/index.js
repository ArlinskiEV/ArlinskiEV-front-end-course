import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import CategoryItem from '../../components/CategoryItem';

const Tag = styled.div`
   -webkit-box-shadow: 0px 0px 3px 2px rgba(0,0,0,0.75);
    -moz-box-shadow: 0px 0px 3px 2px rgba(0,0,0,0.75);
    box-shadow: 0px 0px 3px 2px rgba(0,0,0,0.75);
`;

export default class Categories extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: props.categoriesList // {id:0, name: "name", parentId: 0} parentId = 0 => root
        }
    }

    generateViewOrder() {
        let list = this.state.list.map((item) => item).sort((a, b) => {return (b.id - a.id);}); // in order id
        let result =[]; // all for CategoryItem

        let array = list
            .filter((item) => {
                return (item.parentId === 0);
            }) // all in root
            .map((item) => {
                return {
                    id: item.id,
                    name: item.name,
                    shift: 0,
                };
            });
        while (array.length) {
            let current = array.pop();
            array.push(...(list
                .filter((item) => item.parentId === current.id) // all child of current
                .map((item) => { 
                    current.haveNested = true;
                    return {
                        id: item.id,
                        name: item.name,
                        shift: current.shift + 1,
                    };
                }) // with shift
            ));

            result.push(current);
        }

        return result.map((item) => {
            return (
                <CategoryItem
                key = {item.id.toString()}
                itemId = {item.id}
                name = {item.name}
                haveNested = {item.haveNested}
                isOpen = {true}
                shift = {item.shift}
                visible = {true}
            />
            );
        });
    }

    render() {
        return (
            <Tag>
                {/* <CategoryItem
                    itemId = {11}
                    name = "11"
                    haveNested = {true}
                    isOpen = {true}
                    shift = {0}
                    visible = {true}
                />
                <CategoryItem
                    itemId = {22}
                    name = "22"
                    haveNested = {true}
                    isOpen = {false}
                    shift = {1}
                    visible = {true}
                />
                <hr/> */}
                {this.generateViewOrder()}
            </Tag>
        );
    }
}

Categories.propTypes = {
    categoriesList: PropTypes.array,
  };