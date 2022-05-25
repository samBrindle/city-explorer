import React from 'react';
import axios from 'axios';
import Weather from './Weather';
import Movie from './Movie';
import { Figure, ListGroup, Form, Button, Alert, Table} from 'react-bootstrap';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      locationData: [],
      city: '',
      longitude: '',
      latitude: '',
      showLocation: false,
      error: false,
      errorMessage: '',
      weather: [],
      movie: []
    }
  }

  handleCitySubmit = async (e) => {
    e.preventDefault();
    try {
    let url = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_API_ACCESS_TOKEN}&q=${this.state.city}&format=json`;

    // let urlWeather = `${process.env.REACT_APP_BACKEND}/weather?city_name=${this.state.city}`
    let cityInfo = await axios.get(url);

    let urlWeather = `${process.env.REACT_APP_BACKEND}/weather?city_name=${this.state.city}&lat=${cityInfo.data[0].lat}&lon=${cityInfo.data[0].lon}`
    console.log(cityInfo);

    let urlMovie = `${process.env.REACT_APP_BACKEND}/movies?city_name=${this.state.city}`
    console.log(urlMovie);
    
    let weatherInfo = await axios.get(urlWeather);
    let movieInfo = await axios.get(urlMovie);
    console.log(weatherInfo.data);
    this.setState({
      longitude:cityInfo.data[0].lon,
      latitude:cityInfo.data[0].lat,
      weather: weatherInfo.data,
      movie: movieInfo.data,
      showLocation: true,
      error: false
    })
    } catch (error) {
      console.log('error: ', error);
      console.log('error message: ', error.response);
      this.setState({
        error: true,
        errorMessage: error.message
      })
    };
    // handleWeather(this.state.city);
  }

  // handleWeather = async (e) => {
  //   // e.preventDefault();
  //   let url = `${process.env.AlertREACT_APP_BACKEND}/weather?city_name=${this.state.city}`
  //   let weatherInfo = await axios.get(url);
  //     //test if weatherINfo is working 
  //     // go from there
  //   this.setState({
  //     weather: weatherInfo
  //   })
  // }

  cityChange = (e) => {
    this.setState({
      city:e.target.value,
    });
  }

  render() {
    return(
      <>
        <h1>City Planner</h1>

        <Form onSubmit={this.handleCitySubmit} >
          <Form.Group>
            <Form.Label>Pick a City</Form.Label>
            <Form.Control id="submitBox" type="string" placeholder="Ex. Seattle" onChange={this.cityChange} />
          </Form.Group>
          <Button variant="primary" type="submit">
            Explore!
          </Button>
        </Form>

        {this.state.showLocation && 
        <>
          <ListGroup className="dataLists">
            <ListGroup.Item id="dataTitle" variant="dark">City: {this.state.city}</ListGroup.Item>
            <ListGroup.Item variant="light">Longitute: {this.state.longitude}</ListGroup.Item>
            <ListGroup.Item variant="dark">Latitude: {this.state.latitude}</ListGroup.Item>
          </ListGroup>
          
          {/* <ListGroup className="dataLists">
            <Weather
              weather={this.state.weather}
            /> 

          </ListGroup> */}

          <Table stiped bordered hover variant="dark" id="weatherTable">
            <thead>
              <tr>
                <th>Date</th>
                <th>Low Temp</th>
                <th>High Temp</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <Weather
                weather={this.state.weather}
              /> 

            </tbody>
          </Table>


          <Movie
            movie={this.state.movie}
          />


          <Figure id="map">
            <Figure.Image
            // width={171}
            // height={180}
            // alt="171x180"
            src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_API_ACCESS_TOKEN}&center=${this.state.latitude},${this.state.longitude}&zoom=12`}
            />
          </Figure>
        </>
        }

        {this.state.error && 
          <Alert variant="danger" className="badError">
            <Alert.Heading>Error!! {this.state.errorMessage}</Alert.Heading>
          </Alert>
        } 
      </>
    )
  }
}

// example of a map url:
    // `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATION_API_KEY}&center=47.6038321,-122.3300624&zoom=12`

export default App;
