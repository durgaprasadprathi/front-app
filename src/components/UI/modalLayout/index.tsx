import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const ModalLayout = (props: any) => {
    return (
        <div>
            <Modal size="md" isOpen={props.modal} toggle={props.toggle} >
                <ModalHeader toggle={props.toggle}>{props.title}</ModalHeader>
                <ModalBody>
                    {props.children}
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={props.toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
    );

}

export default ModalLayout;
