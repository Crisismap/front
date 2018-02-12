import React, { Component } from 'react';
import { Grid, Row, Col, PageHeader } from 'react-bootstrap';
import { Input } from './Input';

class SearchPage extends Component {
    render() {
        console.log(Input);
        return (
            <Grid>
                <Row className="show-grid">
                    <Col xs={2} md={2}>
                    </Col>
                    <Col xs={8} md={8}>
                        <PageHeader>Logo</PageHeader>
                    </Col>
                    <Col xs={2} md={2}>
                    </Col>
                </Row>
                <Row className="show-grid">
                    <Col xs={2} md={2}>
                    </Col>
                    <Col xs={8} md={8}>
                        <Input placeholder="search"></Input>
                    </Col>
                    <Col xs={2} md={2}>
                    </Col>
                </Row>
                <Row className="show-grid">
                    <Col xs={2} md={2}>
                    </Col>
                    <Col xs={8} md={8}>
                    </Col>
                    <Col xs={2} md={2}>
                        call me
                    </Col>
                </Row>
            </Grid>
        )
    }
}

export default SearchPage;
