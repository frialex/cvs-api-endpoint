import tmdb_api from './TheMovieDatabase';


// global.fetch = jest.fn(() =>
//     Promise.resolve({
//       json: () => Promise.resolve({ "test": 100 }),
//     }),
//   ) as jest.Mock;

let apiMock = (url: string | URL | Request) => Promise.resolve({
    json: () => Promise.resolve({ "test": 100 }),
} as Response);

let fetchMock: any = undefined;

describe('The Movie Database API call', () => {

    beforeEach(()=> {
        fetchMock = jest.spyOn(global, "fetch").mockImplementation(apiMock)
    })

    it('should call the movie database api', async () => {
        const res = await tmdb_api("2020");
        expect(res).toEqual({ "test": 100 })
        expect(fetchMock).toHaveBeenCalledTimes(1);
    })

})