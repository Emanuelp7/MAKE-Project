import React, { Component } from 'react';

import './App.css';
import { render } from '@testing-library/react';
import MovieRow from './MovieRow.js'
import $ from 'jquery'



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    }

    this.cancel = '';
  }
  // Takes the searchterm and attatches it url for querying
  performSearch(searchTerm) {
    const urlString = "https://api.themoviedb.org/3/search/movie?api_key=0e11dba550c2721f8769af2eb1eec6b5&query=" + searchTerm
    $.ajax({
      url: urlString,
      success: (searchResults) => {
        const results = searchResults.results
        var movieRows = []

        if (this.state.loading !== true) {
          this.setState({ rows: [] })
          return
        }


        results.forEach((movie) => {
          movie.poster_src = "https://image.tmdb.org/t/p/w188_and_h282_bestv2" + movie.poster_path
          console.log(movie.poster_path)
          const movieRow = <MovieRow key={movie.id} movie={movie} />

          // For each movie results, a row is created 
          movieRows.push(movieRow)

        })
        this.setState({ rows: movieRows })

      },
      error: (xhr, status, err) => {
        console.error("Failed to fetch data")
      }
    })
  }

  searchChangeHandler(event) {
    // checks to ensure that the page is loading correctly and searchbar is empty
    console.log("TestString " + event.target.value)
    if (event.target.value === "") {
      this.setState({ loading: false })
      this.setState({ rows: [] })
      return
    }
    console.log(event.target.value)

    this.setState({ loading: true })

    const boundObject = this;
    const searchTerm = event.target.value;
    boundObject.performSearch(searchTerm)
  }


  // Main page rendering containing the obama images and title
  render() {
    return (
      <div>
        <table className="titleBar">
          <tbody>
            <tr>
              <h1>
                Obama's Movie Gallery
              </h1>
              <tr>
                <div className='img-wrapper'>
                  <img id="obamaImage" alt="background" className="obamaImage" src="Obama Final.png" />
                  <img id="leftPoster" alt="left" className="leftPoster" src="TheLionKing.jpg" />
                  <img id="middlePoster" alt="middle" className="middlePoster" src="ShutterIsland.jpg" />
                  <img id="rightPoster" alt="right" className="rightPoster" src="PulpFiction.jpg" />
                  <img id="obamaCutOut" alt="obamacutout" className="obamaCutOut" src="ObamaCutOut.png" />
                </div>
              </tr>
            </tr>
            <tr className="titleBar">
              <input className="searchBar" onChange={this.searchChangeHandler.bind(this)} placeholder="Enter movie title..." />
            </tr>
          </tbody>
        </table>

        {this.state.rows}
      </div>
    );
  }
}

export default App;
