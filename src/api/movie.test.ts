import movie_api from './movie';
import { getMockReq, getMockRes } from '@jest-mock/express';


jest.mock('../services/TheMovieDatabase', () => ({
    __esModule: true,
    default : jest.fn(()=> Promise.resolve( { "title": "Sonic the Hedgehog",
                "release_date": "2020-02-12",
                "vote_average": 7.3,
                "editors": ['Bob']
            }
    ))
}))


describe('the movie api endpoint', () => {

    it('should mock tmdb api', async () => {
       const req = getMockReq({
            METHOD: 'GET',
            url: '/movie',
            query: { year: '2020' }
       }) 
       const { res } = getMockRes();

       await movie_api(req, res);
       expect(res.json).toHaveBeenCalled();
       console.log(res.statusCode)
    })


    it('should throw error if no year is provided', async () => {
       const req = getMockReq({
            METHOD: 'GET',
            url: '/movie'
       }) 
       const { res } = getMockRes();

       await movie_api(req, res);
       expect(res.status).toHaveBeenNthCalledWith(1, 400);
    })
})