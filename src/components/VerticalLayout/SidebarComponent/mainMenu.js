import React from 'react';
import { Link } from "react-router-dom";


const MainMenu = (props) => {

    const generateClass = (name) =>{

        let path = window.location.pathname.split("/");
        let className = props.hasCaret ? " has-arrow waves-effect" : "waves-effect";
        className = name.toLowerCase() == path[1] ? className+" active" : className;
        // console.log(className)
        return className;
    }

    // console.log()

    return (
        <Link to={props.data.route} className={generateClass(props.data.name)}>
            <i style={{marginLeft: -6}} className={props.data.icon}></i>
            {/* <span className="badge rounded-pill bg-success float-end">3</span> */}
            <span className="ms-1"  >{props.data.name}</span>
        </Link>
    )
}

export default MainMenu;