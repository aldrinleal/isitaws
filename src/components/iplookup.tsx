import { Database, Prefix } from "../util/database";
import { ChangeEvent, FormEvent, useState } from "react";
import { Address4 } from "ip-address";
import { Spacer, Button, Input, Text, FormElement } from "@nextui-org/react";

export const Summary = ({ database }: { database: Database }) => {
  return (
    <Text>
      Amazon Web Services has {database.totalNumberOfHosts} hosts across{" "}
      {database.totalNumberOfIPv4Networks} distinct IPv4 networks
    </Text>
  );
};

export const IpLookupSection = ({ database }: { database: Database }) => {
  let [query, setQuery] = useState("");
  let [result, setResult] = useState(<div>No Results</div>);

  function modifyText(addrText: string) {
    setQuery(addrText);

    if (Address4.isValid(addrText)) {
      let filteredResults = database.getMatchingPrefixes(addrText);

      setResult(
        <span>
          <Text>Look up results for address {addrText}:</Text>
          <Spacer y={1} />
          {filteredResults.map((match: Prefix) => {
            return (
              <Text>
                {match.ip_prefix} belongs to region {match.region} for service{" "}
                {match.service} in border group {match.network_border_group}
              </Text>
            );
          })}
          <Spacer y={1} />
        </span>
      );
    } else {
      setResult(<div />);
    }
  }

  const onQueryChange = (event: ChangeEvent<FormElement>) => {
    let addrText = event.target.value;

    modifyText(addrText);
  };

  const onRandom = (event: FormEvent<HTMLButtonElement>) => {
    let randomPrefix = database.getRandomPrefix();

    if (randomPrefix) {
      modifyText(randomPrefix.ip_prefix);
    }
  };

  // @ts-ignore
  return (
    <div className={"main"}>
      <Summary database={database} />
      <Spacer y={0.5} />
      <Input
        clearable
        type={"text"}
        name={"query"}
        placeholder={"IP Mask, or get a random one"}
        value={query}
        label="IP Mask or Address"
        onChange={onQueryChange}
      />
      <Button onClick={onRandom}>Gimme a Random One</Button>
      <Spacer y={0.5} />
      <div>{result}</div>
      <Spacer y={0.5} />
    </div>
  );
};
