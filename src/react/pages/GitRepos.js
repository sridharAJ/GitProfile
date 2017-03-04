/**
 * Created by 12072 on 04/03/17.
 */
import React, { Component } from 'react';
import RepoList from '../components/RepoList';
import './GitRepos.css';

class GitRepos extends Component {

    constructor(props){
        super(props);

        this.state = {
            username: "sridharAJ",
            clickSubmit: true
        };

        this.getRepoByUser = this.getRepoByUser.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
        this.clearUserName = this.clearUserName.bind(this);
    }

    handleOnChange(e) {
        this.setState({
            username: e.target.value,
            clickSubmit: false
        });
    }

    clearUserName() {
        this.setState({
            username: ""
        });
    }

    getRepoByUser() {
        this.setState({
            clickSubmit: true
        });
    }

    render() {
        return (
            <div className="git-repos">
                <div className="git-search">
                    <input value={this.state.username} onChange={this.handleOnChange}/>
                    <button className="primary" onClick={this.getRepoByUser}>Go</button>
                    <button className="default" onClick={this.clearUserName}>Clear</button>
                </div>
                {this.state.clickSubmit && this.state.username ? <RepoList username={this.state.username}/> : null}
            </div>
        );
    }
}

export default GitRepos;