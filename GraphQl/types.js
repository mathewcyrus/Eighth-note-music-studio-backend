import graphql, {
  GraphQLBoolean,
  GraphQLInputObjectType,
  GraphQLList,
} from "graphql";
import SubCourse from "../Models/SubCourse.js";

import _ from "lodash";
import Course from "../Models/Course.js";
import SubCoursecontent from "../Models/SubCoursecontent.js";

const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLInt } = graphql;

// defines studio sessions which include video, music or photo session
export const StudioSessionType = new GraphQLObjectType({
  name: "StudioSession",
  fields: () => ({
    id: { type: GraphQLID },
    sessiontype: { type: GraphQLString },
    startTime: { type: GraphQLString },
    endTime: { type: GraphQLString },
    cost: { type: GraphQLInt },
  }),
});

export const CourseType = new GraphQLObjectType({
  name: "course",
  description: "defines a course",
  fields: () => ({
    id: { type: GraphQLID },
    coursename: { type: GraphQLString },
    enrolledstudents: { type: GraphQLInt },
    courseprice: { type: GraphQLInt },
    courseimage: { type: GraphQLString },
    subcourses: {
      type: new GraphQLList(subCoursesType),
      async resolve(parents, args) {
        try {
          const res = await SubCourse.find({ maincourseID: parents.id });
          return res;
        } catch (error) {
          console.log(error);
        }
      },
    },
  }),
});
export const subCoursesType = new GraphQLObjectType({
  name: "subcourses",
  fields: () => ({
    id: { type: GraphQLID },
    subcoursenumber: { type: GraphQLInt },
    subcoursetitle: { type: GraphQLString },
    maincourse: {
      type: CourseType,
      async resolve(parents, args) {
        return await Course.findById(parents.maincourseID);
      },
    },
    subcourseContents: {
      type: new GraphQLList(subcoursesContentType),
      async resolve(parents, args) {
        return await SubCoursecontent.find({
          subcourseID: parents.id,
        });
      },
    },
  }),
});

export const subcoursesContentType = new GraphQLObjectType({
  name: "content",
  fields: () => ({
    id: { type: GraphQLID },
    contenttitle: { type: GraphQLString },
    videourl: { type: GraphQLString },
    videocaptions: { type: GraphQLString },
    subCourse: {
      type: subCoursesType,
      async resolve(parents, args) {
        return await SubCourse.findById(parents.subcourseID);
      },
    },
  }),
});

// Defines a user: admin,student or customer
export const UserType = new GraphQLObjectType({
  name: "user",
  description: "shows properties of a user",
  fields: () => ({
    id: { type: GraphQLID },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    username: { type: GraphQLString },
    isAdmin: { type: GraphQLBoolean },
    isStudent: { type: GraphQLBoolean },
  }),
});
