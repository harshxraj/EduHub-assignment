import { useMutation } from "@apollo/client";
import { LOGOUT } from "../graphql/mutations/user.mutation";

const [logout, { loading }] = useMutation(LOGOUT, {
  refetchQueries: ["GetAuthenticatedUser"],
});

export const handleLogout = async () => {
  try {
    await logout();
  } catch (err) {
    console.log(err);
  }
};
