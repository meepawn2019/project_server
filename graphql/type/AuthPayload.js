const { GraphQLString, GraphQLObjectType } = require("graphql");

const UserType = require("./UserType");

const AuthPayloadType = new GraphQLObjectType({
  name: "AuthPayload",
  fields: {
    user: { type: UserType },
    token: { type: GraphQLString },
  },
});

module.exports = AuthPayloadType;
