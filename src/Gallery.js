import React from "react"

import './Gallery.css';

import MoviePoster from "./MoviePoster";

const Gallery = function (props) {
    const posterBaseUrl = `https://image.tmdb.org/t/p/w${props.imgHighRes ? "5" : "2"}00/`
    const posters = props.titlesList.map(
        (movie, index) => {
            return <MoviePoster key={index}
                                src={`${posterBaseUrl}${props.db[movie].poster}.jpg`}
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