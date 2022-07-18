const process = require('process');

const info = (req, res) => {

    const info = {
        arguments:process.argv.slice(2),
        platform:process.platform,
        nodeVersion:process.version,
        memoryTotalReserved:process.memoryUsage().rss,
        execPath:process.execPath,
        pid:process.pid,
        proyectPath:process.cwd()
    }

    res.render("pages/info",info);
}

module.exports = {
    info
}