const userTypeDef = `#graphql
   type User{
    _id: ID!
    email: String!
    name: String!
    student_code: String
    password: String!
    role: String!
    courses: [Course]
   }

   type Query{
    authUser: User
    user(userId: ID): User!
   }

   type Mutation{
    signUp(input: SignUpInput!): User
    login(input: LoginInput!): User
    logout: LogoutResponse
   }

   input SignUpInput{
    email: String!
    name: String!
    password: String!
    courses: [ID!]!
   }

   input LoginInput{
    email: String!
    password: String!
   }

   type LogoutResponse {
    message: String!
   }

   input CourseInput {
    _id: ID!
     name: String!
     description: String!
     category: String!
     }

`;

export default userTypeDef;
