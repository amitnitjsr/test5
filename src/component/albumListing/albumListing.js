import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Axios from 'axios';
import { Card, CardBody, CardTitle } from 'reactstrap';
import './albumListing.css';

class albumListing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userData: null,
            userId: 0,
            allAlbumData: null,
            photoData: null,
        }
    }

    componentDidMount() {
        this.fetchData();
        this.getAlbumData();
    }

    getAlbumData = (id = null) => {
        let url = 'https://jsonplaceholder.typicode.com/albums'
        if (id !== null) {
            url = url + '?userId=' + id
        }
        Axios.get(url
        )
            .then((response) => {
                console.log('getAlbumData', response)
                this.setState({ allAlbumData: response.data })
            })
            .catch((error) => {
                console.log('error', error)
            })

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

    getPhoto = (id) => {
        Axios.get(` https://jsonplaceholder.typicode.com/photos? albumId=${id}`)
            .then((response) => {
                console.log('photo', response)
                this.setState({ photoData: response.data })
            })
            .catch((error) => {
                console.log('error', error)
            })
    }

    selectHandler = (event) => {
        this.setState({ id: event.target.value }, () => {
            this.getAlbumData(this.state.id)
        })
    }

    photoListing = (id) => {
        console.log('id', id)
        this.getPhoto(id);
    }

    render() {
        return (
            <div>
                <button onClick={() => this.props.history.push('/')}>Back to UserList Page</button><br />
                <label>Album filter by user</label><br /><br />

                <select onClick={(event) => this.selectHandler(event)}>
                    {this.state.userData && this.state.userData ?
                        this.state.userData.map((val) => {
                            return (
                                <option value={val.id}>{val.name}</option>
                            )
                        })
                        : null}
                </select>&nbsp;

                <div className="main">
                    {this.state.allAlbumData ?
                        this.state.allAlbumData.map((val) => {
                            return (
                                <Card onClick={() => this.photoListing(val.userId)}>
                                    <CardBody className="card-body-st">
                                        <CardTitle>
                                            {val.title}
                                        </CardTitle>

                                    </CardBody>
                                </Card>
                            )
                        })
                        : null}

                </div>
            </div>
        )
    }
}

export default withRouter(albumListing);