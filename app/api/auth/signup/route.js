import connectDB from '../../../../lib/mongodb'
import User from '../../../../model/User'
import bcrypt from 'bcryptjs'

export async function POST(request) {
  try {
    await connectDB()
    
    const { firstName, lastName, email, password } = await request.json()
    
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return Response.json({ error: 'User already exists' }, { status: 400 })
    }
    
    const hashedPassword = await bcrypt.hash(password, 12)
    
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword
    })
    
    return Response.json({ message: 'User created successfully' }, { status: 201 })
    
  } catch (error) {
    console.log('Signup error:', error)
    return Response.json({ error: 'Server error' }, { status: 500 })
  }
}