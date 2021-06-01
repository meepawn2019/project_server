const {
  GraphQLID,
  GraphQLString,
  GraphQLList,
  GraphQLType,
  GraphQLSchema,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLBoolean,
} = require("graphql");

const { GraphQLDate } = require("graphql-iso-date");

const UserType = new GraphQLObjectType({
  name: "User",
  fields: {
    _id: { type: GraphQLString },
    userName: { type: GraphQLString },
    avatar: { type: GraphQLString },
    bio: { type: GraphQLString },
    friend: { type: GraphQLList(GraphQLID) },
    gender: { type: GraphQLString },
    birth: { type: GraphQLDate },
    email: { type: GraphQLString },
    banStatus: { type: GraphQLBoolean },
    role: { type: GraphQLString },
    createAt: { type: GraphQLDate },
  },
});

module.exports = UserType;
