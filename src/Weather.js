import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';

class Weather extends React.Component {

    render() {
        let weather = this.props.weather;

        let forecastArr = weather.map( (day,idx) => {
            return <ListGroup.Item key={idx} >Weather on {day.date}: {day.description}</ListGroup.Item>
        });
        
        console.log(this.props.weather);
        return(
            <>
            {forecastArr}
            </>
        )
    }
}

export default Weather;