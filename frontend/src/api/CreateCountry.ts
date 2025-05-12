import { gql } from "../gql";

export const createCountry = gql(`
mutation AddCountry($data: NewCountryInput!) {
  addCountry(data: $data) {
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
