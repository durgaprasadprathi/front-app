import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import Modal from "../statusArea/statusModal";

//components
import StatusArea from "../statusArea";
import InputFiled from "../../UI/input/index"
import { updateCanvasRightBar, handleNodeProperties, updateOtherName } from "../../../pages/diagram/actions";
import { capitalizeAttribute } from "../../../shared/stringManipulation"



//CSS
import "./styles.scss";
import _ from 'lodash';


const RightSideModal = (props: any) => {

    const [state, setState] = useState<any>({})
    const [modal, setModal] = useState(false)

    useEffect(() => {
        if (props.diagram.rightBarProperty) {
            let _properties = {
                ...props.diagram.rightBarProperty.properties
            }
            let tags = _properties.tags;
            if(typeof tags === 'object') {
                let keys = Object.keys(tags);
                _properties.tags = keys[0]
            }
            setState(_properties)
        }
    }, [props.diagram.rightBarProperty])

    const handleChange = (e: any, name: string) => {
        let _state = { ...state };
        // console.log(_state);
        _state[name] = e.target.value;


        setState(_state);
    }

    const handleSubmit = (e: any) => {
        e.preventDefault();

        let _state = {
            ...state
        }
        if(_state.tags){
            _state.tags = {
                [_state.tags]:_state.tags
            }
        }

        // console.log(props.diagram.rightBarProperty.key, props.diagram.canvasProperties)
        let _canvasProperties = [...props.diagram.canvasProperties]
        // console.log(_canvasProperties)
        let filter = _canvasProperties.findIndex((c: any) => c.key === props.diagram.rightBarProperty.key);
        if (filter >= 0) {
            _canvasProperties[filter] = {
                ...props.diagram.rightBarProperty,
                properties: _state
            }
        }
        else {
            _canvasProperties.push({
                ...props.diagram.rightBarProperty,
                properties: _state
            })
        }

        // console.log(_canvasProperties)

        props.handleNodeProperties(_canvasProperties, true)
        props.updateOtherName(props.diagram.otherNameChange + 1)
    }
    // console.log(state)

    const closeSection = () => {
        props.updateCanvasRightBar({})
    }

    // console.log(props.diagram.rightBarProperty)
    console.log(props.diagram?.rightBarProperty?.properties)
    return (
        <div className="right-sidebar-modal">
            {
                props.diagram && props.diagram.rightBarProperty && Object.keys(props.diagram.rightBarProperty).length > 0
                    ?
                    <div className="diagram-sidebar-top-section">
                        <div className="right-sidebar-title">
                            {props.diagram.rightBarProperty.name}
                            <span className="right-sidebar-cross"
                                onClick={closeSection}
                            >
                                <span className="close-btn">&times;</span>
                            </span>
                        </div>

                        <form onSubmit={handleSubmit}>

                            <div className="right-sidebar-display">

                                {
                                    props.diagram.rightBarProperty && props.diagram.rightBarProperty.properties && Object.keys(props.diagram.rightBarProperty.properties).map((p: any) => (
                                        p != "TTags"
                                            ?
                                            <>
                                                <div className="row mt-1">
                                                    <div className="col-md-12">

                                                        <InputFiled
                                                            title={capitalizeAttribute(p)}
                                                            required={false}
                                                            description={"description"}
                                                            type="text"
                                                            placeholder={capitalizeAttribute(p)}
                                                            value={state ? state[p] : ''}
                                                            onChange={(e: any) => handleChange(e, p)}
                                                        />
                                                    </div>
                                                </div>


                                            </>

                                            : null
                                    ))
                                }
                                <div className="row mt-2">
                                    <div className="col-md-12 text-center">
                                        <button type="submit" className="btn btn-primary">Submit</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>

                    : <div className="diagram-sidebar-top-section"></div>

            }

            <div className="diagram-sidebar-bottom-section">
                <div className="row" style={{ width: '100%' }}>
                    <div className="col-md-6 title">
                        Error Logs
                    </div>
                    <div className="col-md-6 open-icon">
                        <i
                            className="ri-chat-new-line"
                            style={{ cursor: 'pointer' }}
                            onClick={() => setModal(true)}
                        ></i>
                    </div>
                </div>
                <StatusArea
                    message={props.diagram.message}
                />
                {
                    modal
                        ?
                        <Modal
                            modal={modal}
                            message={props.diagram.message}
                            toggle={() => setModal(false)}
                        />

                        : null
                }

            </div>
        </div>
    )
}


const mapStateToProps = (state: any) => {
    return {
        diagram: state.Diagram,
    };
};

const mapDispatchToProps = { handleNodeProperties, updateCanvasRightBar, updateOtherName }

export default connect(mapStateToProps, mapDispatchToProps)(RightSideModal);
