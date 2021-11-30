import { combineReducers } from "redux";
import authUser from "../Reducers/authUser";
import questions from "../Reducers/questions";
import users from "../Reducers/users";

export default combineReducers({
  authUser,
  questions,
  users,
});
