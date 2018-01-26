import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import CategoryItem from '../../components/CategoryItem';
// import generateState from './generateState'; 

import { connect } from 'react-redux';
import store from '../../store';
import {toggleSubCategories} from '../../store/actions';

const Tag = styled.div`
    overflow: auto;
   -webkit-box-shadow: 0px 0px 3px 2px rgba(0,0,0,0.75);
    -moz-box-shadow: 0px 0px 3px 2px rgba(0,0,0,0.75);
    box-shadow: 0px 0px 3px 2px rgba(0,0,0,0.75);
`;

const Wrap = styled.div`
display: flex;
padding: 10px;
flex-direction: column;
min-width: max-content;
`;

class Categories extends React.Component {
    constructor(props) {
        super(props);
        // this.state = {
        //     list: generateState.generate(props.categoriesList), // {id:0, name: "name", parentId: 0} parentId = 0 => root
        // }
    }

    showed(id) {
        // this.setState((prevState) => {
        //     return (
        //         generateState.showed(id, prevState.list)
        //     );
        // });

        store.dispatch(toggleSubCategories(id));
    }

    render() {
        return (
            <Tag>
                <Wrap>
                    <hr/>
                    {this.props.state//this.state.list
                        .filter((item) => item.visible)
                        .map((item) => {
                            return (
                                <CategoryItem
                                    key = {item.id}
                                    itemId = {item.id}
                                    name = {item.name}
                                    haveNested = {item.haveNested}
                                    isOpen = {item.isOpen}
                                    shift = {item.shift}
                                    showed = {() => {this.showed(item.id)}}
                                />
                            );
                        })
                    }
                    <hr/>
                </Wrap>
            </Tag>
        );
    }
}

Categories.propTypes = {
    state: PropTypes.array
};

const mapStateToProps = function(store) {
    // window.console.log('-------Categories----------');
    // window.console.log(`all_store=${JSON.stringify(store)}`);
    // window.console.log(`store.catListState=${JSON.stringify(store.categoriesListState)}`);
    return {
        // state: store.categoriesListState.categoriesState
        state: store.categoriesState,
    };
};

export default connect(mapStateToProps)(Categories);