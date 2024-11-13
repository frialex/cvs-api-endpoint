
const TMDB_API_URL = 'https://api.themoviedb.org/3/discover/movie?language=en-US&page=1&sort_by=popularity.desc'

export default async function(year: string){

    try {
        const TMDB_API_KEY = process.env.TMDB_API_KEY;
        
        const res = await fetch(`${TMDB_API_URL}&primary_release_year=${year}&api_key=${TMDB_API_KEY}`)
        const data = await res.json();

        // console.log(data)
        return data;

    } catch(error){
       console.log(error)
       throw new Error("Service error: failed to call TMDB API")
    }

}