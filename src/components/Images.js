import React from 'react';
import { addQuery, removeQuery, removeAllQueries } from '../actions/queryActions';
import { connect } from 'react-redux';
import Popup from './Popup';
import Unsplash from 'unsplash-js';
const Unsplash2 = require('unsplash-js').default;

const unsplash = new Unsplash2({
    applicationId: "2a6fe5e1ab695571627a0d7c14acacd44e6a83a4e42c95fe8e5202a5a3c0a4b0",
    secret: "33dc167560e4be8e4d2a6178f1c7cf2a4d70b39ef36bcbb81cfc1fb8207c492a",
    callbackUrl: "urn:ietf:wg:oauth:2.0:oob"
});

class Images extends React.Component {

    componentDidMount() {

        this.nameInput.focus();

        return (<div className="Images">
            <input
                ref={(input) => { this.nameInput = input; }}
                onChange={this.handleInput}
                value={this.state.input}
                type="text"
                placeholder="keyword" />
            <div
                onClick={this.getImages}
                className="btn">
                Search
                </div>
            <div
                onClick={() => this.props.addQuery(this.state.input)} className="save">
                Save query
                </div>
        </div>);
    };

    state = {
        input: '',
        results: [],
        errors: [],
        loading: false,
        active: false,
    };

    togglePopup = () => {
        this.setState({ active: !this.state.active })
    };

    getSavedQuery = (i) => {
        unsplash.search.photos(`${this.props.queries[i]}`, 1)
            .then(this.setState({ loading: true }))
            .then(function (response) {
                return response.json();
            })
            .then((myJson) => {
                this.setState({ loading: false })
                const results = myJson.results;
                this.setState({ results })
                this.setState({ errors: [] })
                if (this.state.results.length === 0) {
                    this.setState({ errors: [...this.state.errors, 'we got an error'] })
                }
            })
    };

    save = (e) => {
        localStorage.setItem('savedQueries', JSON.stringify(e))
    };

    handleInput = (e) => {
        this.setState({ input: e.target.value })
    };

    getImages = () => {
        unsplash.search.photos(`${this.state.input}`, 1)
            .then(this.setState({ loading: true }))
            .then(function (response) {
                return response.json();
            })
            .then((myJson) => {
                this.setState({ loading: false })
                const results = myJson.results;
                this.setState({ results })
                this.setState({ errors: [] })
                if (this.state.results.length === 0) {
                    this.setState({ errors: [...this.state.errors, 'we got an error'] })
                }
            })
    };

    render() {

        const images = this.state.results.map((image, i) => {

            let author = image.user.username;
            let address = "https://unsplash.com/@" + author + "?utm_source=image-search&utm_medium=referral";
            let name = image.user.name.slice(0, 7);

            return (<div className="wrapper" key={i}>
                <div className="img-wrapper">
                    <img src={image.urls.regular}
                        alt={image.description} />
                    <a rel="noopener noreferrer"
                        target="_blank"
                        href={address}
                        className="user-tag">
                        {name}...
                    </a>
                    <a rel="noopener noreferrer"
                        target="_blank"
                        href="https://unsplash.com/?utm_source=image-search&utm_medium=referral"
                        className="unsplash-tag">
                        on Unsplash </a>
                </div>
            </div>)
        });

        const queries = this.props.queries.map((query, i) => {
            return (
                <li
                    onClick={() => this.getSavedQuery(i)}
                    key={i}
                >
                    {query}
                    <span
                        onClick={() => this.props.removeQuery(i)}
                    >X</span>
                </li>
            )
        });


        return (
            <div className="container">
                <div className="Images">
                    <Popup
                        toggle={this.togglePopup}
                        active={this.state.active}
                        remove={this.props.removeAllQueries}
                        question="you sure?" />
                    <input
                        ref={(input) => { this.nameInput = input; }}
                        onChange={this.handleInput}
                        value={this.state.input}
                        type="text"
                        placeholder="enter keyword" />
                    {this.state.errors.length > 0 ? <h2>there are no results for this keyword</h2> : null}
                    <div
                        onClick={this.getImages}
                        className="btn">
                        Search
                </div>
                    <div
                        onClick={() => this.props.addQuery(this.state.input)}
                        className="save">
                        Save query
                </div>
                    {this.state.loading ? <div className="loader"></div> : null}
                    <div className="image-grid">
                        {images}
                    </div>
                </div>
                <div className="saved-queries">
                    <h3>saved queries</h3>
                    <ul>
                        {queries}
                    </ul>
                    <div
                        className="remove"
                        onClick={this.togglePopup}>
                        remove all queries
                    </div>

                </div>
            </div>
        )
    }
};

const mapStateToProps = (state) => {
    return {
        queries: state.queries
    }
}

export default connect(mapStateToProps, { addQuery, removeQuery, removeAllQueries })(Images)
