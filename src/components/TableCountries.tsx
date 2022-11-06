import {useState} from "react";
import {ApolloClient, InMemoryCache, gql, useQuery} from '@apollo/client';
import "./TableCountris.css"

// initialize a GraphQL client
const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: 'https://countries.trevorblades.com'
});

// GraphQL query that asks for names and codes for all countries
const LIST_COUNTRIES = gql`
  {
    countries {
      name
      code
    }
  }
`;

interface Country {
    name: string;
    code: string;
}

function TableCountries() {
    const {data, loading, error} = useQuery(LIST_COUNTRIES, {client});
    const [filterText, setFilterText] = useState("");

    if (loading || error) {
        return <p>{error ? error.message : 'Loading...'}</p>;
    }
    return (
        <>
            <table className='ui-table'>
                <tr>
                    <th>Country Name</th>
                    <th>Country Code <input data-testid='input-c-code' className='ui-table__input' placeholder='Filter' maxLength={2} onChange={(event => {
                        setFilterText(event.target.value)
                    })}/></th>
                </tr>
                {data.countries.filter((country:Country) => {
                    if (filterText === "") {
                        return country
                    } else if (country.code.toLowerCase().includes(filterText.toLowerCase())) {
                        return country
                    }
                }).map((country:Country) => (
                    <tr key={country.code}>
                        <td>{country.name}</td>
                        <td data-testid={country.code}>{country.code}</td>
                    </tr>
                ))}
            </table>
        </>
    )
}

export default TableCountries
