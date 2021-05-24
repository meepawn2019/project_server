const {
  GraphQLID,
  GraphQLString,
  GraphQLList,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLNonNull,
  GraphQLType,
} = require("graphql");

const { GraphQLDate } = require("graphql-iso-date");
const UserType = require("./UserType");
const QuestionType = require("./QuestionType");

const ReportQuestionType = new GraphQLObjectType({
  name: "ReportQuestion",
  fields: {
    id: { type: GraphQLID },
    sender: { type: UserType },
    reportQuestion: { type: QuestionType },
    content: { type: GraphQLString },
    status: { type: GraphQLString },
    createAt: { type: GraphQLDate },
    updateAt: { type: GraphQLDate },
  },
});

module.exports = ReportQuestionType;
