import { useState, useEffect } from 'react';
import { Col, Row } from "reactstrap";
import InputField from "../../../components/UI/input";
import SubmitButton from "../../../components/UI/submitButton"

const allRegion = [
    { name: "us-east-1" },
    { name: "us-west-1" }
]


const AddModal = (props: any) => {

    const [state, setState] = useState({
        ownerId: 1,
        workspaceId: 1,
        name: "",
        awsRegion: "us-east-1",
        awsAccessKey: "",
        awsSecretAccessKey: ""
    });

    const handleName = (e: any, name: string) => {
        let _state: any = { ...state }
        _state[name] = e.target.value;
        setState(_state);
    }

    useEffect(() => {
        console.log(props)
        if (props.data) {
            setState({
                name: props.data.terraformBackend?.name,
                workspaceId: props.data.workspace?.workspaceId,
                ownerId: props.data.owner?.userId,
                awsRegion: props.data?.awsRegion,
                awsAccessKey: props.data?.awsAccessKey,
                awsSecretAccessKey: props.data?.awsSecretAccessKey
            })
        }
    }, [])

    const handleSubmit = (e: any) => {
        e.preventDefault();
        console.log(props.data);
        if (props.data && props.data.stackId) {
            props.editStack(state);
        }
        else {
            props.addStack(state);
        }
    }

    // console.log(state)

    return (
        <>
            <br />
            <form onSubmit={handleSubmit}>
                <Row className="mb-3">
                    <Col md={12}>
                        <InputField
                            title="Enter Name"
                            type="text"
                            required={true}
                            placeholder="Name"
                            value={state.name}
                            onChange={(e: any) => handleName(e, 'name')}

                        />
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col md={12}>
                        <InputField
                            title="Select Workspace"
                            type="select"
                            required={true}
                            value={state.workspaceId}
                            onChange={(e: any) => handleName(e, 'workspaceId')}
                            options={props.allWorkspace}
                            optionLabel={"workspaceId"}
                            optionName={"workspaceName"}

                        />
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col md={6}>
                        <InputField
                            title="User"
                            type="select"
                            required={true}
                            value={state.ownerId}
                            onChange={(e: any) => handleName(e, 'ownerId')}
                            options={props.allUsers}
                            optionLabel={"userId"}
                            optionName={"userFirstName"}

                        />
                    </Col>
                    <Col md={6}>
                        <InputField
                            title="AWS Region"
                            type="select"
                            required={true}
                            value={state.awsRegion}
                            onChange={(e: any) => handleName(e, 'awsRegion')}
                            options={allRegion}
                            optionLabel={"name"}
                            optionName={"name"}

                        />
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col md={12}>
                        <InputField
                            title="Access Key"
                            type="password"
                            required={true}
                            placeholder="Access Key"
                            value={state.awsAccessKey}
                            onChange={(e: any) => handleName(e, 'awsAccessKey')}

                        />
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col md={12}>
                        <InputField
                            title="Secret Key"
                            type="password"
                            required={true}
                            placeholder="Secret Key"
                            value={state.awsSecretAccessKey}
                            onChange={(e: any) => handleName(e, 'awsSecretAccessKey')}

                        />
                    </Col>
                </Row>
                <Row>
                    <Col md={12} className="text-center">
                        <SubmitButton
                            title={"SAVE STACK"}
                        />
                    </Col>
                </Row>
            </form>
        </>
    )
}

export default AddModal;