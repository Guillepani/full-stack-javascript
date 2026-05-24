const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = require('../models/User')

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body

    const userExists = await User.findOne({ email })

    if (userExists) {
      return res.status(400).json('El usuario ya existe')
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = new User({
      name,
      email,
      password: hashedPassword
    })

    const savedUser = await newUser.save()

    return res.status(201).json({
      message: 'Usuario registrado correctamente',
      user: savedUser
    })
  } catch (error) {
    return res.status(500).json('Error registrando usuario')
  }
}

module.exports = {
  register
}
