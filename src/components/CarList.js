import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

//use rcc snippet to auto-create class
class CarList extends Component {
    constructor(props) {
        super(props);
        this.state = {cars: []};
    }

    //Fetch cars
    componentDidMount() {
        this.loadCars();
    }

    loadCars = () => {
        fetch('https://carstockrest.herokuapp.com/cars')
        .then(response => response.json())
        .then(jsondata => this.setState({cars: jsondata._embedded.cars}))
        .catch(err => console.error(err));
    }

    deleteCar = (carLink) => {
       //To show/check the chosen car in console: console.log(carLink.original._links.self.href);
        fetch(carLink.original._links.self.href, {method: 'DELETE'})
        .then(res => this.loadCars())
        .catch(err => console.error(err));
    }

    render() { 
        const columns = [
            {
                Header: 'Brand',
                accessor: 'brand'
            },
            {
                Header: 'Model',
                accessor: 'model'
            },
            {
                Header: 'Color',
                accessor: 'color'
            },
            {
                Header: 'Fuel',
                accessor: 'fuel'
            },
            {
                Header: 'Year',
                accessor: 'year'
            },  
            {
                Header: 'Price',
                accessor: 'price'
            },
            {
                Header: ' ',
                accessor: '_links.self.href',
                Cell: value => <button onClick={() => this.deleteCar(value)}>Delete</button>
            },
        ];

        return (
            <div>
                <ReactTable data={this.state.cars} columns={columns} 
                sortable ={true} filterable={true}/>
            </div>
        );
    }
}

export default CarList;