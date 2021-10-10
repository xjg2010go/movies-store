const Except = require('chai').expect
const MongoUnit = require('mongo-unit')
const DAO = require('../dao')
const TestData = require('./movies.json')

describe('StoreDAO',() => {
    before(
        () => MongoUnit.start().then(()  => {
                process.env.MONGO_URI = MongoUnit.getUrl()
                DAO.init()
            }))
    beforeEach( () => MongoUnit.load(TestData))
    afterEach( () => MongoUnit.drop() )
    after( () => {
        DAO.close()
        return MongoUnit.stop()
    })
    it('should find all movies', () => {
        return DAO.Movie.find().then(
            movies => {
                Except(movies.length.to.equal(8))
                Except(movies[0].title.to.equal('Pulp Fiction (1994)'))
            }
        )
    })
})
