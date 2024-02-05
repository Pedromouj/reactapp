import { isExpired } from "react-jwt";

const Token = localStorage.getItem("token");

// if (isExpired(Token)) {
//   window.location.href = "/login";
// }

export default Token;
