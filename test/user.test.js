const request = require('supertest')
const mongoose = require('mongoose')
const { MongoMemoryServer } = require('mongodb-memory-server')
const app = require('../app')
const server = app.listen(8080, () => console.log(`testing on port ${server}`))
const User = require('../models/user')
let mongoServer

// connect to mongodb-memory-server
beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create()
    await mongoose.connect(mongoServer.getUri())
})

//close connection to mongodb-memory-server
afterAll(async () => {
    await mongoose.connection.close()
    mongoServer.stop()
    server.close()
})

//testing user endpoints also creating a new user
describe('Testing the user endpoints', () => {
    test('It should create a new user', async () => {
        const response = await request(app)
        .post('/users')
        .send({ name: 'test1', email: 'test1@email.com', password: 'test123' })
    expect(response.statusCode).toBe(200)
    expect(response.body.user.name).toEqual('test1')
    expect(response.body.user.email).toEqual('test1@email.com')
    expect(response.body.user.loggedIn).toEqual(false)
    expect(response.body).toHaveProperty('token')
    })
    //testing user loggin
    test('it should login a user', async () => {
        const user = new User({ name: 'test1', email: 'test1@email.com', password: 'test123', logginIn: false })
        await user.save()

        const response = await request(app)
        .post('/users/login')
        .send({ email: 'test1@email.com', password: 'test123' })
    expect(response.statusCode).toBe(200)
    expect(response.body.user.name).toEqual('test1')
    expect(response.body.user.email).toEqual('test1@email.com')
    expect(response.body.user.loggedIn).toEqual(true)
    expect(response.body).toHaveProperty('token')
    })
    //Update a user
    test('It should update a user', async () => {
        const user = new User({ name: 'test1', email: 'test1@email.com', password: 'test123', logginIn: true })
        await user.save()
        const token = await user.generateAuthToken()
        const response = await request(app)
            .put(`/users/${user._id}`)
            .set(`Authorization`, `Bearer ${token}`)
            .send({ name: 'test2', email: 'test2@email.com' })
        expect(response.body.name).toEqual('test2')
        expect(response.body.email).toEqual('test2@email.com')
    })
    //testing user logout
    test('It should logout a user', async () => {
        const user = new User({ name: 'test1', email: 'test1@email.com', password: 'test123', logginIn: true })
        await user.save()
        const token = await user.generateAuthToken()
        const response = await request(app)
            .post(`/users/logout`)
            .set(`Authorization`, `Bearer ${token}`)
        console.log(response.body)
        expect(response.body.name).toEqual('test1')
        expect(response.body.loggedIn).toEqual(false)
    })
    //Delete a user
    test('It should delete a user', async () => {
        const user = new User({ name: 'test1', email: 'test1@email.com', password: 'test123' })
        await user.save()
        const token = await user.generateAuthToken()
        const response = await request(app)
            .delete(`/users/${user._id}`)
            .set(`Authorization`, `Bearer ${token}`)
        expect(response.statusCode).toBe(200)
        expect(response.body.message).toEqual('User has been deleted')
    })
})