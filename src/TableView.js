import React from "react"

import "./TableView.css"

const TableView = function (props) {
    const columnNames = Object.keys(props.db[props.titlesList[0]])
    const labelRow = ['Movie'].concat(columnNames).map((item, index) => {
        return <th key={index}>{item}</th>
    })
    const rows = props.titlesList.map(
        (movie, index) => {
            const entries = [<td key={0}>{movie}</td>,].concat(columnNames.map((property, index) => {
                return <td key={index + 1}>{props.db[movie][property]}</td>
            }))
            return (
                <tr key={index} className="table-row" style={{"display": props.postersVisible[index] ? "" : "none"}}>{entries}</tr>
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