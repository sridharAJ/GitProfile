/**
 * Created by 12072 on 04/03/17.
 */
import React, { Component } from 'react';
const SuperAgent = require('superagent');
import List from './List';
import './RepoList.css';

class RepoList extends Component {

    constructor(props){
        super(props);

        this.state = {
            repos: [],
            reponame: "",
            error: ""
        };

        this.resetAll = this.resetAll.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
    }

    handleOnChange(e) {
        let reponame = e.target.value;
        this.setState({
            reponame
        })
    }

    getReposByUserName(props) {
        SuperAgent
            .get(`https://api.github.com/users/${props.username}/repos`)
            .set('Accept', 'application/vnd.github.v3+json')
            .end((error, results) => {
                if(!error) {
                    let repos = [];
                    try{
                        repos = JSON.parse(results.text)
                    }catch(e){
                        console.log(e)
                    }
                    this.setState({
                        repos,
                        error: ""
                    });
                }else {
                    this.setState({
                        error: "User not found",
                        repos: []
                    })
                }
            })
    }

    getList() {
        let {reponame, repos} = this.state;
        if(!reponame) return repos;
        let searchList = repos.filter((item) => {
            let name = item.name.toLowerCase();
            let repoName = reponame.toLowerCase();
            if(name.indexOf(repoName) != -1){
                return item
            }
        });

        return searchList;
    }

    componentDidMount() {
        this.getReposByUserName(this.props);
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.username !== this.props.username) {
            this.getReposByUserName(nextProps);
        }
    }

    resetAll(e) {
        let input = document.getElementById('reponame');
        this.setState({
            reponame: input.value
        });
    }

    render() {
        return (
            <div className="repos-list">
                {
                    this.state.error ?
                        <div>{this.state.error}</div> :
                        <div className="repos-list-group">
                            <h3 className="repos-list-title">Repos</h3>
                            <div className="repos-search">
                                <input id="reponame" value={this.state.reponame} onChange={this.handleOnChange}/>
                                <button onClick={this.resetAll}>x</button>
                            </div>
                            <List list={this.getList()}/>
                        </div>
                }
            </div>
        );
    }
}

export default RepoList;