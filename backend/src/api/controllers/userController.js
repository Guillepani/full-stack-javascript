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

    const userWithoutPassword = savedUser.toObject()

    delete userWithoutPassword.password

    return res.status(201).json({
      message: 'Usuario registrado correctamente',
      user: userWithoutPassword
    })
  } catch (error) {
    return res.status(500).json('Error registrando usuario')
  }
}

const login = async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email })

    if (!user) {
      return res.status(400).json('Usuario o contraseña incorrectos')
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      return res.status(400).json('Usuario o contraseña incorrectos')
    }

    const token = jwt.sign(
      {
        id: user._id
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '7d'
      }
    )

    const userWithoutPassword = user.toObject()

    delete userWithoutPassword.password

    return res.status(200).json({
      message: 'Login correcto',
      token,
      user: userWithoutPassword
    })
  } catch (error) {
    return res.status(500).json('Error en el login')
  }
}

module.exports = {
  register,
  login
}
