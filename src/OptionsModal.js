import React from "react"

import "./OptionsModal.css"

const OptionsModal = (props) => {
    return (
      <div className={`modal-wrapper ${props.visible ? "show" : "hide"}`}>
          <div className={"modal-content"}>
              <div className={"modal-head"}>
                  <h2 className={"modal-title"}>Advanced Options</h2>
                  <div>&copy; Riley Hales, 2021, {process.env.REACT_APP_VERSION}</div>
                  <div>Movie posters provided by <a href={"https://tmdb.org"} target={"_blank"} rel={"noopener noreferrer"}>TMDb</a></div>
              </div>
              <div className={"modal-body"}>
                  <button className={"modal-button"} onClick={() => {
                      props.toggleModal()
                      props.fetchDB(true)
                  }}>Refresh List
                  </button>
                  <br/>

                  <a href={"https://docs.google.com/spreadsheets/d/1STMqN8zF0rUsskwK5FCGFrmLRy_rdLd900_blI-T49s/edit?usp=sharing"}
                     target={"_blank"} rel={"noopener noreferrer"}>
                      <button className={"modal-button"}>View Google Sheet</button>
                  </a>

                  <div className={"modal-div"}>
                      <div className={"modal-opt-label"}>Exclude Movies on Disc:</div>
                      <label className="switch">
                          <input type="checkbox" onChange={() => props.togExclDisc()} checked={props.filterDisc} aria-label={"hide disc only movies"}/>
                          <span className="slider"/>
                      </label>
                  </div>
                  <div className={"modal-div"}>
                      <div className={"modal-opt-label"}>Use High Res Images:</div>
                      <label className="switch">
                          <input type="checkbox" onChange={() => props.togImgRes()} checked={props.imgHighRes} aria-label={"toggle high res images"}/>
                          <span className="slider"/>
                      </label>
                  </div>
                  <div className={"modal-div"}>
                      <div className={"modal-opt-label"}>Enable Search Animations:</div>
                      <label className="switch">
                          <input type="checkbox" onChange={() => props.togAnimate()} checked={props.animateSearch} aria-label={"toggle search animations"}/>
                          <span className="slider"/>
                      </label>
                  </div>
                  <div className={"modal-div"}>
                      <div className={"modal-opt-label"}>Show Posters Alphabetically:</div>
                      <label className="switch">
                          <input type="checkbox" onChange={() => props.togAlphabetize()} checked={props.alphabetize} aria-label={"toggle alphabetical"}/>
                          <span className="slider"/>
                      </label>
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