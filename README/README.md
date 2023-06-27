Server.js:
require dotenv config connects my env to my server.js file (its private!)
const app connects my app.js to my server.js file
const mongoose connects my mongodb data base to my server.js file
const PORT tells my server where to listen on or to fall back on my local server 3000
mongoose.connect, connects my mongodb database to MY mongo URI
mongoose.connection loads my server once activated giving me a message letting me know its connected
app.listen tells my server to listen on a specific PORT(3000)


app.js:
require dotenv config connects my env to my app.js file
const express connects express(node) to my app.js file
const mongoose connects my mongodb data base to my server.js file
const morgan connects morgan(middleware) to my app.js
const app creates a varibale that invokes express(node)
const userRoutes connects my routes/userRoutes file to my app.js file
const methodOverride connects method-overide(middleware) to my app.js file

app.use express.urlencoded/express.json invoke the middleware routes for POST and PUT requests to the server
app.use express.static creates a route to the my static files (html/css)
app.use moragn tells express to log morgan in "combined" predifined format
app.use /users creates the http /users route for my server
app.use methodOverride retrieves the method from the server

modules.export = app exports the "require" objects from the app.js file


routes/userRoutes.js:
const express connects express to the userRoutes.js file
const router invokes creating new router objects for the userRoutes.js file
const userContoller connects userController.js to the userRoutes.js file

router.post "/" invokes the create user route from the userController.js file
router.post "/login" invokes the login route from the userController.js file
router.post "/logout" invokes the logout route from the userController.js file
router.put "/:id" invokes the update user route with user id from the userController.js file
router/delete "/:id" invokes the delete user route with user id from the userController.js file.

modules.exports = router exports the "require" objects from the userRoutes.js file


controllers/userController.js


models/user.js



WIREFRAME:
https://excalidraw.com/#json=yrBXBk5BACny5M8wS7L33,MpY6UyOztplZLnzp2_lZMw