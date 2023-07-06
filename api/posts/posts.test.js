const postModel = require('./posts-model');
const db = require('../../data/db-config');

const request = require('supertest');
const server = require('../../api/server');

beforeAll(async () => {
    await db.migrate.rollback();
    await db.migrate.latest();
});

beforeEach(async () => {
    await db.seed.run();
});

test('[1] Sanity Test', () => {
    expect(true).toEqual(true);
    expect(process.env.NODE_ENV).toBe('testing');
});

test('[2] can get all posts', async () => {
    const res = await request(server).get('/api/posts');
    expect(res.body).toHaveLength(9);
});

test('[3] can get posts with an ID', async () => {
    const res = await request(server).get('/api/posts/2');
    expect(res.body).toHaveProperty("contents", "Guess who said this");
});

test('[4] can send a new POST', async () => {
    const newPost = { title: "test-1", contents: "test-1-content" }
    const res = await request(server).post('/api/posts').send(newPost);
    expect(res.body).toHaveProperty("id", 10);
});

test('[5] could not post a new "POST" without title', async () => {
    const failure = { contents: "failure" };
    const res = await request(server).post('/api/posts').send(failure);
    expect(res.body.message).toEqual("Lütfen gönderi için bir title ve contents sağlayın");
});

test('[6] update a post with an ID', async () => {
    const newPost = { title: "test-1", contents: "test-1-content" }
    const res = await request(server).put('/api/posts/1').send(newPost);
    const result = await postModel.findById(1)
    expect(res.body).toMatchObject(result);
});

test('[7] delete post with a given ID', async () => {
    await request(server).delete('/api/posts/1');
    const result = await postModel.findById(1);
    expect(result).toBe(undefined);
});

test('[88888] can not delete post (because of wrong id)', async () => {
    const res = await request(server).delete('/api/posts/1234');
    expect(res.status).toBe(404);
    expect(res.body.message).toBe("Belirtilen ID'li gönderi bulunamadı");
});

test('[9] get comments with an ID', async () => {
    const res = await request(server).get('/api/posts/1/comments');
    expect(res.body).toHaveLength(2);
    expect(res.body[0]["text"]).toMatch(/JUST SHOW PEOPLE/i);
});

test('[10] can not get comments with a not included ID', async () => {
    const res = await request(server).get('/api/posts/1234/comments');
    expect(res.status).toBe(404);
    expect(res.body.message).toBe("Belirtilen ID'li gönderi bulunamadı");
});







