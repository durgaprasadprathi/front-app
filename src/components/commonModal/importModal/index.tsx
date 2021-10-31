import { useState } from "react";
import { Row, Col } from "reactstrap"
import ModalLayout from "../../UI/modalLayout";
import "./styles.scss";

const CommonModal = (props: any) => {

    console.log(props)

    const [file, setFile] = useState<any>('')

    const handleSubmit = (e: any) => {
        e.preventDefault();
        props.import(file)
    }

    console.log(file)

    return (
        <>
            <ModalLayout
                modal={props.modal}
                toggle={props.toggle}
                title={props.title}
            >
                <div className="import">
                    <form onSubmit={handleSubmit}>
                        <Row>
                            <Col md={12} className="mb-3 mt-2">
                                Please select a file to import.
                            </Col>
                            <Col md={9}>
                                <input 
                                    className="form-control" 
                                    type="file" 
                                    required={true}
                                    onChange={(e) => setFile(e.target.files[0])}
                                />
                            </Col>
                            <Col md={3}>
                                <button className="btn btn-primary" type="submit">Submit</button>
                            </Col>

                            <Col md={12} className="mb-2 mt-4 download-sample">
                                Download sample file
                            </Col>
                        </Row>
                    </form>
                </div>

            </ModalLayout>
        </>
    )
}

export default CommonModal;