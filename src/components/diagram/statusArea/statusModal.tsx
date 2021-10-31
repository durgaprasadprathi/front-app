import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import SingleStatus from './singleStatus';


const ModalStatus = (props: any) => {
    console.log(props.content);

    const checkData = () => {
        let message = [];
        if (props.content)
            message= props.content;
        else if (props.message) {
            props.message && props.message.map((m: any, i: any) => (
                message.push(
                    <SingleStatus
                        color={m.type}
                        title={m.text}
                        time={m.time}
                        content={m.content}
                    />
                )
            ))
        }

        return message;
    }

    return (
        <div>
            <Modal size="xl" isOpen={props.modal} toggle={props.toggle} >
                <ModalBody className="status-modal-body">
                    {checkData()}
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={props.toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default ModalStatus;
