import React from "react";
import { Row, Col, Container } from "reactstrap";

const Footer = () => {

    const style= {
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    }

    return (
        <React.Fragment>
            <footer className="footer">
                <Container fluid>
                    <Row>
                        <Col sm={12} style={style}>
                            © {new Date().getFullYear()} appmodz private limited V1.0
                            </Col>
                        {/* <Col sm={6}>
                            <div className="text-sm-end d-none d-sm-block">
                                Crafted with <i className="mdi mdi-heart text-danger"></i> by Themesdesign
                                </div>
                        </Col> */}
                    </Row>
                </Container>
            </footer>
        </React.Fragment>
    );
};

export default Footer;
