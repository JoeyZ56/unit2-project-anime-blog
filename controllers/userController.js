const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


//creating authentication loggin controller
exports.auth = async (req, res, next) => {
    try {
        const token = req.header('Authentication').replace('Bearer ', '')
        const data = jwt.verify(token, 'waifu')
        const user = await User.findOne({ _id: data._id})
        if(!user) {
            throw new Error()
        }
        req.user = user
        next()
    } catch (error) {
        res.status(401).send('IMPOSTER!')
    }
}

//Index
exports.feedIndex = async (req, res) => {
    try {
        const userFeed = await User.find({})
        res.render('users/feed', {
            users: userFeed
        })
    } catch (error) {
        res.status(400).send({ message: error.message })
    }
}


//Create User
exports.createUser = async (req, res) => {
    req.body.loggedIn = false
    try {
        const user = new User(req.body)
        await user.save()
        const token = await user.generateAuthToken()
        res.json({ user, token})
    } catch (error) {
        res.status(400).json({ message: error.message})
    }
}

//User Form



//Show


//Login User
exports.loginUser = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        if(!user || !await bcrypt.compare(req.body.password, user.password)) {
            res.status(400).send('Not the king!')
        } else {
            user.logginIn = true
            await user.save()
            const token = await user.generateAuthToken()
            res.json({ user, token})
        }
    } catch (error) {
        res.status(400).json({ message: error.message})
    }
}

//Logout User
exports.logoutUser = async (req, res) => {
    try {
        req.user.loggedIn = false
        await req.user.save()
        res.json(req.user)
    } catch (error) {
        res.status(400).json('failed to log out me lord')
    }
}
//Update User
exports.updateUser = async (req, res) => {
    try {
        const update = Object.keys(req.body)
        const user = await User.findOne({ _id: req.params.id })
        update.forEach(update => user[update] = req.body[update])
        await user.save()
        res.json(user)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}


//Delete User
exports.deleteUser = async (req, res) => {
    try {
        await req.user.deleteOne()
        res.json({ message: 'You have been dethroned sire!'})
    } catch (error) {
        res.status(400).json({ message: error.message})
    }
}