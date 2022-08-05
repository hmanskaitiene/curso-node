import process from 'process';
import core from 'os';

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

export {
    getInformationDisplay
}