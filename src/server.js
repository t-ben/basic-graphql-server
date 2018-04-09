const express = require('express');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const bodyParser = require('body-parser');

const Schema = require('./schema');
const data = require('./data');
const loaders = require('./data/loaders')(data);
const { examplesText } = require('./schema/graphiqlExamples');

const PORT = 3000;
const server = express();

const schemaFunction =
  Schema.schemaFunction ||
  function () {
    return Schema.schema;
  };
let schema;
const rootFunction =
  Schema.rootFunction ||
  function () {
    return schema.rootValue;
  };
const contextFunction =
  Schema.context ||
  function (headers, secrets) {
    return Object.assign(
      {
        headers: headers,
      },
      secrets
    );
  };

server.use('/graphql', bodyParser.json(), graphqlExpress(async (request) => {
  if (!schema) {
    schema = schemaFunction(process.env)
  }
  const context = await contextFunction(request.headers, process.env, loaders, data);
  const rootValue = await rootFunction(request.headers, process.env);

  return {
    schema: await schema,
    rootValue,
    context,
    // tracing: true, return tracing info for performance inspection
  };
}));

server.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql',
  query: examplesText, // plant in some text into the query pane
  // passHeader: `'auth-token': '${security.validToken}'`, example passing a security token for graphiql - consider exposing for dev/qa only
}));

server.listen(PORT, () => {
  console.log(`GraphQL Server is now running on http://localhost:${PORT}/graphql`);
  console.log(`View GraphiQL at http://localhost:${PORT}/graphiql`);
});