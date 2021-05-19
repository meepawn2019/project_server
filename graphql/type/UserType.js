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
    id: { type: GraphQLID },
    userName: { type: GraphQLString },
    avatar: { type: GraphQLString },
    bio: { type: GraphQLString },
    friend: { type: GraphQLList(GraphQLID) },
    gender: { type: GraphQLString },
    password: { type: GraphQLString },
    email: { type: GraphQLString },
    banStatus: { type: GraphQLBoolean },
    role: { type: GraphQLString },
    createAt: { type: GraphQLDate },
    updateAt: { type: GraphQLDate },
  },
});

module.exports = UserType;
