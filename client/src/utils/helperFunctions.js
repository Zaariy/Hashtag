export function decodeJWTtoken(jwtToken) {
  // Name of function tell you what this function do :)
  return JSON.parse(
    atob(jwtToken.slice(jwtToken.indexOf(".") + 1, jwtToken.indexOf(".", 37)))
  );
}
