const jwt = require("jsonwebtoken")
const User = require("../models/User")
const bcrypt = require("bcrypt");

exports.getAllUsers = async(req,res) =>{
    try {
        const user = await User.find();
        return res.status(200).json({
            success:true,
            msg:"All ok"
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            success:true,
            msg:"All ok"
        })
    }
    
}

exports.signup = async(req,res) =>{
    try{
        const {name,email,password } = req.body;

        if( !name || !email || !password){
            return res.status(400).json({
                success :false,
                msg:"All feilds are required"
            })
        }
        const userExist = await User.findOne({email:email}) 
        if(userExist){
            return res.status(400).json({
                success:false,
                msg:"User already exist with this Email"
            })
        }
        const hashPass = await bcrypt.hash(password,10);

        const newUser = await User.create({
            name,
            password: hashPass,
            email
        })
        return res.status(201).json({
            success : true,
            msg:"User created successfully",
            newUser
        })
    }
    catch(error){
        console.log(error)
        return res.status(500).json({
            success:false,
            msg:"Error in signup function "
        })
    }
}


exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                msg: "All fields are required"
            });
        }

        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(400).json({
                success: false,
                msg: "User does not exist with this email"
            });
        }

        const checkPass = await bcrypt.compare(password, user.password);

        if (!checkPass) {
            return res.status(400).json({
                success: false,
                msg: "Password does not match"
            });
        }
        const payload = {
            id: user._id,
            name: user.name,
            email: user.email
        };
        res.clearCookie('token',{
            path:'/',
            domain:"localhost",
            httpOnly: true,  
            signed:true
        })
        
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" });
        const expires = new Date()
        expires.setDate(expires.getDate() + 7 )

        res.cookie('token', token, {
            path: '/',
            domain: 'localhost',  
            httpOnly: true,  
            expires,
            signed: true,
            sameSite: 'None',   
            secure: true,       
        });
        
        return res.status(200).json({
            success: true,
            token,
            user,
            msg: "User login successfully",
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            msg: "Error in login function"
        });
    }
};
