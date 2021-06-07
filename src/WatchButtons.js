import React from "react";

import {URL_pageGoogle, URL_searchGoogle, URL_searchFandango, URL_searchIMDB, URL_pageTMDB} from "./urls";
import "./WatchButtons.css"

const WatchButton = function (props) {
    return (
        <a href={props.href}>
            <button>{props.name}</button>
        </a>
    )
}

const WatchButtons = function (props) {
    if (props.movie === "") return <div className={"watch-buttons"}/>
    const options = props.db[props.movie]

    const buttons = [    ]

    if (options.onGoogle) {
        buttons.push(
            <WatchButton
                key={"watch-google"}
                href={options.idGoogle ? `${URL_pageGoogle}${options.idGoogle}` : `${URL_searchGoogle}${props.movie}`}
                name={"Google"}/>
        )
    }
    if (options.onFandango) {
        buttons.push(
            <WatchButton
                key={"watch-fandango"}
                href={`${URL_searchFandango}${props.movie}`}
                name={"Fandango"}/>
        )
    }
    if (options.onFile) {
        buttons.push(
            <WatchButton
                key={"watch-digital"}
                href={"#"}
                name={"Digital File"}/>
        )
    }
    if (options.onDisc) {
        buttons.push(
            <WatchButton
                key={"watch-disc"}
                href={"#"}
                name={"Disc"}/>
        )
    }
    if (options.isUHD) {
        buttons.push(
            <WatchButton
                key={"watch-uhd"}
                href={"#"}
                name={"UHD"}/>
        )
    }
    if (options.is3D) {
        buttons.push(
            <WatchButton
                key={"watch-3d"}
                href={"#"}
                name={"3D"}/>
        )
    }

    buttons.push(
        <WatchButton
            key={"watch-imdb"}
            href={`${URL_searchIMDB}${props.movie}`}
            name={"Search IMDb"}/>
    )

    buttons.push(
        <WatchButton
            key={"watch-tmdb"}
            href={`${URL_pageTMDB}${options.idTMDB}`}
            name={"View on TMDB"}/>
    )

    return (
        <div className={"watch-buttons"}>
            {buttons}
        </div>
    )
}

export default WatchButtons