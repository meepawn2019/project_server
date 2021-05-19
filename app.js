const Express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { ApolloServer, gql } = require("apollo-server-express");

const mongoose = require("mongoose");
const schema = require("./graphql/schema");
const jwt = require("express-jwt");
const bodyParser = require("body-parser");

var app = Express();
var cors = require("cors");

const {
  GraphQLID,
  GraphQLString,
  GraphQLList,
  GraphQLType,
  GraphQLSchema,
  GraphQLNonNull,
  GraphQLObjectType,
} = require("graphql");
var cors = require("cors");

async function startServer() {
  app.use(cors());
  mongoose
    .connect("mongodb://localhost:27017/hoovada", { useNewUrlParser: true })
    .then(() => {
      console.log("Connect to database");
    })
    .catch((err) => {
      console.log(err);
    });

  const auth = jwt({
    secret: "Graphql_Hoova",
    credentialsRequired: false,
    algorithms: ["HS256"],
  });
  app.use(auth);

  const server = new ApolloServer({
    schema,
    context: ({ req }) => {
      // Note: This example uses the `req` argument to access headers,
      // but the arguments received by `context` vary by integration.
      // This means they vary for Express, Koa, Lambda, etc.
      //
      // To find out the correct arguments for a specific integration,
      // see https://www.apollographql.com/docs/apollo-server/api/apollo-server/#middleware-specific-context-fields

      // Get the user token from the headers.
      const token = req.headers.authorization || "";
      // Try to retrieve a user with the token
      const user = req.user;

      // // Add the user to the context
      return { user };
    },
  });
  await server.start();
  server.applyMiddleware({ app });

  await new Promise((resolve) => app.listen({ port: 3001 }, resolve));
  console.log(`🚀 Server ready at http://localhost:3001${server.graphqlPath}`);
  return { server, app };
}
// app.use(
//   "/person",
//   auth,
//   graphqlHTTP((req) => ({
//     schema,
//     graphiql: true,
//     context: { user: req.userId },
//   }))
// );

// app.listen(3001, () => {
//   console.log("server running at 3001");
// });

startServer();
