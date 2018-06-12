import React, { Component } from 'react'

class SearchBar extends Component {
    state = {
        query: '',
        searchResult: [],
    };

    // getAllBooks = () => {
    //     BooksAPI.getAll().then((books) => {
    //         this.setState({ books: books })
    //     });
    //     console.log(BooksAPI.getAll());
    // };

    hasClickedOnPlace = (e) => {
        console.log(e);
    };

    showFilteredLocations = (searchResult) => {
        this.props.showFilteredLocations(searchResult);
    };

    componentDidMount() {
    };

    filterPlacesByQuery = (query) => {
        this.setState({query: query});
        if (query) {
            let searchResult = this.props.locations.filter(location => location.title.toLowerCase().includes(query.toLowerCase()));
            this.setState({searchResult: searchResult});
            this.showFilteredLocations(searchResult);
        }
        else this.setState({searchResult: []});
    };

    render() {
        return (
            <div className="search-bar">
                <div className="search-input-wrapper">
                    <input type="text" placeholder="Search for places"
                           onChange={event => this.filterPlacesByQuery(event.target.value)}
                    />
                    {this.state.query.length > 0 && this.state.searchResult.length > 0 &&
                    <div className="search-nearest-title">Places matching your search: &nbsp;
                        { this.state.searchResult.map((location, index) =>
                            <div className="display-inline" key={index} onClick={this.hasClickedOnPlace.bind(this,location)}>
                                <span className="search-nearest-title-link">{location.title}</span>
                            </div>
                        )}
                    </div>
                    }
                    {this.state.query.length > 0 && this.state.searchResult.length === 0 &&
                    <div className="search-nearest-title">There are no results found for '{this.state.query}'.</div>
                    }
                    {this.state.query.length === 0 &&
                    <div className="search-nearest-title">Start typing in the bar above to search for places.</div>
                    }
                </div>
            </div>
        )
    }
}

export default SearchBar