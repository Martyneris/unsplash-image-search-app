import React from 'react';
import Unsplash from 'unsplash-js';
const Unsplash2 = require('unsplash-js').default;

const unsplash = new Unsplash2({
    applicationId: "2a6fe5e1ab695571627a0d7c14acacd44e6a83a4e42c95fe8e5202a5a3c0a4b0",
    secret: "33dc167560e4be8e4d2a6178f1c7cf2a4d70b39ef36bcbb81cfc1fb8207c492a",
    callbackUrl: "urn:ietf:wg:oauth:2.0:oob"
});

class Images extends React.Component {


    componentDidMount(){
        return (<div className="Images">
            <input
                onChange={this.handleInput}
                value={this.state.input}
                type="text"
                placeholder="keyword" />
            <div
                onClick={this.getImages}
                className="btn">
                Search
                </div>
        </div>);
    }

    state = {
        input: '',
        results: [],
        errors:[]
    }

    handleInput = (e) => {
        this.setState({ input: e.target.value })
    };

    getImages = async () => {
        unsplash.search.photos(`${this.state.input}`, 1)
            .then(await function (response) {
                return response.json();
            })
            .then((myJson) => {
                const results = myJson.results;
                this.setState({ results })
            if(this.state.results.length===0){
                this.setState({errors:[...this.state.errors, 'we got an error']})
            }
            })
    };

    redirectToAuthor = (author) => {
        const authorName = author;
        window.location.href = "https://unsplash.com/@" + authorName + "?utm_source=image-search&utm_medium=referral";
    }

    render() {

        if(this.state.errors.length>0){
            return (<div className="Images">
                <h2>there are no results for this keyword</h2>
                <input
                    onChange={this.handleInput}
                    value={this.state.input}
                    type="text"
                    placeholder="keyword" />
                <div
                    onClick={this.getImages}
                    className="btn">
                    Search
                </div>
            </div>);
        }
            

        const images = this.state.results.map((image, i) => {

            let author = image.user.username;
            let address = "https://unsplash.com/@" + author + "?utm_source=image-search&utm_medium=referral";

            return (<div className="wrapper">
                <div className="img-wrapper">
                <img src={image.urls.regular}
                    key={i}
                    alt={image.description}/>
                </div>
                <div className="author">
                    <ul>
                    <a href={address}
                    className="user-tag">
                    {image.user.name}
                    </a>
                    <a href="https://unsplash.com/?utm_source=image-search&utm_medium=referral"
                    className="unsplash-tag"> 
                    on Unsplash </a>
                    </ul>
                </div>
            </div>)
        });

        return (
            <div className="Images">
                <input
                    onChange={this.handleInput}
                    value={this.state.input}
                    type="text"
                    placeholder="keyword" />
                <div
                    onClick={this.getImages}
                    className="btn">
                    Search
                </div>
                <div className="image-grid">
                    {images}
                </div>
            </div>
        )
    }
};

export default Images