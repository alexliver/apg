
export function mockSessionStorage() {
  let storage = {};
  global.sessionStorage = {};
  global.sessionStorage.setItem = (key, val) => {
    storage[key] = val;
  };
  global.sessionStorage.getItem = (key) => storage[key];
  global.sessionStorage.removeItem = (key) => {
    storage[key] = null;
  };
}
