const { ApolloServer, gql } = require('apollo-server');
const express = require('express');

const typeDefs = gql`
    type Query {
        longestsubsequence(inputArr:[Int]): [Int]
    }
`;
const resolvers = {
    Query:{
        longestsubsequence:(_,{inputArr})=>{
            var result = [], temp = [];
            temp.push(inputArr[0]);
            inputArr.forEach(item => {
                if(item<=temp[temp.length-1]){
                    result = result.length < temp.length ? temp:result;
                    temp = [];                    
                }
                temp.push(item)
            });
            result = result.length < temp.length ? temp:result;

            return result
        }
    }
}
const server = new ApolloServer({typeDefs,resolvers});
// const app = express();
// server.applyMiddleware({app});
server.listen({port:4000},()=>
    console.log(`Server ready at http://localhost:4000${server.graphqlPath}`)
);
