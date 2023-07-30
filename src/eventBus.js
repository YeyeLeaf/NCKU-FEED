import { ref } from 'vue';

export const isLogining = ref(false);

export function changeNavbar() {
  isLogining.value = !isLogining.value;
}
export function setJwtToCookie(jwtToken, expirationDays) {
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + expirationDays);

  // 将 JWT 存储到 Cookie，使用 'jwtToken' 作为 Cookie 名称
  document.cookie = `jwtToken=${jwtToken}; expires=${expirationDate.toUTCString()}; path=/`;
}
export function getJwtFromCookie() {
  const cookies = document.cookie.split('; ').reduce((acc, cookie) => {
    const [cookieName, cookieValue] = cookie.split('=');
    acc[cookieName] = cookieValue;
    return acc;
  }, {});

  return cookies.jwtToken;
}
