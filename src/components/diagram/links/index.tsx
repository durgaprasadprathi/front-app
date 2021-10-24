import React from 'react';

import Loader from "../../UI/loader/simpleLoader";

import "./styles.scss";


const Links = (props: any) => {
    return (
        <button
            className={props.isComplete ? "diagram-button button-completed" : "diagram-button"}
            onClick={props.onClick}
            title={props.title}
        >
            {
                props.isLoading
                    ?
                    <Loader />
                    : <i className={props.icon}></i>
            }
        </button>
    )
}

export default Links;