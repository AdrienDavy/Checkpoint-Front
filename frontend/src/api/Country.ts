import { gql } from "../gql";

export const queryCountry = gql(`
query Country($code: String!) {
  country(code: $code) {
    id
    name
    emoji
    code
    continent {
      id
      name
    }
  }
}
`);
