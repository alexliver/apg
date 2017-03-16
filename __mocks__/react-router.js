const reactrouter = jest.genMockFromModule('react-router');
reactrouter.browserHistory = {
  push: () => {},
};
module.exports = reactrouter;
