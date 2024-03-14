const lectureTypeDef = `#graphql
type Lecture {
  _id: ID!
  name: String!
  description: String!
  course_code: ID! 
  course_name: String!
  date: String!
  start_time: String!
  end_time: String!
  zoom_link: String!
  comments: [Comment!]!
  total_views: Int!
  createdAt: String!
  updatedAt: String!
}

type Comment {
  student_code: ID!
  comment: String!
}

input LectureInput {
  name: String!
  description: String!
  course_code: ID!
  date: String!
  start_time: String!
  end_time: String!
  comments: [CommentInput!]
  total_views: Int
}

input CommentInput {
  student_code: ID!
  comment: String!
}

type Query {
  lectures: [Lecture!]!
  lecture(lectureId: ID!): Lecture
}

type Mutation {
  createLecture(input: CreateLectureInput!): Lecture!
  updateLecture(input: UpdateLectureInput!): Lecture!
  deleteLecture(lectureId: ID!): Lecture!
}

input CreateLectureInput {
  name: String!
  description: String!
  course_code: ID!
  course_name: String!
  date: String!
  start_time: String!
  end_time: String!
  zoom_link: String!
  comments: [CommentInput!]
  total_views: Int
}

input UpdateLectureInput {
  lectureId: ID!
  name: String
  description: String
  course_code: ID!
  course_name: String!
  date: String
  start_time: String
  end_time: String
  comments: [CommentInput]
  total_views: Int
}
`;

export default lectureTypeDef;
