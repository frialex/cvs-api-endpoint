import express from 'express';
import movieHandler from './api/movie';
import 'dotenv/config';


if( !process.env.TMDB_API_KEY ){ throw new Error("TMDB_API_KEY is not set")}

const app = express();
const PORT = 3000;


app.use('/movie', movieHandler)


app.listen(PORT, () => { console.log(`Server is running on http://localhost:${PORT}`); })