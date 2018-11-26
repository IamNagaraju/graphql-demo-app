const express = require('express');
const expressGraphQL = require('express-graphql');
const schema = require('./schema/schema');
// Create an express server and a GraphQl Endpoint

const app = express();
app.use('/graphql',expressGraphQL({
    schema,
    // rootValue: root,
    graphiql: true //used to make queries against our development servers
}))

app.listen(4000, () => {
    console.log('listing to  grpahql port '+ 4000);
})