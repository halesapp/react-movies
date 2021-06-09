import React from "react";

import "./SearchButtons.css"

const SearchButtons = function (props) {
    return (
        <div className={"button-controls"}>
            <button className={"button-control"} onClick={props.clickRandom}>Random</button>
            <button className={"button-control"} onClick={() => props.setSearchTitle("")}>Clear</button>
            <button className={"button-control"} onClick={() => {
                localStorage.setItem(props.localItem, null);
                props.fetchDB()
            }}>Refresh List
            </button>
        </div>
    )
}

export default SearchButtons