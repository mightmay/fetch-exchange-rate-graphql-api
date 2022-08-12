//import function for fetching exchange rate from fixer.io
import {fetchExchangeRate} from "./getRateFromFixerIO";

//import requirement for express and graphql==============================
let express = require('express');
let { graphqlHTTP } = require('express-graphql');
let { buildSchema } = require('graphql');
//============================================================


//build the GraphQL schema==============================
const schema = buildSchema(`
    type Query {
        exchange_rate(exchange_from: String!, exchange_to: String!): String,
    }
`)
//============================================================

//define resolvers==============================
const getExchangeRate = async (args: { exchange_from: string, exchange_to: string }): Promise<String> => {
    var fetched_rate = await fetchExchangeRate(args.exchange_from, args.exchange_to).then(json_response => {
        json_response; // fetched exchange rate
        var exchange_rate = json_response.info.rate
        console.log(exchange_rate)
        return exchange_rate;
    }).catch(error => {
        return error.message;
    });
    return `The exchange rate from ${args.exchange_from} to ${args.exchange_to} is ${fetched_rate}`;

}

const root = {
    exchange_rate: getExchangeRate
    }
//============================================================


//define Express route and server==============================
const app = express()
app.use(
    "/graphql",
    graphqlHTTP({
        schema: schema,
        rootValue: root,
        graphiql: true,
    })
)

const PORT = 8000

app.listen(PORT)

console.log(`Running a GraphQL API server at http://localhost:${PORT}/graphql`)

//============================================================