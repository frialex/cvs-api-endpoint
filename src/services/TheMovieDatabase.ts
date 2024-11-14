
const BASE_URL = 'https://api.themoviedb.org/3'
const MOVIE_API_URL = `${BASE_URL}/discover/movie?language=en-US&page=1&sort_by=popularity.desc`

export default async function(year: string): Promise<Movie[]> {

    try {
        const TMDB_API_KEY = process.env.TMDB_API_KEY;
        
        const res = await fetch(`${MOVIE_API_URL}&primary_release_year=${year}&api_key=${TMDB_API_KEY}`)
        const data = await res.json();

        const response = await Promise.all( data.results.map( async (m: any) => {
            // console.log(m);
            const editors = await getEditors(m.id);
            return {
                title: m.title,
                release_date: m.release_date,
                vote_average: m.vote_average,
                editors
           }
        }));
        
        return response;

    } catch(error){
       console.log(error)
       throw new Error("Service error: failed to call TMDB API")
    }

}

async function getEditors(movieId: number){ 
    try{
        const TMDB_API_KEY = process.env.TMDB_API_KEY;
        const r1 = await fetch(`${BASE_URL}/movie/${movieId}/credits?api_key=${TMDB_API_KEY}`)
        const r2 = await r1.json();

        const editors = r2.crew.filter((c: any) => c.known_for_department === 'Editing')
                               .map((e: any) => e.name)
        return editors;

    } catch(error){
        console.log(error);
        return [];
    }
}

type Movie =  {
    title: string;
    release_date: string;
    vote_average: number;
    editors: string[];
}