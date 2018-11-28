const express = require('express');
const expressGraphQL = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose')
// Create an express server and a GraphQl Endpoint

const app = express();

mongoose.connect('mongodb://Nagaraju:newlook581@ds151393.mlab.com:51393/lyricaldb',{useNewUrlParser:true});

mongoose.connection.once('open',() => {
    console.log('connected to database');
})

app.use('/graphql',expressGraphQL({
    schema,
    // rootValue: root,
    graphiql: true //used to make queries against our development servers
}))

app.listen(4001, () => {
    console.log('listing to  grpahql port '+ 4001);
})