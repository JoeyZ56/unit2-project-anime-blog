const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


//creating authentication loggin controller
exports.auth = async (req, res, next) => {
    try {
        const token = req.header('Authentication').replace('Bearer ', '')
        const data = jwt.verifyt(token, 'waifu')
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
exports.creeateForm = (req, res) => {
    res.render('users/New')
}


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



//Delete User
exports.deleteUser = async (req, res) => {
    try {
        await req.user.deleteOne()
        res.json({ message: 'You have been dethroned sire!'})
    } catch (error) {
        res.status(400).json({ message: error.message})
    }
}