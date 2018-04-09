// eslint-disable-next-line
module.exports = () => [Parent, Child]; //ActionResult
// exporting Parent and all its dependencies schemas.
// note export before require - this is needed for the apollo graphql-tools
//  to resolve cyclical refs.

//require dependencies schemas:
//const ActionResult = require('./actionResult'); 
const Child = require('./child');

//define parent type
//note the type Query / type Mutation declared only once without "extend" (Parent in this case, it doesnt matter what model).
const Parent = `
    # Parent Model
    type Parent {
      id: ID!
      name: String!      
      status: ParentStatus!
      children: [Child]
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
