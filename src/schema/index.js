// This example demonstrates a simple server

// Read the complete docs for graphql-tools here:
// http://dev.apollodata.com/tools/graphql-tools/generate-schema.html

/* eslint-disable arrow-parens */
/* eslint-disable arrow-body-style */
const parentSchema = require('./parent');
const parentResolvers = require('./parentResolvers');
const childSchema = require('./child');
const childResolvers = require('./childResolvers');
const actionResultSchema = require('./actionResult');

const { merge } = require('lodash');

const { makeExecutableSchema, addMockFunctionsToSchema } = require('graphql-tools');

const mergedResolvers = merge(parentResolvers, childResolvers);

const types = [parentSchema, childSchema, actionResultSchema];
const schema = makeExecutableSchema({
  typeDefs: types,
  resolvers: mergedResolvers, //for mocks - remark this and no need for all resolvers/data
});
//addMockFunctionsToSchema({schema}); //for mocks - unremark this

// Optional: Export a function to get context from the request. It accepts two
// parameters - headers (lowercased http headers) and secrets (secrets defined
// in secrets section). It must return an object (or a Promise resolving to it).
const context = (headers, secrets, loaders, data) => {
  return {
    headers,
    secrets,
    loaders,
    data,    
  };
};
module.exports = { schema, context };

/* eslint-enable arrow-parens */
/* eslint-enable arrow-body-style */
