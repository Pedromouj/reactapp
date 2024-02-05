import { decodeToken } from "react-jwt";
import Token from "../Tools/Token";
const UsersInfo = decodeToken(Token);
export default UsersInfo;
