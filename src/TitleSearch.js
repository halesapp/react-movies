import "./TitleSearch.css"

const TitleSearch = (props) => {
    return (
      <input className={"title-search-box"} type="text" placeholder={`Search ${props.count} Movies`} aria-label={"title search bar"}
             onChange={event => {props.set(event.target.value)}} value={props.value}/>
    )
}

export default TitleSearch