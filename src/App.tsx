import React, {useMemo, useEffect, useState} from 'react';

import {Main} from './components/main';
import {Database} from "./util/database";
import styles from '../styles/Home.module.css'
import Head from 'next/head'
import {
    Container,
    Spacer,
    Input,
    Text
} from '@nextui-org/react'

import Footer from "./components/footer";

export const App = () => {
        const [database, setDatabase] = useState(new Database(null));

        useMemo(async () => {
            let SOURCE = 'data/ip-ranges.json';

            SOURCE = 'https://ip-ranges.amazonaws.com/ip-ranges.json';

            // Browser-only code.
            if (typeof window !== "undefined") {
                let response = await window.fetch(SOURCE);

                if (response.ok) {
                    let jsonContent = await response.json();

                    let result = new Database(jsonContent);

                    setDatabase(result);

                    return result;
                }
            }

            return null;
        }, [database]);

        // @ts-ignore
        return (
            <div className={styles.container}>
                <Head>
                    <title>Is it AWS?</title>
                    <meta name="description"
                          content="Tells if an IP Address belongs to AWS"/>
                    <link rel="icon" href="/favicon.ico"/>
                </Head>

                <Container as="main" display="flex" direction="column" justify="center" alignItems="center"
                           className="container-home">
                    <Spacer/>
                    <Main database={database}/>
                    <Footer/>
                </Container>
            </div>
        )
    }
;

export default App;
