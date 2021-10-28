import React from 'react';
import './styles.scss';

const ActionButton = (props: any) => {
    return (
        <span style={props.style} className={props.fill ? "action-button fill" : "action-button"} onClick={props.disabled ? {} : props.onClick}>
            <span className={props.fill ?"action-button-icon fill" : "action-button-icon"}>
                <i className={props.icon} style={props.color ? {color:props.color} : {}}></i>
            </span>&nbsp;
            <span className="action-button-title">{props.title}</span>
        </span>
    )
}

export default ActionButton;