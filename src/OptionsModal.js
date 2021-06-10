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