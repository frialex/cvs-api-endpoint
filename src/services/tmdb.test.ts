import { enableFetchMocks } from 'jest-fetch-mock';
import fetchMock from "jest-fetch-mock";
import tmdb_api from './TheMovieDatabase';

enableFetchMocks()

describe('The Movie Database API call', () => {

    beforeEach(()=> {
        fetchMock.resetMocks();
        fetchMock.doMock();
    })


    it('should transform from TMDB response object to CVS response object', async () => {

        const mockResponse = {
                    "id": 454626,
                    "popularity": 132.32,
                    "release_date": "2020-02-12",
                    "title": "Sonic the Hedgehog",
                    "vote_average": 7.3,
        }

        fetchMock.once(JSON.stringify({ results: [mockResponse]}))
                 .once(JSON.stringify({ crew: [{ known_for_department: 'Editing', name: 'Bob' } ] }));

        const res = await tmdb_api("2020", "2");
        expect(res).toEqual([
            {
                "title": "Sonic the Hedgehog",
                "release_date": "2020-02-12",
                "vote_average": 7.3,
                "editors": ['Bob']
            }
        ]);

    });

    it('should handle failed movie api call', async () => {

        fetchMock.mockAbort();

        try{
            const res = await tmdb_api("2020", "1");
        }catch(error: any){
            expect(error.message).toBe("Service error: failed to call TMDB API")
        }
    })


    it('should handle failed editors api call', async () => {

        const mockResponse = {
                    "id": 454626,
                    "popularity": 132.32,
                    "release_date": "2020-02-12",
                    "title": "Sonic the Hedgehog",
                    "vote_average": 7.3,
        }

        fetchMock.once(JSON.stringify({ results: [mockResponse]}))
                .mockAbortOnce();

        const res = await tmdb_api("2020", "1");
        expect(res).toEqual([
            {
                "title": "Sonic the Hedgehog",
                "release_date": "2020-02-12",
                "vote_average": 7.3,
                "editors": []
            }
        ]);

    });

})