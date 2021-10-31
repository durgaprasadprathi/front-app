import React, { useEffect, useState} from 'react';

import Loader from "../../UI/loader/simpleLoader";

import "./styles.scss";


const Links = (props: any) => {

    const [state, setState] = useState("diagram-button")
    useEffect(() =>{
        checkComplete()
    },[props.isLoading])

    useEffect(() =>{
        checkComplete()
    },[])

    const checkComplete = () =>{

        // console.log(props.isComplete)
        let res = props.isComplete();

        // console.log(res)

        if(res){
            setState("diagram-button button-"+res)
        }
        else{
            setState("diagram-button")
        }
        
    }

    return (
        <button
            className={state}
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