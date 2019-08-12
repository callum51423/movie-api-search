import React from "react";
import MovieList from "./MovieList"
import "core-js/stable";
import "regenerator-runtime/runtime";

export default class MovieSearch extends React.Component {
    constructor(props) {
      super(props);
      this.state = {value: '', initialized: false};
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

  
    handleChange(event) {
      this.setState({value: event.target.value});
    }
  
    async handleSubmit(event) {
      console.log('A search was issued: ' + this.state.value);
     
      event.preventDefault();
      console.log("searchTerm: " + this.state.value)

        if (this.state.value) {
            const url = `http://www.omdbapi.com/?apikey=84f775ad&s=${this.state.value}`;
            const response = await fetch(url);
            const data = await response.json();
            
            const allMovies = data.Search

            var obj = {};

            for ( var i=0, len=allMovies.length; i < len; i++ ) {

                const movie = allMovies[i]
                const key = movie.Title + movie.Year

                obj[key] = movie;
            }

            

            const filtMovies = new Array();
            for ( var key in obj )
            filtMovies.push(obj[key]);
            this.setState({value: this.state.value, initialized: true, comMovies: filtMovies })
        }
    }
  
    render() {
      console.log("Rendering MovieSearch component. value: " + this.state.value)
      return (
          <>
        <form onSubmit={this.handleSubmit}>
          <label>
            Name:
            <input type="text" value={this.state.value} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
        <MovieList initialized={this.state.initialized} movieData={this.state.comMovies}/>
        </>
      );
    }
  }