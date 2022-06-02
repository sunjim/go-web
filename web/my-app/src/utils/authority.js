import cookie from 'js-cookie';

// use localStorage to store the authority info, which might be sent from server in actual project.
export function getAuthority(str) {
  // return localStorage.getItem('044764D63228EBD3') || ['admin', 'user'];
  const authorityString =
    typeof str === 'undefined' ? localStorage.getItem('044764D63228EBD3') : str;
  // authorityString could be admin, "admin", ["admin"]
  let authority;
  try {
    authority = JSON.parse(authorityString);
  } catch (e) {
    authority = authorityString;
  }
  if (typeof authority === 'string') {
    return [authority];
  }
  return authority || ['admin'];
}

export function setAuthorityToken(token) {
  if (token) {
    cookie.set('token', token, { expires: 1 });
  }
}

export function setCurrentUserName(name) {
  return localStorage.setItem('username', name);
}

export function setAuthority(authority) {
  let authorityArray = [];
  if (authority) {
    if (Array.isArray(authority)) {
      authorityArray = authority.map(item => item.authority);
    } else {
      authorityArray.push(authority);
    }
  } else {
    setAuthorityToken();
    setCurrentUserName();
  }
  return localStorage.setItem('044764D63228EBD3', JSON.stringify(authorityArray));
}

export function getAccessToken() {
  const token = cookie.get('token');
  if (token) {
    return JSON.parse(token).access_token;
  }
  setAuthorityToken();
  return null;
}

export function getRefreshToken() {
  const token = cookie.get('token');
  return token ? JSON.parse(token).refresh_token : null;
}

export function getCurrentUserName() {
  return localStorage.getItem('username');
}
