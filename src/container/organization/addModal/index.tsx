import { useState, useEffect } from 'react';
import { Col, Row } from "reactstrap";
import InputField from "../../../components/UI/input";
import SubmitButton from "../../../components/UI/submitButton"


const AddModal = (props: any) => {

    const [state, setState] = useState({
        organizationName: '',
        description: '',
        tags: ''
    })

    useEffect(() => {
        // console.log(props)
        if (props.data) {
            setState({ ...state, organizationName: props.data.organizationName })
        }
    }, [])

    const handleName = (e: any, name: string) => {
        let _state: any = { ...state }
        _state[name] = e.target.value;
        setState(_state);
    }

    const handleSubmit = (e: any) => {
        e.preventDefault();
        if (props.data && props.data.organizationId) {
            props.editOrganization(state);
        }
        else {
            props.addOrganization(state);
        }
    }

    return (
        <>
            <br />
            <form onSubmit={handleSubmit}>
                <Row className="mb-3">
                    <Col md={12}>
                        <InputField
                            title="Enter Organization Name"
                            type="text"
                            required={true}
                            placeholder="Organization Name"
                            value={state.organizationName}
                            onChange={(e: any) => handleName(e, 'organizationName')}

                        />
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col md={12}>
                        <Col md={12}>
                            <InputField
                                title="Enter description"
                                type="text"
                                required={true}
                                placeholder="Description"
                                value={state.description}
                                onChange={(e: any) => handleName(e, 'description')}

                            />
                        </Col>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col md={12}>
                        <InputField
                            title="Enter tags"
                            type="text"
                            required={true}
                            placeholder="Tags"
                            value={state.tags}
                            onChange={(e: any) => handleName(e, 'tags')}

                        />
                    </Col>
                </Row>
                <Row>
                    <Col md={12} className="text-center">
                        <SubmitButton
                            title={"SAVE ORGANIZATION"}
                        />
                    </Col>
                </Row>
            </form>
        </>
    )
}

export default AddModal;