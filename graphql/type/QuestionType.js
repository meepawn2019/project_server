const {
  GraphQLID,
  GraphQLString,
  GraphQLList,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLNonNull,
  GraphQLType,
  GraphQLInt,
} = require("graphql");

const { GraphQLDate } = require("graphql-iso-date");

const UserType = require("./UserType");

const QuestionType = new GraphQLObjectType({
  name: "Question",
  fields: {
    id: { type: GraphQLID },
    topic: { type: GraphQLList(GraphQLString) },
    question: { type: GraphQLString },
    owner: { type: UserType },
    createAt: { type: GraphQLDate },
    updateAt: { type: GraphQLDate },
  },
});

module.exports = QuestionType;
