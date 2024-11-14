
const BASE_URL = 'https://api.themoviedb.org/3'
const MOVIE_API_URL = `${BASE_URL}/discover/movie?language=en-US&page=1&sort_by=popularity.desc`

export default async function(year: string, page: string): Promise<Movie[]> {

    try {
        const TMDB_API_KEY = process.env.TMDB_API_KEY;
        const URL =  `${MOVIE_API_URL}&primary_release_year=${year}&page=${page}&api_key=${TMDB_API_KEY}`;
        const res = await fetch(URL)
        const data = await res.json();

        const response = await Promise.all( data.results.map( async (m: Movie) => {
            return {
                title: m.title,
                release_date: m.release_date,
                vote_average: m.vote_average,
                editors: await getEditors(m.id)
           }
        }));
        
        return response;

    } catch(error){
       throw new Error("Service error: failed to call TMDB API")
    }

}

async function getEditors(movieId: number){ 
    try{
        const TMDB_API_KEY = process.env.TMDB_API_KEY;
        const URL = `${BASE_URL}/movie/${movieId}/credits?api_key=${TMDB_API_KEY}`;
        const res = await (await fetch(URL)).json();

        const editors = res.crew.filter((c: Crew) => c.known_for_department === 'Editing')
                                .map((e: Crew) => e.name)
        return editors;

    } catch(error){
        return [];
    }
}

type Movie =  {
    id: number;
    title: string;
    release_date: string;
    vote_average: number;
    editors: string[];
}

type Crew = {
    known_for_department: string;
    name: string;
}