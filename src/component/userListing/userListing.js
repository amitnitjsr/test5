import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Axios from 'axios';

class userListing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userData: null,
            searchValue: '',
            filterBy: 'name',
        }
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData = () => {
        Axios.get('https://jsonplaceholder.typicode.com/users')
            .then((response) => {
                console.log('res', response)
                this.setState({ userData: response.data })
            })
            .catch((error) => {
                console.log('error', error)
            })
    }

    inputHandler = (event) => {
        this.setState({ searchValue: event.target.value }, () => {
            if (this.state.searchValue === '') {
                this.fetchData();
            }
        });
    }

    searchHandler = () => {
        Axios.get(`https://jsonplaceholder.typicode.com/users?${this.state.filterBy}=${this.state.searchValue}`)
            .then((response) => {
                this.setState({ userData: response.data })
            })
            .catch((error) => {
                console.log('error', error)
            });
    }

    selectHandler = (event) => {

        if (event.target.value === 'City') {
            this.setState({ filterBy: 'address.city' }, () => {
                console.log('data', this.state.filterBy)
            })
        }
        else
            this.setState({ filterBy: 'name' })
    }
    albumHandler = () => {
        this.props.history.push('/albumListing')
    }
    render() {
        return (
            <div>
                <button onClick={() => this.albumHandler()}>Album List</button><br />
                <label>Search value by name or city</label><br /><br />

                <select onClick={(event) => this.selectHandler(event)}>
                    <option>Name</option>
                    <option>City</option>
                </select>&nbsp;
                <input type='search' value={this.state.searchValue}
                    onChange={(event) => this.inputHandler(event)} />&nbsp;
                <button onClick={() => this.searchHandler()} >search</button>

                <table>
                    <tbody>
                        <tr>
                            <td>name</td>
                            <td>city</td>
                        </tr>
                        {this.state.userData && this.state.userData ?
                            this.state.userData.map((val) => {
                                return (
                                    <tr>
                                        <td>{val.name}</td>
                                        <td>{val.address.city}</td>
                                    </tr>
                                )
                            })

                            : null
                        }

                    </tbody>
                </table>
            </div>
        )
    }
}

export default withRouter(userListing);