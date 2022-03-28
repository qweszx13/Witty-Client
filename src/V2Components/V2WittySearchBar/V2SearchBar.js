import "./style.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { solid, regular, brands } from '@fortawesome/fontawesome-svg-core/import.macro'

function V2SearchBar(){
  return(
    <div id="bar">
      <div id="bar_Layout">
        <input className="searchBar" type="text" placeholder="Search Witty"></input>
        <FontAwesomeIcon className="fa" icon={solid('magnifying-glass')} aria-hidden="true" />
      </div>
    </div>
  )}

  export default V2SearchBar;