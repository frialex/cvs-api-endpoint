import { enableFetchMocks } from 'jest-fetch-mock';
import fetchMock from "jest-fetch-mock";
import tmdb_api from './TheMovieDatabase';

enableFetchMocks()

describe('The Movie Database API call', () => {

    beforeEach(()=> {
        fetchMock.doMock();
    })

    it('should call the movie database api', async () => {
        fetchMock.mockOnce(JSON.stringify({test: 100}));

        const res = await tmdb_api("2020");
        expect(res).toEqual({ "test": 100 });
        expect(fetchMock.mock.calls.length).toBe(1);
    })

    it('should transform from TMDB to CVS response', async () => {

        const mockResponse = {
                    "id": 454626,
                    "popularity": 132.32,
                    "release_date": "2020-02-12",
                    "title": "Sonic the Hedgehog",
                    "vote_average": 7.3,
                }

        fetchMock.mockResponse(JSON.stringify({ results: mockResponse}));

        const res = await tmdb_api("2020");
        console.log(res);

    });

})