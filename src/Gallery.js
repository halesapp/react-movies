import React from "react"

import MoviePoster from "./MoviePoster";

import './Gallery.css';

const Gallery = function (props) {
    const posters = props.titlesList.map(
        (movie, index) => {
            return <MoviePoster key={index}
                                src={props.db[movie].poster}
                                visible={props.postersVisible[index]}
                                title={movie}
                                click={props.setSearchTitle}/>
        })

    return (
        <div className="gallery">
            <div className="posters-container">
                {posters}
            </div>
        </div>
    )
}

export default Gallery