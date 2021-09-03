import React, {useEffect, useState} from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';

import {Main} from './components/main';
import {Header} from './components/header';
import {Footer} from './components/footer';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {Database} from "./util/database";

export const App = () => {
    const [database, setDatabase] = useState(new Database(null));

    useEffect(() => {
        (async function whatever() {
            let SOURCE = 'data/ip-ranges.json';

            SOURCE = 'https://ip-ranges.amazonaws.com/ip-ranges.json';

            let response = await window.fetch(SOURCE);

            if (response.ok) {
                let jsonContent = await response.json();

                setDatabase(new Database(jsonContent));
            } else {
                console.log("FUDEU");
                setDatabase(new Database(null));
            }
        })();
    }, [database])

    return (
        <div>
            <Container fluid={"md"}>
                <Row>
                    <Col xs={12}>
                        <Header/>
                    </Col>
                </Row>
            </Container>
            <br/>
            <Container fluid={"md"}>
                <Row>
                    <Col xs={6}>
                        <Main database={database}/>
                    </Col>
                </Row>
            </Container>
            <br/>
            <Container fluid={"md"}>
                <Row>
                    <Col xs={12}>
                        <Footer/>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default App;