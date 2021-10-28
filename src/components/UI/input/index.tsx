import React from "react";
import "./styles.scss";

const Input = (props: any) => {
    return (
        <>
            {
                props.type === "select"
                    ?
                    <div className="input-group">
                        <label className="input-label">{props.title}</label>
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
                        <label className="input-label">{props.title}</label>
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