/**
 * Created by 12072 on 04/03/17.
 */
import React, { Component } from 'react';
import './index.css';

class Item extends Component {

    constructor(props){
        super(props);
    }

    render() {
        return (
            <div className="list-item">
                <a href={this.props.html_url} >{this.props.name}</a>
                <span>{this.props.language ? this.props.language : "unknown"}</span>
            </div>
        );
    }
}

export default Item;