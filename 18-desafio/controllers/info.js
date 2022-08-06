import { getInformationDisplay } from '../services/info.js';

const info = (req, res) => {
    res.render("pages/info",getInformationDisplay());
}

export {
    info
}