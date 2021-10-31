import React, { useState } from 'react';
import "./styles.scss";

const WorkspaceInformation = (props: any) => {

    const [isOpen, setIsOpen] = useState(false);
    // console.log(props.allStack, "sadsadsa")
    return (
        <>
            {
                isOpen
                    ?
                    <div className="diagram-information">
                        <div className="row">
                            <div className="col-md-12 mt-2 mb-2">
                                <input type="text" readOnly className="form-control" value={props.data.awsRegion} placeholder="Region" />
                                {/* <select
                        className="form-control"
                    >
                        <option>Region</option>
                        <option>us-west-1</option>
                        <option>us-west-1</option>
                    </select> */}
                            </div>

                            <div className="col-md-12 mb-2">
                                {/* <input type="text" className="form-control" readOnly value={props.data?.organization?.organizationName} placeholder="Stack Name" /> */}
                                <select
                                    className="form-control"
                                >
                                    {
                                        props.allStack && props.allStack.length > 0 && props.allStack.map((s: any, i: any) => (
                                            <option value={s.stackId}>{s.terraformBackend.name}</option>

                                        ))
                                    }
                                </select>
                            </div>

                            <div className="col-md-12 mb-2">
                                <input type="text" readOnly className="form-control" value="AWS" />
                            </div>
                        </div>

                    </div>
                    : <div className="diagram-info-hide"></div>
            }
            {
                isOpen
                    ?
                    <span className="diagram-basic-show" onClick={() => { setIsOpen(false) }}>
                        <i className="ri-arrow-up-s-line"></i>
                    </span>
                    :
                    <span className="diagram-basic-hide" onClick={() => { setIsOpen(true) }}>
                        <i className="ri-arrow-down-s-line"></i>
                    </span>
            }
        </>
    )
}

export default WorkspaceInformation;