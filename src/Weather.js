import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';

class Weather extends React.Component {

    render() {
        let weather = this.props.weather;

        let forecastArr = weather.map( (day,idx) => {
            return <ListGroup.Item key={idx} >Weather on {day.date}: Low of {day.low_temp}, High of {day.high_temp} with {day.description}</ListGroup.Item>
        });
        
        console.log(forecastArr);
        return(
            <>
            {forecastArr}
            </>
        )
    }
}

export default Weather;