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
const QuestionType = require("./QuestionType");

const CommentType = new GraphQLObjectType({
  name: "Comment",
  fields: {
    id: { type: GraphQLID },
    answer: { type: GraphQLString },
    like: { type: GraphQLList(UserType) },
    dislike: { type: GraphQLList(UserType) },
    initVote: { type: GraphQLInt },
    owner: { type: UserType },
    question: { type: QuestionType },
    createAt: { type: GraphQLDate },
    updateAt: { type: GraphQLDate },
  },
});

module.exports = CommentType;
