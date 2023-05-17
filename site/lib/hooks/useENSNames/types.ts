export interface ENSDomainsQueryResponse {
  domains: {
    id: string
    name: string
    labelName: string | null
    labelhash: string | null
    resolvedAddress: {
      id: string
    } | null
  }[]
}
