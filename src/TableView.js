import React from "react"

import "./TableView.css"

const TableView = function (props) {
    const columnNames = Object.keys(props.db[props.titlesList[0]])
    const labelRow = ['Movie'].concat(columnNames).map(item => {
        return <th>{item}</th>
    })
    const rows = props.titlesList.map(
        (movie, index) => {
            const entries = [<td>{movie}</td>,].concat(columnNames.map(property => {
                return <td>{props.db[movie][property]}</td>
            }))
            return (
                <tr className="table-row" style={{"display": props.postersVisible[index] ? "" : "none"}}>{entries}</tr>
            )
        }
    )

    return (
        <div className={"table-wrapper"}>
            <table className="gallery-table">
                <thead>
                <tr>{labelRow}</tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>
        </div>
    )
}

export default TableView