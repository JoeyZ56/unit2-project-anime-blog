How to install this app on their local machine:

    1. Clone code by coping URL: https://github.com/JoeyZ56/unit2-project-anime-blog.git

    2. Open terminal make a folder you want to put the code in "mkdir anime-blog-clone"

    3. From terminal (and in the folder you want code to be) run command "git clone https://github.com/JoeyZ56/unit2-project-anime-blog.git"

    4. cd to "unit2-anime-blog" from terminal

    5. run terminal command "code ." to open files in VS code

Global installations you need and files you need to create that didn't come in the github repo:

Installations requires:

    - From terminal be in file location that "unit2-anime-blog" is in or cd there then npm i to install all dependencies

Files to add:

    - (For this next step you must have a Mongodb atlas account) From terminal in code location make a file called ".env" place your MONGO_URI and your "SHA-256" hashed SECRET in this file

        MONGO_URI=
        SECRET=

How to start the app in dev mode:

    To start the app in dev mode from the terminal run command line "npm run dev"
    You will know server is up and running when the terminal says "Our army is 3000 strong", and "Mongo is witchcraft"

How to make an api request in Postman (i.e what port, what url etc):

Manual testing with Postman:

    URL: http://localhost:3000, PORT:3000

From breadcrum:

    Body -> raw -> json

For user testing:

    Create user: Post route -> http://localhost:3000/users -> (follow steps from models/user.js) body{
    "name": " ",
    "email": " ",
    "password": " "
    } -> send request

Login user:

    Post route -> http://localhost:3000/users/login -> (remove "name") body{
    "email": " ",
    "password": " "
    }
    copy token -> breadcrum: Auth {type: Bearer Token} paste token -> send

Update user:

    Put route -> http://localhost:3000/users/:id -> (only keep what your updating) body{
    "email": "different email"
    } -> (copy :id put at the end of /users/) -> copy token -> breadcrum: Auth {type: Bearer Token} paste token -> send

Delete user:

    Delete route -> http://localhost:3000/users/:id -> (copy :id put at the end of /users/) -> copy token -> breadcrum: Auth {type: Bearer Token} paste token -> send

Logout user:

    Post route -> http://localhost:3000/users/logout -> copy token -> breadcrum: Auth {type: Bearer Token} paste token -> send

For testing Posts: (user must be logged in for testing all routes)

    Create Post: Post route - http://localhost:3000/posts -> body{
    "title": " ",
    "description": " "
    } -> copy token -> breadcrum: Auth {type: Bearer Token} paste token -> send

Update Post:

    Put route -> http://localhost:3000/posts/:id -> (only keep what your updating) body{
    "title": " "
    } -> (copy :id put at the end of /users/) -> copy token -> breadcrum: Auth {type: Bearer Token} paste token -> send

Delete Post:

    Delete route -> http://localhost:3000/posts/:id -> (copy :id put at the end of /posts/) -> send

Show user posts:

    Get route -> http://localhost:3000/posts/:id -> (copy :id put at the end of /posts/) -> send

Show posts feed:

    Get route -> http://localhost:3000/posts/feed -> (copy :id put at the end of /posts/) -> send

How to run tests:

    - For Jest testing: From the terminal (make sure your not connected to Mongodb server), write in command line "npm i test" this will start the Jest testing for posts / user tests (ALL 8 should be passing).

    - For Artillery testing: Open a sepreate terminal (make sure your connected to mongodb in the main terminal) cd to the folder that hold all the files for the blog then in that seperate terminal run command "npm run load" (Should get 20 (200) message from results)

How to start the app without dev mode:

    - (Make sure you not in "Dev Mode") in terminal run command "npm run start"

WIREFRAME:
https://excalidraw.com/#json=yrBXBk5BACny5M8wS7L33,MpY6UyOztplZLnzp2_lZMw

Diagram:
https://lucid.app/lucidchart/65e88c1f-90c5-43cb-9afa-a2f4405bb371/edit?viewport_loc=-194%2C-178%2C1590%2C748%2C0_0&invitationId=inv_05ca3a98-9a46-4d06-be12-118fdcf3e4d1
