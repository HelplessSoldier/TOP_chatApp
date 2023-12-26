function getCookieFromString(cookieString, name) {
  const cookiesArray = cookieString.split("; ");
  for (const cookie of cookiesArray) {
    const [cookieName, cookieValue] = cookie.split("=");
    if (cookieName === name) {
      return cookieValue;
    }
  }
  return null;
}

module.exports = getCookieFromString;
