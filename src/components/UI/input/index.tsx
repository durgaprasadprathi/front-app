import React, { useState } from 'react';
import { Tooltip } from 'reactstrap';

import "./styles.scss";

const Input = (props: any) => {

    const [tooltipOpen, setTooltipOpen] = useState(false);
    const toggle = () => setTooltipOpen(!tooltipOpen);

    const returnLabel = () => {
        return (
            <label className="input-label">{props.title}
                {
                    props.description
                        ?
                        <>
                            &nbsp;
                            <i className="ri-question-line input-icons" id="TooltipExample"></i>
                            <Tooltip placement="top" isOpen={tooltipOpen} target="TooltipExample" toggle={toggle}>
                                {props.description}
                            </Tooltip>
                        </>
                        : null
                }
            </label>
        )
    }

    return (
        <>
            {
                props.type === "select"
                    ?
                    <div className="input-group">
                        {returnLabel()}
                        <select
                            className="input-field"
                            required
                            value={props.value}
                            onChange={props.onChange}

                        >
                            {
                                props.options && props.options.map((a: any, i: any) => (
                                    <option key={i} value={a[props.optionLabel]}>{a[props.optionName]}</option>
                                ))
                            }

                        </select>
                    </div>


                    :
                    <div className="input-group">
                        {returnLabel()}
                        <input
                            className="input-field"
                            type={props.type}
                            required={props.required}
                            placeholder={props.placeholder}
                            value={props.value}
                            onChange={props.onChange}
                        />
                    </div>
            }
        </>
    )
}


export default Input