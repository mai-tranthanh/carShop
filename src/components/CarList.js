import React, { Component } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import Button from "@material-ui/core/Button";
import AddCar from "./AddCar";
import EditCar from "./EditCar";
import Snackbar from "@material-ui/core/Snackbar";

//use rcc snippet to auto-create class
class CarList extends Component {
  constructor(props) {
    super(props);
    this.state = { cars: [], open: false, message:'' };
  }

  //Fetch cars
  componentDidMount() {
    this.loadCars();
  }

  loadCars = () => {
    fetch("https://carstockrest.herokuapp.com/cars")
      .then(response => response.json())
      .then(jsondata => this.setState({ cars: jsondata._embedded.cars }))
      .catch(err => console.error(err));
  };

  deleteCar = carLink => {
    //To show/check the chosen car in console: console.log(carLink.original._links.self.href);
    fetch(carLink, { method: "DELETE" })
      .then(res => this.loadCars())
      .then(res => this.setSate({open: true, message: "Car Deleted"}))
      .catch(err => console.error(err));
  };

 saveCar = (car) => {
    fetch("https://carstockrest.herokuapp.com/cars", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(car)
    })
    .then(res => this.loadCars())
      .then(res => this.setState({ open: true, message: "New Car Added" }))
      .catch(err => console.error(err));
  };

  updateCar = (link, updatedCar) => {
    fetch(link, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updatedCar)
    })
      .then(res => this.loadCars())
      .then(res => this.setState({ open: true, message: "Car Updated" }))
      .catch(err => console.error(err));
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const columns = [
      {
        Header: "Brand",
        accessor: "brand"
      },
      {
        Header: "Model",
        accessor: "model"
      },
      {
        Header: "Color",
        accessor: "color"
      },
      {
        Header: "Fuel",
        accessor: "fuel"
      },
      {
        Header: "Year",
        accessor: "year"
      },
      {
        Header: "Price",
        accessor: "price"
      },
      {
        Header: " ",
        accessor: "_links.self.href",
        filterable: false,
        sortable: false,
        width: 100,
        Cell: ({value, row}) => (
          <EditCar updateCar={this.updateCar} link={value} car={row}/>
        )
      },
      {
        Header: " ",
        accessor: "_links.self.href",
        filterable: false,
        sortable: false,
        width: 100,
        Cell: ({value}) => (
          <Button color="secondary" onClick={() => this.deleteCar(value)}>
            DELETE
          </Button>
        )
      }
    ];

    return (
      <div>
        <AddCar saveCar={this.saveCar} />
        <ReactTable
          data={this.state.cars}
          columns={columns}
          sortable={true}
          filterable={true}
        />

        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left"
          }}
          open={this.state.open}
          autoHideDuration={3000}
          onClose={this.handleClose}
          message={this.state.message}
        />
      </div>
    );
  }
}

export default CarList;
