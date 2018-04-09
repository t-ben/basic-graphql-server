// Welcome to Launchpad!
// Log in to edit and save pads, run queries in GraphiQL on the right.
// Click "Download" above to get a zip with a standalone Node.js server.
// See docs and examples at https://github.com/apollographql/awesome-launchpad

// graphql-tools combines a schema string with resolvers.
const { makeExecutableSchema } = require('graphql-tools');

// Construct a schema, using GraphQL schema language
const typeDefs = `
	# Parent Model
    type Parent {
      id: ID!
      name: String!      
      status: ParentStatus!      
      createdAt: String!
    }

    # the input object definition for creating
    input ParentInput {      
      name: String!      
    }

    enum ParentStatus {
      ACTIVE
      INACTIVE
    }    

    # queries
    type Query {
      # get all
      getAll: [Parent]        
      # get by id
      getById(id: ID!): Parent      
    }

    # user mutations
    type Mutation {        
      create( model: ParentInput! ): Parent!
    }
`;


// Provide resolver functions for your schema fields
const resolvers = {
  Query: {      
    getAll: (_, params, { data }) => {
      return [{
        id: '1',
        name: 'XYZ',
        status: 'ACTIVE',        
        createdAt: "2018-04-06T17:12:42.176Z",
      },{
        id: '2',
        name: 'ABC',
        status: 'ACTIVE',        
        createdAt: "2018-04-06T17:12:42.176Z",
      }];      
    },
    getById: (_, { id }, { data }) => {
      return {
        id: '2',
        name: 'ABC',
        status: 'ACTIVE',        
        createdAt: "2018-04-06T17:12:42.176Z",
      }
    },
  },
  Mutation: {
    create: (_, parentInput, { data }) => { 
      return {
        id: '2',
        name: 'ABC',
        status: 'ACTIVE',        
        createdAt: "2018-04-06T17:12:42.176Z",
      }
    },
  },  
};

// Required: Export the GraphQL.js schema object as "schema"
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

// Optional: Export a function to get context from the request. It accepts two
// parameters - headers (lowercased http headers) and secrets (secrets defined
// in secrets section). It must return an object (or a promise resolving to it).
const context = (headers, secrets) => {
  return {
    headers,
    secrets,
  };
};

module.exports = { schema, context };
// Optional: Export a root value to be passed during execution
// export const rootValue = {};

// Optional: Export a root function, that returns root to be passed
// during execution, accepting headers and secrets. It can return a
// promise. rootFunction takes precedence over rootValue.
// export function rootFunction(headers, secrets) {
//   return {
//     headers,
//     secrets,
//   };
// };
