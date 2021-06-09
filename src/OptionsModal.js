import React from "react"

import "./OptionsModal.css"

const OptionsModal = function (props) {
    if (!props.visible) {
        return null
    }
    return (
        <div className={"modal-wrapper"}>
            <div className={"modal-content"}>
                <div className={"modal-header"}>
                    <h2>Advanded Options</h2>
                </div>
                <div className={"modal-body"}>
                    <button className={"button-control"} onClick={() => {
                        localStorage.setItem(props.localItem, null);
                        props.fetchDB()
                    }}>Refresh List
                    </button>
                </div>
                <div className={"modal-footer"}>

                </div>

                <button className={"button-control"} onClick={() => {props.toggleModal()}}>Close Modal</button>
            </div>
        </div>
    )

}

export default OptionsModal