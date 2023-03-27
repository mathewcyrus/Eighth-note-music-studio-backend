import graphql, { GraphQLObjectType, GraphQLSchema } from "graphql";
import _ from "lodash";

import {
  getAllCourses,
  getAsingleCourse,
  getAllSubCourses,
  getAllSubCoursesContent,
  getAsingleSubCourse,
  getAsingleSubCourseContent,
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
  createSubCourse,
  deleteCourse,
  createSubCourseContent,
} from "./mutations.js";
//define query types,
const RootQuery = new GraphQLObjectType({
  name: "Rootquery",
  description: "This is the root query",
  fields: () => ({
    getAllCourses,
    singleSession,
    getAsingleCourse,
    allSessions,
    getAllSubCourses,
    getAllSubCoursesContent,
    getAsingleSubCourse,
    getAsingleSubCourseContent,
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
    deleteCourse,
    loginUser,
    createCourse,
    createSubCourse,
    createSubCourseContent,
  },
});

const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutations,
});
export default schema;
