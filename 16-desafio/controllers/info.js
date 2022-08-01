const { getInformationDisplay } = require('../services/info.js')

const info = (req, res) => {
    res.render("pages/info",getInformationDisplay());
}

module.exports = {
    info
}