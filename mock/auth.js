
var authObj = {
    pageOneAdd:true,
    pageOneEdit:true,
    pageOneDelete:true
}

module.exports = {
    getAuthData: () => {
        return authObj;
    }
};
