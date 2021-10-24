import { useState, useEffect } from 'react';
import { Col, Row } from "reactstrap";
import InputField from "../../../components/UI/input";
import SubmitButton from "../../../components/UI/submitButton"

const AddModal = (props: any) => {

    const [state, setState] = useState({
        ownerId: 1,
        organizationId: 1,
        name: "",
    });


    const [allName, setAllName] = useState([])

    useEffect(() => {
        let _allName:any = [];
        if(props.allUsers && props.allUsers.length > 0){
            props.allUsers.forEach((u:any, i:any) =>{
                _allName.push({
                    id:u.userId,
                    name:u.userFirstName+" "+u.userLastName+" ("+u.userName+")"
                })
            })
            setAllName(_allName)
        }

    }, [props.allUsers])


    const handleName = (e: any, name: string) => {
        let _state: any = { ...state }
        _state[name] = e.target.value;
        setState(_state);
    }

    useEffect(() => {
        // console.log(props)
        if (props.data) {
            setState({
                name: props.data.workspaceName,
                organizationId: props.data.organization?.organizationId,
                ownerId: props.data.owner?.userId,
            })
        }
    }, [])

    const handleSubmit = (e: any) => {
        e.preventDefault();
        // console.log(props.data);
        if (props.data && props.data.workspaceId) {
            props.editWorkspace(state);
        }
        else {
            props.addWorkspace(state);
        }
    }

    console.log(props.allUsers)

    return (
        <>
            <br />
            <form onSubmit={handleSubmit}>
                <Row className="mb-3">
                    <Col md={12}>
                        <InputField
                            title="Enter Workspace Name"
                            type="text"
                            required={true}
                            placeholder="Workspace Name"
                            value={state.name}
                            onChange={(e: any) => handleName(e, 'name')}

                        />
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col md={12}>
                        <InputField
                            title="Select Organization"
                            type="select"
                            required={true}
                            value={state.organizationId}
                            onChange={(e: any) => handleName(e, 'organizationId')}
                            options={props.allOrganizations}
                            optionLabel={"organizationId"}
                            optionName={"organizationName"}

                        />
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col md={12}>
                        <InputField
                            title="Select User"
                            type="select"
                            required={true}
                            value={state.ownerId}
                            onChange={(e: any) => handleName(e, 'ownerId')}
                            options={allName}
                            optionLabel={"id"}
                            optionName={"name"}

                        />
                    </Col>
                </Row>
                <Row>
                    <Col md={12} className="text-center">
                        <SubmitButton
                            title={"SAVE WORKSPACE"}
                        />
                    </Col>
                </Row>
            </form>
        </>
    )
}

export default AddModal;