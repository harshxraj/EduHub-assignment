const courseTypeDef = `#graphql
  type Course{
    _id: ID!
    name: String!
    description: String!
    category: String!
    courseCode: String!
    total_students: Int
    prerequisites: [String!]! 
    students: [User]
  }

  type Query{
    courses: [Course!]
    course(courseId: ID!): Course
    allCourses: [Course!]!
  }

  type Mutation {
    createCourse(input: CreateCourseInput!): Course!
    updateCourse(input: UpdateCourseInput!): Course!
    deleteCourse(courseId:ID!): Course!
  }

  input CreateCourseInput {
    name: String!
    description: String!
    category: String!
    prerequisites: [String!]!
    courseCode: String!
  }

  input UpdateCourseInput {
    courseId: ID!
    description: String
    category: String
  }

`;

export default courseTypeDef;
