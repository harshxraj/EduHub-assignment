import { gql } from "@apollo/client";

export const GET_COURSES = gql`
  query GetCourses {
    courses {
      _id
      name
      description
      category
      courseCode
      total_students
      prerequisites
    }
  }
`;

export const GET_ALL_COURSES = gql`
  query GetAllCourses {
    allCourses {
      _id
      name
      description
      category
      courseCode
      total_students
      prerequisites
    }
  }
`;
