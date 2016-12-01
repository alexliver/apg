var MobileDetect = require('mobile-detect');

let userAgent = null;
export function setUserAgent(_userAgent) {
  userAgent = _userAgent;
}

export const isMobile = () => {
  if (!userAgent)
    userAgent = eval('window').navigator.userAgent;
  let md = new MobileDetect(userAgent);
  if ( md.mobile())
    return true;
  return false;
}
