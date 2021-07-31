import React from "react";

import "./ButtonControls.css"

import {GooglePlayLogo, VuduLogo, DiscIcon, IMDBLogo} from "./LogoSVG"

const URL_pageGoogle = "https://play.google.com/store/movies/details?id=";
const URL_pageTMDB = "https://themoviedb.org/movie/";
const URL_searchGoogle = "https://play.google.com/store/search?c=movies&q=";
const URL_searchVudu = "https://www.vudu.com/content/movies/search?searchString=";
const URL_searchIMDB = "https://www.imdb.com/find?q=";

const WatchButton = function (props) {
    return (
        <a className={!props.show ? "faded" : ""} href={props.href} target={"_blank"} rel={"noopener noreferrer"}>
            <button className={"button-control"} disabled={!props.show}>{props.children}</button>
        </a>
    )
}

const ButtonControls = function (props) {
    const SearchControls =
        <div className={"button-group"}>
            <button key={1} className={"button-control"} onClick={props.chooseRandom}><div>Random</div></button>
            <button key={2} className={"button-control"} onClick={() => props.setSearchTitle("")}><div>Clear</div></button>
            <button key={3} className={"button-control"} onClick={() => props.toggleModal()}><div>Options</div></button>
            <button key={4} className={"button-control"} onClick={() => {
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
                <WatchButton key={"w1"} href={gUrl} show={Boolean(options.onGoogle)}>
                    <GooglePlayLogo/>
                    <div>Google</div>
                </WatchButton>
                <WatchButton key={"w2"} href={vUrl} show={Boolean(options.onVudu)}>
                    <VuduLogo/>
                </WatchButton>
                <WatchButton key={"w3"} href={"#"}  show={Boolean(options.file)}>
                    <div>Digital File</div>
                </WatchButton>
                <WatchButton key={"w4"} show={Boolean(options.disc)}>
                    <DiscIcon/>
                    <div>Disc</div>
                </WatchButton>
                <WatchButton key={"w5"} href={iUrl} show={true}>
                    <IMDBLogo/>
                </WatchButton>
                <WatchButton key={"w6"} href={tUrl} show={true}>
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