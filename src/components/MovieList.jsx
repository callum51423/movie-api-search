import React from "react";
import "core-js/stable";
import "regenerator-runtime/runtime";
import ReactTable from 'react-table';
import MovieSearch from "./Form"
//import 'react-table/react-table.css'; does not work

export default class MovieList extends React.Component {



    getElements(initialized, columns ) {
        if (!initialized) return <div></div>;
        else return <ReactTable data={this.props.movieData} columns={columns} />;
    }
          
    render() {
        console.log("Rendering MovieList component")

        const columns = [{
            Header: "Title",
            accessor: "Title", // String-based value accessors!
          }, {
            Header: 'Year',
            accessor: 'Year',
            Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
          }]
        
         
        return (
            <div>
                {this.getElements(this.props.initialized, columns )}
            </div>
        )
    }
}
 