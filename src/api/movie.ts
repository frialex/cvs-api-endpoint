import { Request, Response } from 'express';
import tmdb_api from '../services/TheMovieDatabase';


export default async function(req: Request, res: Response){ 
    const { year } = req.query;

    if(!year){
        return res.status(400).json({ error: 'Year is required' });
    }

    // res.status(200).json({test: `testing ${year}`}) 
    
    //TODO: logic to test year is in YYYY format and error condition otherwise
    const data = await tmdb_api(year as string); 
    res.status(200).json(data) 
}