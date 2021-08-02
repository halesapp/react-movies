import React from "react";

import "./ButtonControls.css"

import {GooglePlayLogo, VuduLogo, DiscIcon, IMDBLogo} from "./LogoSVG"

const URL_pageGoogle = "https://play.google.com/store/movies/details?id=";
const URL_pageTMDB = "https://themoviedb.org/movie/";
const URL_searchGoogle = "https://play.google.com/store/search?c=movies&q=";
const URL_searchVudu = "https://www.vudu.com/content/movies/search?searchString=";
const URL_searchIMDB = "https://www.imdb.com/find?q=";
const rel = "noopener noreferrer"
const target = "_blank"
const bClass = "button-control"

const WatchButton = (props) => {
    const button = <button className={bClass} disabled={!props.show}>{props.children}</button>
    if (props.show && props.href) return <a href={props.href} target={target} rel={rel}>{button}</a>
    return button
}

const ButtonControls = function (props) {
    const SearchControls =
        <div className={"button-group"}>
            <button className={bClass} onClick={props.random}><div>Random</div></button>
            <button className={bClass} onClick={() => props.setSearchTitle("")}><div>Clear</div></button>
            <button className={bClass} onClick={() => props.toggleModal()}><div>Options</div></button>
            <button className={bClass} onClick={() => {
                props.viewMode === "gallery" ? props.setViewMode("table") : props.setViewMode("gallery")
            }}><div>View {props.viewMode === "gallery" ? "Table" : "Posters"}</div></button>
        </div>

    let WatchControls = null
    if (props.movie !== "" && props.db[props.movie] !== undefined) {
        const options = props.db[props.movie]
        const gUrl = options.gid ? `${URL_pageGoogle}${options.gid}` : `${URL_searchGoogle}${props.movie}`
        const vUrl = `${URL_searchVudu}${props.movie}`
        const iUrl = `${URL_searchIMDB}${props.movie}`
        const tUrl = `${URL_pageTMDB}${options.tmdbid}`
        WatchControls =
            <div className={"button-group"}>
                <WatchButton href={gUrl} show={Boolean(options.onGoogle)}>
                    <GooglePlayLogo/>
                </WatchButton>
                <WatchButton href={vUrl} show={Boolean(options.onVudu)}>
                    <VuduLogo/>
                </WatchButton>
                <WatchButton href={false} show={Boolean(options.file)}>
                    <div>File</div>
                </WatchButton>
                <WatchButton href={false} show={Boolean(options.disc)}>
                    <DiscIcon/>
                </WatchButton>
                <WatchButton href={iUrl} show={true}>
                    <IMDBLogo/>
                </WatchButton>
                <WatchButton href={tUrl} show={true}>
                    <div>TMDb</div>
                </WatchButton>
            </div>
    }

    return (
        <div className={"button-controls-container"}>
            {SearchControls}
            {WatchControls}
        </div>
    )
}

export default ButtonControls