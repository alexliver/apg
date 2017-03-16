const util = jest.genMockFromModule('../util.jsx');

let _isMobile = false;

util.setMobile = (isMobile) => {
  _isMobile = isMobile;
};

util.isMobile = () => {
  return _isMobile;
};

//export default util;
module.exports = util;
