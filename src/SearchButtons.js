import React from "react";

import "./SearchButtons.css"

const SearchButtons = function (props) {
    return (
        <div className={"button-controls"}>
            <button className={"button-control"} onClick={props.clickRandom}>Random</button>
            <button className={"button-control"} onClick={() => props.setSearchTitle("")}>Clear</button>
            <button className={"button-control"} onClick={() => props.toggleModal()}>Advanced Options</button>
            <button className={`button-control ${props.viewMode === "gallery" ? "hidden" : ""}`} onClick={() => props.setViewMode("gallery")}>Show Posters</button>
            <button className={`button-control ${props.viewMode === "table" ? "hidden" : ""}`} onClick={() => props.setViewMode("table")}>Show Table</button>
            <button className={`button-control ${props.viewMode === "gsheet" ? "hidden" : ""}`} onClick={() => props.setViewMode("gsheet")}>Show GSheet</button>
        </div>
    )
}

export default SearchButtons