import graphql, { GraphQLObjectType, GraphQLSchema } from "graphql";
import _ from "lodash";

import {
  allCourses,
  singleSession,
  getAUser,
  allSessions,
  allUsers,
} from "./queries.js";
import {
  subscribeSession,
  registerUser,
  deleteUser,
  loginUser,
  createCourse,
} from "./mutations.js";
//define query types,
const RootQuery = new GraphQLObjectType({
  name: "Rootquery",
  description: "This is the root query",
  fields: () => ({
    allCourses,
    singleSession,
    allSessions,
    allUsers,
    getAUser,
  }),
});

//define mutation type
const RootMutations = new GraphQLObjectType({
  name: "mutations",
  fields: {
    subscribeSession,
    registerUser,
    deleteUser,
    loginUser,
    createCourse,
  },
});

const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutations,
});
export default schema;
