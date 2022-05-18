import React from 'react';
import axios from 'axios';
import { Figure, ListGroup, Form, Button, Alert } from 'react-bootstrap';
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
      weather: []
    }
  }

  handleCitySubmit = async (e) => {
    e.preventDefault();
    try {
    let url = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_API_ACCESS_TOKEN}&q=${this.state.city}&format=json`;

    let urlWeather = `${process.env.REACT_APP_BACKEND}/weather?city_name=${this.state.city}`

    let cityInfo = await axios.get(url);

    let weatherInfo = await axios.get(urlWeather);
 
    this.setState({
      longitude:cityInfo.data[0].lon,
      latitude:cityInfo.data[0].lat,
      weather: weatherInfo,
      showLocation: true,
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
        {/* <h1>Data From an API</h1>
        <p>{this.state.city}</p>
        <form onSubmit={this.handleCitySubmit}>
          <label htmlFor="cityName">Pick a City</label>
          <input type="text" id="cityName" onChange={this.cityChange} />
          <button type="submit">Explore!</button>
        </form>

        <p>Longitute: {this.state.longitute}</p>
        <p>Latitude: {this.state.latitude}</p> */}

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
          <ListGroup>
            <ListGroup.Item id="dataTitle">City: {this.state.city}</ListGroup.Item>
            <ListGroup.Item>Longitute: {this.state.longitude}</ListGroup.Item>
            <ListGroup.Item>Latitude: {this.state.latitude}</ListGroup.Item>
            <ListGroup.Item>Weather on {this.state.weather.data[0].date}: {this.state.weather.data[0].description}</ListGroup.Item>
            <ListGroup.Item>Weather on {this.state.weather.data[1].date}: {this.state.weather.data[1].description}</ListGroup.Item>
            <ListGroup.Item>Weather on {this.state.weather.data[2].date}: {this.state.weather.data[2].description}</ListGroup.Item>
          </ListGroup>
        
          <Figure>
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
          <Alert className="badError">
            <Alert.Heading variant='danger'>Error!! {this.state.errorMessage}</Alert.Heading>
          </Alert>
        } 
      </>
    )
  }
}

// example of a map url:
    // `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATION_API_KEY}&center=47.6038321,-122.3300624&zoom=12`


// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

export default App;
