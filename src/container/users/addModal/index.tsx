import { useState, useEffect } from 'react';
import { Col, Row, Button, Label, Input } from "reactstrap";
import InputField from "../../../components/UI/input";
import SubmitButton from "../../../components/UI/submitButton"
import countryCode from '../../../shared/json/countryCode.json';

var allDialCode = countryCode.slice(0);
allDialCode.sort(function (a: any, b: any) {
    return a.dial_code - b.dial_code;
});

//get country name
var allCountryName = countryCode.slice(0);
allCountryName.sort(function (a: any, b: any) {
    return a.name - b.name;
});

let allRoles = [{
    name: "Super User",

}, {
    name: "Roles 2",

}]


const AddModal = (props: any) => {

    const [state, setState] = useState({
        userName: "",
        firstName: "",
        lastName: "",
        password: "",
        emailId: "",
        countryCode: "+1",
        phoneNumber: "",
        address1: "",
        address2: "",
        country: "United States",
        organizationId: 1,
        roleId: 1
    });

    useEffect(() => {
        console.log(props)
        if (props.data) {
            setState({
                ...state,
                userName: props.data.userName,
                firstName: props.data.userFirstName,
                lastName: props.data.userLastName,
                password: "",
                countryCode: props.data.userCountryCode,
                phoneNumber: props.data.userPhoneNumber,
                address1: props.data.userAddress1,
                address2: props.data.userAddress2,
                country: props.data.userCountry,
                organizationId: props.data.userOrganization.organizationId,
                roleId: props.data.userRole.roleId,

            })
        }
    }, [])

    const handleName = (e: any, name: string) => {
        let _state: any = { ...state }
        _state[name] = e.target.value;
        setState(_state);
    }

    const handleSubmit = (e: any) => {
        e.preventDefault();
        console.log(props.data)
        if (props.data && props.data.userId) {
            let _state = { ...state };
            delete _state.userName
            props.editUsers(_state);
        }
        else {
            props.addUsers(state);
        }
    }

    return (
        <>
            <br />
            <form onSubmit={handleSubmit}>
                <Row className="mb-3">
                    <Col md={6}>
                        <InputField
                            title="First Name"
                            type="text"
                            required={true}
                            placeholder="First Name"
                            value={state.firstName}
                            onChange={(e: any) => handleName(e, 'firstName')}
                        />
                    </Col>
                    <Col md={6}>
                        <InputField
                            title="Last Name"
                            type="text"
                            required={true}
                            placeholder="Last Name"
                            value={state.lastName}
                            onChange={(e: any) => handleName(e, 'lastName')}

                        />
                    </Col>
                </Row>

                {
                    props.data && props.data.userId
                        ?
                        null
                        :
                        <>
                            <Row className="mb-3">
                                <Col md={12}>
                                    <InputField
                                        title="Email ID"
                                        type="email"
                                        required={true}
                                        placeholder="Email ID"
                                        value={state.userName}
                                        onChange={(e: any) => handleName(e, 'userName')}

                                    />
                                </Col>
                            </Row>
                            <Row className="mb-3">
                                <Col md={12}>
                                    <InputField
                                        title="Password"
                                        type="password"
                                        required={true}
                                        placeholder="Password"
                                        value={state.password}
                                        onChange={(e: any) => handleName(e, 'password')}

                                    />
                                </Col>
                            </Row>
                        </>

                }

                <Row className="mb-3">
                    <Col md={4}>
                        <InputField
                            title="Country Code"
                            type="select"
                            required={true}
                            value={state.countryCode}
                            onChange={(e: any) => handleName(e, 'countryCode')}
                            options={allDialCode}
                            optionLabel={"dial_code"}
                            optionName={"dial_code"}

                        />
                    </Col>
                    <Col md={8}>
                        <InputField
                            title="Mobile Number"
                            type="number"
                            required={true}
                            placeholder="Mobile Number"
                            value={state.phoneNumber}
                            onChange={(e: any) => handleName(e, 'phoneNumber')}

                        />
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Col md={12}>
                        <InputField
                            title="Address 1"
                            type="text"
                            required={true}
                            placeholder="Address 1"
                            value={state.address1}
                            onChange={(e: any) => handleName(e, 'address1')}

                        />
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Col md={12}>
                        <InputField
                            title="Address 2"
                            type="text"
                            required={true}
                            placeholder="Address 2"
                            value={state.address2}
                            onChange={(e: any) => handleName(e, 'address2')}

                        />
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Col md={12}>
                        <InputField
                            title="Country"
                            type="select"
                            required={true}
                            value={state.country}
                            onChange={(e: any) => handleName(e, 'country')}
                            options={allCountryName}
                            optionLabel={"name"}
                            optionName={"name"}

                        />
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Col md={12}>
                        <InputField
                            title="Organization"
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
                            title="Roles"
                            type="select"
                            required={true}
                            value={state.roleId}
                            onChange={(e: any) => handleName(e, 'roleId')}
                            options={allRoles}
                            optionLabel={"name"}
                            optionName={"name"}
                        />
                    </Col>
                </Row>
                <Row>
                    <SubmitButton
                        title={"SAVE USER"}
                    />
                </Row>
            </form>
        </>
    )
}

export default AddModal;