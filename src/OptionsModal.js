import React from "react"

import "./OptionsModal.css"

const OptionsModal = function (props) {
    // if (!props.visible) {
    //     return null
    // }
    return (
        <div className={`modal-wrapper ${props.visible ? "show" : "hide"}`}>
            <div className={"modal-content"}>
                <div className={"modal-body"}>

                    <h2 className={"modal-title"}>Advanced Options</h2>
                    <button className={"modal-button"} onClick={() => {
                        localStorage.setItem(props.localItem, null);
                        props.fetchDB()
                    }}>Refresh List
                    </button>
                    <br/>

                    <a href={"https://docs.google.com/spreadsheets/d/1STMqN8zF0rUsskwK5FCGFrmLRy_rdLd900_blI-T49s/edit?usp=sharing"}
                       target={"_blank"}
                       rel={"noopener noreferrer"}>
                        <button className={"modal-button"}>View Google Sheet</button>
                    </a>

                    <button className={"modal-button"} onClick={props.downloadDB}>Download Database JSON</button>

                    <div>
                        View Modes:&nbsp;&nbsp;&nbsp;&nbsp;
                        <div className={"view-inputs"}>
                            <label for={"viewmode-gallery"}>Poster Gallery</label>
                            <input type={"radio"} value={"gallery"} checked={props.viewMode === "gallery" ? true : false} onChange={() => props.setViewMode("gallery")}/>
                        </div>
                        <div className={"view-inputs"}>
                            <label for={"viewmode-gallery"}>Table</label>
                            <input type={"radio"} value={"table"} checked={props.viewMode === "table" ? true : false} onChange={() => props.setViewMode("table")}/>
                        </div>
                        <div className={"view-inputs"}>
                            <label for={"viewmode-gallery"}>Google Sheet iframe</label>
                            <input type={"radio"} value={"gsheet"} checked={props.viewMode === "gsheet" ? true : false} onChange={() => props.setViewMode("gsheet")}/>
                        </div>
                    </div>


                </div>
                <div className={"modal-footer"}>
                    <button className={"modal-button"} onClick={() => {
                        props.toggleModal()
                    }}>Close Modal
                    </button>
                </div>
            </div>
        </div>
    )

}

export default OptionsModal