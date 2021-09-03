import {Address4} from "ip-address";

export interface Prefix {
    ip_prefix: string;
    region: string;
    service: string;
    network_border_group: string;
}

export interface Ipv6Prefixes {
    ipv6_prefix: string;
    region: string;
    service: string;
    network_border_group: string;
}

export interface IpRanges {
    syncToken: string;
    createDate: string;
    prefixes: Prefix[];
    ipv6_prefixes: Ipv6Prefixes[];
}

export class Database {
    private readonly ipRanges?: IpRanges;

    private readonly _totalNumberOfHosts?: number = 0;

    private readonly _totalNumberOfIPv4Networks?: number = 0;

    constructor(ipRanges?: IpRanges | null) {
        if (ipRanges) {
            this.ipRanges = ipRanges;
        }

        if (this.ipRanges) {
            let total = 0;

            if (this.ipRanges) {
                this._totalNumberOfIPv4Networks = this.ipRanges.prefixes.length;

                for (let r of this.ipRanges.prefixes) {
                    let [, prefix_len_str] = r.ip_prefix.split("/", 2)

                    let prefix_len = parseInt(prefix_len_str);

                    total += this.getNoOfHostsPerPrefix(prefix_len);
                }
            }

            this._totalNumberOfHosts = total;
        }
    }

    getMatchingPrefixes(addr: string): Prefix[] {
        let ipv4Addr = new Address4(addr);

        let result: Prefix[] = this.ipRanges?.prefixes.filter(prefix => {
            let range = new Address4(prefix.ip_prefix);

            let containsP = ipv4Addr.isInSubnet(range);

            return containsP;
        }) ?? [] as Prefix[];

        return result;
    }


    get totalNumberOfHosts(): number {
        return this._totalNumberOfHosts || 0;
    }

    get totalNumberOfIPv4Networks(): number {
        return this._totalNumberOfIPv4Networks || 0;
    }

    private getNoOfHostsPerPrefix(prefix_len: number) {
        return (2 ** (32 - prefix_len)) - 2;
    }

    static fromString(s: string): Database {
        let data = JSON.parse(s) as IpRanges;

        return new Database(data);
    }

    toString(): string {
        return JSON.stringify(this.ipRanges);
    }
}