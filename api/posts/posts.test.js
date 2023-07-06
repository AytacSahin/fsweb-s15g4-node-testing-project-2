const postModel = require('./posts-model');
const db = require('../../data/db-config');

beforeAll(async () => {
    await db.migrate.rollback();
    await db.migrate.latest();
});

beforeEach(async () => {
    await db.seed.run();
})


test('Sanity Test', ()=>{
    expect(true).toEqual(true); 
})
