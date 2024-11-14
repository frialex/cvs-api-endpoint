import { Request, Response } from 'express';
import tmdb_api from '../services/TheMovieDatabase';


export default async function(req: Request, res: Response){ 
    let { year, page } = req.query;

    if(!year){
        return res.status(400).json({ error: 'Year is required' });
    }

    if(!page) page = "1"


    try{

        const data = await tmdb_api(year as string, page as string); 
        res.status(200).json(data) 
    }catch(error: any){
        res.status(500).json({ error: error.message })
    }
}