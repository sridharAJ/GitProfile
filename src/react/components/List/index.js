/**
 * Created by 12072 on 04/03/17.
 */
import React, { Component } from 'react';
import Item from './Item';
import './index.css';

class List extends Component {

    constructor(props){
        super(props);
    }

    render() {
        return (
            <div className="list">
                {
                    this.props.list.map((item) => {
                        return <Item key={item.name} {...item} />
                    })
                }
            </div>
        );
    }
}

export default List;