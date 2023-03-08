import graphql, {
  GraphQLBoolean,
  GraphQLInputObjectType,
  GraphQLList,
} from "graphql";
import _ from "lodash";

const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLInt } = graphql;

const subcourses = [
  {
    subcourseID: 1,
    subcoursenumber: 1,
    subcoursetitle: "introduction to guitar basic chords",
    maincourseID: 1,
  },
  {
    subcourseID: 2,
    subcoursenumber: 1,
    subcoursetitle: "introduction to piano basic chords",
    maincourseID: 2,
  },
  {
    subcourseID: 3,
    subcoursenumber: 2,
    subcoursetitle: "introduction to scales and arpegios",
    maincourseID: 2,
  },
  {
    subcourseID: 4,
    subcoursenumber: 3,
    subcoursetitle: "Signature and repertoire",
    maincourseID: 2,
  },
];
const subcoursecontents = [
  {
    id: 1,
    contenttitle: " sub content 1 in subcourse 1 of guitar class",
    subcourseID: 1,
    videourl: "url",
    videcaptions: "captions",
  },
  {
    id: 2,
    contenttitle: "sub content 1 in piano basic chords ",
    subcourseID: 2,
    videourl: "url",
    videcaptions: "captions",
  },
  {
    id: 3,
    contenttitle: "sub content 1 in subcourse scales",
    subcourseID: 3,
    videourl: "url",
    videcaptions: "captions",
  },
  {
    id: 4,
    contenttitle: "sub content 1 of sub course signature repertoire",
    subcourseID: 4,
    videourl: "url",
    videcaptions: "captions",
  },
  {
    id: 5,
    contenttitle: "sub content 2 of sub course signature repertoire",
    subcourseID: 4,
    videourl: "url",
    videcaptions: "captions",
  },
];

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
    courseID: { type: GraphQLID },
    coursename: { type: GraphQLString },
    enrolledstudents: { type: GraphQLInt },
    courseprice: { type: GraphQLInt },
    courseimage: { type: GraphQLString },
    // subcourseID: {
    //   type: new GraphQLList(subCoursesType),
    //   resolve: (parent, args) => {
    //     return _.filter(subcourses, { maincourseID: parent.courseID });
    //   },
    // },
  }),
});
export const subCoursesType = new GraphQLInputObjectType({
  name: "subcourses",
  fields: () => ({
    subcourseID: { type: GraphQLID },
    subcoursenumber: { type: GraphQLInt },
    subcoursetitle: { type: GraphQLString },
    // subcoursecontentID: {
    //   type: new GraphQLList(subcoursesContentType),
    //   resolve: (parent, args) => {
    //     return _.filter(subcoursecontents, { subcourseID: parent.subcourseID });
    //   },
    // },
  }),
});

export const subcoursesContentType = new GraphQLInputObjectType({
  name: "content",
  fields: () => ({
    id: { type: GraphQLID },
    contenttitle: { type: GraphQLString },
    subcourseID: { type: GraphQLID },
    // subcourse: {
    //   type: subCoursesType,
    //   resolve: (parent, args) => {
    //     return _.find(subcourses, { subcourseID: parent.subcourseID });
    //   },
    // },
    videourl: { type: GraphQLString },
    videcaptions: { type: GraphQLString },
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
