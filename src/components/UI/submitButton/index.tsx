import React from 'react';
import "./styles.scss";

const SubmitButton = (props:any) =>{
    return (
        <button
            type="submit"
            className="submit-button"
        >
            {props.title}
        </button>
    )
}

export default SubmitButton;