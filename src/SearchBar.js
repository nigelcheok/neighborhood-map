import React, { Component } from 'react'

class SearchBar extends Component {
    state = {
        query: '',
        searchResult: [],
        // initialLoad: true,
    };

    hasClickedOnPlace = (location) => {
        this.props.showClickedLocation(location);
    };

    showFilteredLocations = (searchResult) => {
        this.props.showFilteredLocations(searchResult);
    };

    componentDidMount() {
        // this.state.searchResult = this.props.locations;
        this.setState({ searchResult: this.props.locations });
    };

    filterPlacesByQuery = (query) => {
        // this.initialLoad = false;
        this.setState({query: query});
        if (query) {
            let searchResult = this.props.locations.filter(location => location.title.toLowerCase().includes(query.toLowerCase()));
            this.setState({searchResult: searchResult});
            this.showFilteredLocations(searchResult);
        }
        else {
            this.setState({searchResult: []});
            this.showFilteredLocations(this.props.locations);
        }
    };

    render() {
        return (
            <div className="search-bar">
                <div className="search-input-wrapper">
                    <input type="text" placeholder="Search for places"
                           onChange={event => this.filterPlacesByQuery(event.target.value)}
                    />
                    { (this.state.searchResult.length > 0) &&
                    <div className="search-nearest-title">
                        { this.state.query.length > 0 && <span>Places matching your search:</span> }
                        { this.state.query.length === 0 && <span>All Places:</span> }
                        &nbsp;
                        { this.state.searchResult.map((location, index) =>
                            <div className="display-inline search-nearest-title-link" key={index} onClick={this.hasClickedOnPlace.bind(this,location)}>
                                <span>{location.title}</span>
                            </div>
                        )}
                    </div>
                    }
                    { this.state.searchResult.length === 0 && this.state.query.length > 0 &&
                    <div className="search-nearest-title">There are no results found for '{this.state.query}'.</div>
                    }
                    { this.state.searchResult.length === 0 && this.state.query.length === 0 &&
                    <div className="search-nearest-title">Start typing in the bar above to search for places.</div>
                    }
                </div>
            </div>
        )
    }
}

export default SearchBar