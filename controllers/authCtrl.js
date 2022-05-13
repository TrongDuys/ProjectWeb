
const Users = require('../models/useModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { sendConfirmationEmail } = require("./mailerCtrl");
const { sendResetPassword } = require("./mailerCtrl");
const PendingUser = require("../models/pendingUser");

const authCtrl = {
    register: async (req, res) => {
        try {
            const { firstname, lastname, email, password, role } = req.body
            console.log({ firstname, lastname, email, password, role })
            
            const user_email = await Users.findOne({email});
            const pdUser = await PendingUser.findOne({email});

            if(user_email || pdUser){
                return res.status(400).json({ msg: "Email đã tồn tại." }); 
            }

            if(password.length < 6)
            return res.status(400).json({msg: "Mật khẩu phải có ít nhất 6 ký tự"})

            const passwordHash = await bcrypt.hash(password, 12)
            const newUser = new PendingUser({
                firstname,
                lastname,
                email,
                password: passwordHash,
                role,
              });

            await newUser.save();
            
            await sendConfirmationEmail({ toUser: newUser, hash: newUser._id });  

            res.json({
                msg: "Vui lòng xác nhận tài khoản tại Email vừa nhập!",
              });
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    login: async (req, res) => {
        try {
            const { email, password } = req.body

            const user = await Users.findOne({email})
           

            if(!user) return res.status(400).json({msg: "This email does not exist."})

            const isMatch = await bcrypt.compare(password, user.password)
            if(!isMatch) return res.status(400).json({msg: "Password is incorrect."})

            const access_token = createAccessToken({id: user._id})
            const refresh_token = createRefreshToken({id: user._id})

            res.cookie('refreshtoken', refresh_token, {
                httpOnly: true,
                path: '/api/refresh_token',
                maxAge: 30*24*60*60*1000 // 30days
            })
            res.json({
                msg: 'Login Success!',
                access_token,
                user: {
                    ...user._doc,
                    password: ''
                }
            })
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    logout: async (req, res) => {
        try {
            res.clearCookie('refreshtoken', {path: '/api/refresh_token'})
            return res.json({msg: "Logged out!"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    generateAccessToken: async (req, res) => {
        try {
            const rf_token = req.cookies.refreshtoken
            if(!rf_token) return res.status(400).json({msg: "Please login now."})

            jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, async(err, result) => {
                if(err) return res.status(400).json({msg: "Please login now."})

                const user = await Users.findById(result.id).select("-password")

                if(!user) return res.status(400).json({msg: "This does not exist."})

                const access_token = createAccessToken({id: result.id})

                res.json({
                    access_token,
                    user
                })
            })
            
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    activateUser: async (req, res) => {
        const { id } = req.params;
    
        try {
          const user = await PendingUser.findById(id);
    
          const newUser = new Users({
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            password: user.password,
            role: user.role,
          });
    
          await newUser.save();
          await user.remove();
    
          res.json({ msg: `Người dùng ${id} đã được kích hoạt` });
        } catch (err) {
          return res.status(500).json({ msg: err.message });
        }
      },
}


const createAccessToken = (payload) => {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1d'})
}

const createRefreshToken = (payload) => {
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '30d'})
}

module.exports = authCtrl