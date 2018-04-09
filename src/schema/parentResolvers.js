
const resolvers = {
  Query: {
    getAll: (_, params, { data }) => {
      return data.getAll();      
    },
    getById: (_, { id }, { data }) => {
      return data.getParentById(id);
    },
  },
  Mutation: {
    create: (_, parentInput, { data }) => { 
      return data.createParent(parentInput)           
    },
  },
  Parent: {
    //status: (user, args, { loaders }) => loaders.tenantsByIds.load(user.tenantId),  //an example using the data loaders  
    children: (currentObj, args, {data}) => {
      // resolve references:
      return data.getChildrenByParentId(currentObj.id);      
    }
  },
};
module.exports = resolvers;
