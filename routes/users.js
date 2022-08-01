import express from 'express'

import { v4 as uuidv4 } from 'uuid';
//uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'

//initialize router
const router = express.Router()

let users = [
    // {
    //     firstName: "John",
    //     lastName: "Doe",
    //     age : 25
    // },
    // {
    //     firstName: "Jane",
    //     lastName: "Doe",
    //     age: 24
    // }
]

// all routes in here are starting with /users
router.get('/', (req, res) => {
    console.log(users)
    res.send(users)
});

//adding users from front end to the database
//Like adding an account information or something
//browser can only make get request, that's why we need software can help us test api ---Postman
router.post('/', (req, res) => {
    console.log('POST ROUTE REACHED');
    //console.log(req.body)  --> full object stored in request.body
    const user = req.body;
    const userId = uuidv4();
    //spread all properties from current user and add the id property from uuid
    const userWithId = {...user, id: userId}

    users.push(userWithId);
    res.send(`User with the username ${user.firstName} added to the database!`)
})

// this : colum sign way - accept anything after /
router.get('/:id', (req, res) => {
    //req.params will return an object {id: url info after colum}
    //descructure the id
    const {id} = req.params;
    const foundUser = users.find ((user) => user.id === id );

    res.send(foundUser)
})


router.delete('/:id', (req, res) => {
    const {id} = req.params;

    users = users.filter((user) => user.id !== id)

    res.send(`User with id ${id} has been deleted`)
})

router.patch('/:id', (req, res) => {
    const {id} = req.params;
    //what we expect to receive to update, take them from req.body
    const {firstName, lastName, age} = req.body;
    const user = users.find((user) => user.id ===id)

    if (firstName) {
        user.firstName = firstName
    }
    if (lastName) {
        user.lastName = lastName
    }
    if (age) {
        user.age = age
    }

    res.send(`user with the id ${id} has been eidted`)
})
export default router;

//we can seperate all the callback functions to the controller folder and import to here to use
//there is a controllers folders with routs logics -- user.js