import React from 'react';
import { Row, Col, Card, CardBody, CardTitle, Container } from "reactstrap";

const Layout = (props: any) => {
    return (
        <>
            <Row style={{minHeight: '80vh'}}>
                <Col lg={12}>
                    <Card>
                        <CardBody>
                            {props.children}
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default Layout;