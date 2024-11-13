import express from 'express';

const TMDB_API_KEY = process.env.TMDB_API_KEY;
if(!TMDB_API_KEY){ throw new Error("TMDB_API_KEY is not set")}

const app = express();
const PORT = 3000;

app.use('/movie', function(req, res){ res.status(200).json({test: "testing"}) })

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
})