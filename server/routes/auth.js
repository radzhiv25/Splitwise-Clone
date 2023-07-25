const express = require('express')
const {User} = require('../models/user')
const joi = require('joi')
const bcrypt = require('bcrypt')

const router = express.Router()

router.post('/', async(request, response) => {
    try {
        const {err} = User.validate
        if(err){
            return response.status(400).send({message: err.details[0].message})
        }

        const user = await User.findOne({email: request.body.email})
        const validPass = await bcrypt.compare(request.body.password, user.password)
        
        if(!user || !validPass){
            return response.status(401).send({message: "Invalid Username or Password"})
        }

        const token = user.generateAuthToken()
        response.status(200).send({message: "Logged In successfully...!"})
    } catch (error) {
        response.status(500).send({message: "Internal Server Error...!!!"})
    }
})

const validate = (data) => {
    const schema = joi.object({
        email: joi.string().email().required().label("Email"),
        password: joi.string().required().label("Password")
    })

    return schema.validate(data)
}


module.exports = router