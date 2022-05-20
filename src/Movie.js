import React from 'react';
import { Container } from 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel'
import './Movie.css';

class Movie extends React.Component {

    render() {
        let movie = this.props.movie;

        let movieArr = movie.map( (flick,idx) => {
            return(
            
             <Carousel.Item key={idx}>
                 <img 
                    style={{'height':"600px",'width':"300px"}}
                    className='d-block w-100'
                    src={flick.img_url}
                    alt={flick.title}
                 />
                 <Carousel.Caption id="carousel-caption">
                     <h3>{flick.title}</h3>
                     <h4>Released on: {flick.released_on}</h4>
                     <h5>Average Rating: {flick.avg_votes}, Total Votes: {flick.vote_count}</h5>
                     <p>Summary: {flick.overview}</p>
                 </Carousel.Caption>
            </Carousel.Item>
            )

            // return <ListGroup.Item key={idx}>Title:{flick.title}, Overview:{flick.overview}</ListGroup.Item>
        })
        return(
            <>
                <Container>
                    <Carousel variant="dark" >
                        {movieArr}
                    </Carousel>
                </Container>
            </>
        )
    }

}

export default Movie;