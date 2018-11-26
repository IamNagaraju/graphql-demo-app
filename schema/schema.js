const { GraphQLObjectType ,GraphQLString,GraphQLInt ,GraphQLNonNull, GraphQLSchema, GraphQLList} = require('graphql');
// console.log(GraphQLObjectType ,GraphQLString,GraphQLInt , GraphQLSchema,'string')
// const _ = require('lodash');
// install json-server for db.json file
const axios = require('axios');

const BrandType = new GraphQLObjectType({
    name: 'Brand',
    fields: () => ({
        id:{type: GraphQLString},
        name: {type: GraphQLString},
        description: {type: GraphQLString},
        users: {
            type: new GraphQLList(UserType),
            resolve(parentValue,args) {
                return axios.get(`http://localhost:3000/brands/${parentValue.id}/users`).then(res => res.data)
            }
        }
    })
})

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: {type: GraphQLString}, 
        firstName: {type: GraphQLString},
        age: {type: GraphQLInt},
        brand: {
            type: BrandType,
            resolve(parentValue,args) {
                console.log(parentValue.brandId)// parentvalue will have user data
                return axios.get(`http://localhost:3000/brands/${parentValue.brandId}`).then(res => res.data)
            }
        } 
    })
})

// Static Data
// const users = [
//     {id:'1', firstName: 'rajasekhar', age: 25},
//     {id:'2', firstName: 'nagaraj', age: 24},
//     {id:'3', firstName: 'vinay', age: 19}
// ]

// Without using root it is difficult to find the data. Root query is the entry point into our application.
//to find the exact what we want 
const RootQuery = new GraphQLObjectType ({
    name: 'RootQueryType',
    fields: {
        user: {
            type: UserType,
            // args are the find the match data example is finding through id
            args: {id: {type:GraphQLString} },
            //resolve is used find the data which is passed in the args from database
            resolve(parentValue,args) {
                // return _.find(users, {id: args.id})  use for static data with lodash method
                return axios.get(`http://localhost:3000/users/${args.id}`).then(response => response.data)

            }
        },
        brand: {
            type: BrandType,
            // args are the find the match data example is finding through id
            args: {id: {type:GraphQLString} },
            //resolve is used find the data which is passed in the args from database
            resolve(parentValue,args) {
                // return _.find(users, {id: args.id})  use for static data with lodash method
                return axios.get(`http://localhost:3000/brands/${args.id}`).then(response => response.data)

            }
        }
    }
})


const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addUser: {
            type: UserType,
            args: {
                firstName: { type: new GraphQLNonNull(GraphQLString) },
                age: {type: new GraphQLNonNull(GraphQLInt)},
                brandId: { type: GraphQLString}
            },
            resolve(parentValue, { firstName , age }) {
                return axios.post('http://localhost:3000/users', { firstName , age }).then(res => res.data)
            }
        }
    }
})

module.exports  = new GraphQLSchema({
    query: RootQuery,
    mutation
})