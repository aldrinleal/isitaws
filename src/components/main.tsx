import {Prefix, Database} from "../util/database";
import {ChangeEvent, FormEvent, FormEventHandler, useState} from "react";
import {Address4} from "ip-address";

export const Main = ({database}: { database: Database }) => {
    let [query, setQuery] = useState('');
    let [result, setResult] = useState(<div>No Result</div>);

    function modifyText(addrText: string) {
        setQuery(addrText);

        if (Address4.isValid(addrText)) {
            let filteredResults = database.getMatchingPrefixes(addrText);

            setResult(
                <span>
                <div>Look up results for address {addrText}</div>
                    {
                        filteredResults.map((match: Prefix) => {
                            return (
                                <div>{match.ip_prefix} belongs to region {match.region} for service {match.service} in
                                    border group {match.network_border_group}</div>)
                        })
                    }
                </span>
            );
        } else {
            setResult(<div/>);
        }
    }

    const onQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
        let addrText = event.target.value;

        modifyText(addrText);
    }

    const onSubmitRandom = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        let randomPrefix = database.getRandomPrefix()

        if (randomPrefix) {
            modifyText(randomPrefix.ip_prefix);
        }
    }

    return (
        <div className={"main"}>
            <h1>Amazon Web Services has {database.totalNumberOfHosts} hosts
                across {database.totalNumberOfIPv4Networks} distinct IPv4 networks</h1>
            <form onSubmit={onSubmitRandom}>
                <input type={"text"} name={"query"} placeholder={"Enter an IP Mask, or click to get a random one"}
                       value={query} onChange={onQueryChange}/>
                <input type={"submit"} name={"random"} value={"Random One"}/>
            </form>
            {result}
        </div>
    )
}