import dotenv from 'dotenv';
dotenv.config();
import App from './models/App.js';

const app = new App();
app.start();