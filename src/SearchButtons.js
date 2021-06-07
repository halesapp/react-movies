import React from "react";

import "./SearchButtons.css"

const SearchButtons = function (props) {
    return (
        <div className={"button-controls"}>
            <button className={"button-control"} onClick={props.clickRandom}>Random</button>
            <button className={"button-control"} onClick={() => props.setSearchTitle("")}>Clear</button>
            {/*<button className={"button-control"}>Advanced Search</button>*/}
        </div>
    )
}

export default SearchButtons