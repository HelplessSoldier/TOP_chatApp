export default function getCookie(cookieString, cookieName) {
  const cookies = cookieString.split(';');

  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i];
    const [name, value] = cookie.split('=');
    if (name === cookieName) {
      return cookie;
    }
  }
  return null;
}
