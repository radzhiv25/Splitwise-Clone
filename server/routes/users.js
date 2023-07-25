const router = require('express').Router()
const {User, validate} = require('../models/user')
const bcrypt = require('bcrypt')

router.post('/', async(request, response) => {
    try {
        const {err} = validate(request.body)
        if(err){
            return response.status(400).send({message: err.details[0].message})
        }
        
        const user = await User.findOne({email: request.body.email})
        if(user){
            return response.status(409).send({message: "User with this email already exists"})
        }

        const salt = await bcrypt.genSalt(Number(process.env.SALT))
        const hashPassword = await bcrypt.hash(request.body.password, salt)

        await new User({...request.body, password: hashPassword}).save()
        response.status(201).send("User created successfully...!!!")
    } catch (error) {
        response.status(500).send("Internal Server Error...!!!")
    }
})

module.exports = router