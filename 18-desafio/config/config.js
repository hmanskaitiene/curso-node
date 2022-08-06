import dotenv from 'dotenv';
import argv from'./yargs.js';
dotenv.config();

export default {
  app: {
    persistence: argv.persistence ? argv.persistence : process.env.PERSISTENCE ? process.env.PERSISTENCE : 'FILE'
  },
};


