
const resolvers = {
  Query: {
    dummy: () => 0,
  },
  Mutation: {
    addChild: (_, {model}, { data }) => data.addChild(model),
  },
  Child: {
    parent: (child, args, { loaders }) => loaders.parentsByIds.load(child.parentId),  //an example using the data loaders  
    //parent: (child, args, { data }) => data.getParentById(child.parentId),
  }
};
module.exports = resolvers;