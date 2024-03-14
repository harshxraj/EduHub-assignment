import { gql } from "@apollo/client";

export const GET_LECTURES = gql`
  query GetLectures {
    lectures {
      _id
      course_code
      course_name
      name
      total_views
      updatedAt
      start_time
      end_time
      description
      date
      createdAt
      comments {
        student_code
        comment
      }
    }
  }
`;
