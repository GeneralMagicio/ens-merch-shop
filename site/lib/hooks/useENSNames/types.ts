export interface ENSDomainsQueryResponse {
	domains: ENSDomain[];
}

export interface ENSDomain {
	id: string;
	name: string;
	labelName: string | null;
	labelhash: string | null;
	resolvedAddress: {
		id: string;
	} | null;
}
