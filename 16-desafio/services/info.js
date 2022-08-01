const process = require('process');
const core = require('os');

const getInformationDisplay = () => {
    const info = {
        arguments:process.argv.slice(2),
        platform:process.platform,
        nodeVersion:process.version,
        memoryTotalReserved:process.memoryUsage().rss,
        execPath:process.execPath,
        pid:process.pid,
        proyectPath:process.cwd(),
        cantCpu:core.cpus().length,
    }

    return info;
}

module.exports = {
    getInformationDisplay
}