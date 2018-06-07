import React, { Component } from 'react'

class SearchBar extends Component {
    state = {
        places: [],
    };

    // getAllBooks = () => {
    //     BooksAPI.getAll().then((books) => {
    //         this.setState({ books: books })
    //     });
    //     console.log(BooksAPI.getAll());
    // };
    //
    // componentDidMount() {
    //     this.getAllBooks();
    // }

    filterPlacesByQuery = (query) => {
        // if (query) {
        //     BooksAPI.search(query.trim()).then(success => {
        //         if (!success.error) {
        //             this.setState({books: success});
        //         }
        //         else this.setState({books: []});
        //     });
        // }
        // else this.setState({books: []});
    };

    render() {
        return (
            <div className="search-bar">
                <div className="search-input-wrapper">
                    <input type="text" placeholder="Search for places"
                           onChange={event => this.filterPlacesByQuery(event.target.value)}
                    />
                    <div className="search-nearest-title">Places matching your search: </div>
                </div>
            </div>
        )
    }
}

export default SearchBar