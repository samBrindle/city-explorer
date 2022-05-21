import React from 'react';

class Weather extends React.Component {

    render() {
        let weather = this.props.weather;

        let forecastArr = weather.map( (day,idx) => {

            return (
                <tr key={idx}>
                    <td>{day.date}</td>
                    <td>{day.low_temp}</td>
                    <td>{day.high_temp}</td>
                    <td>{day.description}</td>
                </tr>
            )
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