import bcrypt from "bcryptjs" // for crypted users infos
import jwt from "jsonwebtoken" //store the user in browser some period of time
import User from "../models/user.js"

export const signin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email }) // find user email in db
        if (!existingUser) return res.status(404).json({ message: "User doesn't Existr" })
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordCorrect) return res.status(404).json({ message: "Invalid credentials" })

        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, "test", { expiresIn: "1h" });// test secret code which in env ,just testing now

        res.status(200).json({ result: existingUser, token });
    } catch (error) {
        res.status(500).json({ message: "Something went worg in Sign in" })
    }
}

export const signup = async (req, res) => {
    

    const { email, password, confirmPassword, firstName, lastName } = req.body;

    try {
        /* Email Check is user already sign up ? */
        const existingUser = await User.findOne({ email })

        if (existingUser) return res.status(404).json({ message: "User Already Exist" })


        /* password match Check */
        if (password !== confirmPassword) return res.status(404).json({ message: "Passwords Don't Match" })


        /* hashing pw */
        const hashedPassword = await bcrypt.hash(password, 12)
        /* creating user */
        const result = await User.create({ email, password: hashedPassword, name: `${firstName} ${lastName}` })

        /* creating token */
        const token = jwt.sign({ email: result.email, id: result._id }, "test", { expiresIn: "1h" });

        res.status(200).json({ result, token });

    } catch (error) {
        res.status(500).json({ message: "Something went worg in Sign Up" })
    }

}
