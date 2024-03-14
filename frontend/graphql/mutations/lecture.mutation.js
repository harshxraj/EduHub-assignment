import { gql } from "@apollo/client";

export const CREATE_LECTURE = gql`
  mutation CreateLecture($input: CreateLectureInput!) {
    createLecture(input: $input) {
      _id
      name
      description
      course_code
      date
      start_time
      end_time
      comments {
        student_code
        comment
      }
      total_views
    }
  }
`;
