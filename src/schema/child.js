// eslint-disable-next-line
module.exports = () => [Child, Parent]; // ActionResult
// exporting Child and all its dependencies schemas.
// note export before require - this is needed for the apollo graphql-tools
//  to resolve cyclical refs.

//require dependencies schemas:
//const ActionResult = require('./actionResult'); 
const Parent = require('./parent');

//define Parent
//note the type Query / type Mutation declared as "extend" cause only once we will define without extend (Parent)

const Child = `
    # Child Model
    type Child {
      id: ID!
      name: String!
      parentId: ID!      
      parent: Parent
      createdAt: String!
    }

    # the input object definition for creating
    input ChildInput {      
      name: String!
      parentId: ID!      
    }
    
    # queries
    extend type Query {
      dummy: Int!      
    }

    # mutations
    extend type Mutation {        
      addChild( model: ChildInput! ): Child
    }
  `;
