import { Request, Response } from 'express';
import tmdb_api from '../services/TheMovieDatabase';


export default async function(req: Request, res: Response){ 
    const { year } = req.query;

    if(!year){
        return res.status(400).json({ error: 'Year is required' });
    }

    const data = await tmdb_api(year as string); 
    res.status(200).json(data) 
}