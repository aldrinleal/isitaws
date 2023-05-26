import React, { useMemo, useState } from "react";

import { Database } from "./util/database";
import Head from "next/head";
import { Container, Spacer } from "@nextui-org/react";

import Footer from "./components/footer";
import { IpLookupSection } from "./components/iplookup";

const SOURCE = "https://ip-ranges.amazonaws.com/ip-ranges.json";

const IpLookupApp = () => {
    const [database, setDatabase] = useState(new Database(null));

    useMemo(async () => {
        const SOURCE = 'https://ip-ranges.amazonaws.com/ip-ranges.json';

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
    }, []);

    // @ts-ignore
    return (
        <div className={"container-main"}>
            <Head>
                <title>Is it AWS?</title>
                <meta
                    name="description"
                    content="Tells if an IP Address belongs to AWS"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Container
                as="main"
                display="flex"
                direction="column"
                justify="center"
                alignItems="center"
                className="container-home"
            >
                <Spacer />
                <IpLookupSection database={database} />
                <Footer />
            </Container>
        </div>
    );
};

export default IpLookupApp;
