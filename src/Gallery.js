import React from "react"

import './Gallery.css';

import MoviePoster from "./MoviePoster";

const Gallery = (props) => {
    const posterBaseUrl = `https://image.tmdb.org/t/p/w${props.imgHighRes ? "5" : "2"}00/`
    const showLarge = props.postersVisible.filter(Boolean).length === 1

    return (
      <div className={"gallery-wrapper"}>
          <div className={"gallery"}>
              {
                  props.titlesList.map(
                    (movie, index) => <MoviePoster key={index}
                                                   src={`${posterBaseUrl}${props.db[movie].img}.jpg`}
                                                   visible={props.postersVisible[index]}
                                                   title={movie}
                                                   click={props.setSearchTitle}
                                                   animateSearch={props.animateSearch}
                                                   large={showLarge && props.postersVisible[index]}/>
                  )
              }
          </div>
      </div>
    )
}

export default Gallery