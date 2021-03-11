const express = require('express')

const User = require('../models/user')

const jwt       = require('jsonwebtoken')

const {auth} = require('../middleware/auth')

const multer = require('multer')

const router = new express.Router()

//Register
router.post('/user', async(req, res)=>{
    const user = new User(req.body)
    try{
        await user.save()
        const token = await user.generateToken()
        res.status(200).send({
            error: null,
            apiStatus:true,
            msg: 'Your Account Has Been Created',
            data: {user, token}
        })
    }
    catch(error){
        res.status(400).send({
            error: error.message,
            apiStatus:false,
            data: 'unauthorized user'
        })

    }
})

 
//Login
// router.post('/loginuser', async(req,res)=>{
//     try{
//         const role = req.body.role
//         if(!role) {throw new Error('add user role')}
//         const user = await User.findByCredentials(req.body.email, req.body.password, req.body.role)
//         const token = await user.generateToken()
//         res.send({
//             status: 1,
//             data: {user, token, token_type:'Bearer '},
//             message: " user logged in"
//         })
//     }
//     catch(e){
//         res.status(200).send({
//             status: 0,
//             data: e,
//             message: "Error occurs while log in"
//         })
//     }
// })
router.post('/user/login', async(req, res)=>{
    try{
        const role = req.body.role
       if(!role) {throw new Error('add user role')}
        const user = await User.findUserByCredentials(req.body.email, req.body.password,req.body.role)
        const token = await user.generateToken()
        res.status(200).send({
            error: null,
            apiStatus:true,
            msg:'you logg in success',
            data: {user, token}
        })
    }
    catch(error){
        res.status(400).send({
            error: error.message,
            apiStatus:false,
            data: 'unauthorized user'
        })
    }
})

//upload Image
let uniqueSuffix
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'images')
    },
    filename: function (req, file, cb) {
      
        uniqueSuffix = Date.now() + file.originalname.match(/\.(jpg|png)$/)[0]
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })
  
  var upload = multer({ storage: storage })
router.post('/me/uploadImg',auth , upload.single('upload'), async(req,res)=>{
    
    console.log(uniqueSuffix);
    req.user.pimg = `images/${uniqueSuffix}`
    await req.user.save()
    res.send(req.user)
})

//LogOut
// router.post('/user/logout',auth, async(req,res)=>{
//     try{
//         req.user.tokens = req.user.tokens.filter((singleToken)=>{
//             return singleToken.token != req.token
//         })
//         await req.user.save()
//         res.status(200).send({
//             error: null,
//             apiStatus:true,
//             data: 'logged out successfully'
//         })
//     }
//     catch(error){
//         res.status(400).send({
//             error: error.message,
//             apiStatus:false,
//             data: error.message
//         })
//     }

// })
router.post('/user/logout',auth, async(req,res)=>{
    try{
        req.user.tokens = req.user.tokens.filter( token =>{
            return token.token != req.token
        })
        await req.user.save()
        res.status(200).send({
            status:1,
            data:'',
            message:"logged out successfully"
        })
    }
    catch(e){
        res.status(500).send({
            statue: 0,
            data:e,
            msg:"error in data"
        })
    }
})
//LogOutAll
router.post('/user/logoutAll',auth, async(req,res)=>{
    try{
        req.user.tokens = []
        await req.user.save()
        res.status(200).send({
            error: null,
            apiStatus:true,
            data: 'logged out successfully'
        })
    }
    catch(error){
        res.status(400).send({
            error: error.message,
            apiStatus:false,
            data: error.message
        })
    }

})

//Profile
router.get('/user/me',auth, async(req,res)=>{
    res.status(200).send({
        error: null,
        apiStatus:true,
        data: {user:req.user}
    })
})

//ChangePassword
router.post('/user/changePassword', auth, async(req, res)=>{
    try{
        if(!req.body.old_pass || !req.body.new_pass) throw new Error('invalid data')
        const matched = await bcrypt.compare(req.body.old_pass, req.user.password)
        if(!matched) throw new Error('invalid user old password')
        req.user.password = req.body.new_pass
        await req.user.save()
        res.status(200).send({
            error:null,
            apiStatus:true,
            data:{user: req.user},
            message:'Password added'
        })
    }
    catch(e){
    res.status(400).send({
        error:e.message,
        apiStatus:false,
        data:'',
        message:'Password add problem'
    })
        }
})


//Edit User Profile

router.patch('/user/me', auth, async(req, res)=>{
    const allowedUpdates =['name', 'phone', 'age']
    const updates = Object.keys(req.body)
    const validateEdits = updates.every(update=> allowedUpdates.includes(update))
    if(!validateEdits) return res.status(400).send({
        apiStatus:false,
        message:'unavailable updates',
        error:true
    })
    try{
        updates.forEach(update=>req.user[update] = req.body[update])
        await req.user.save()
        res.status(200).send({
            error: null,
            apiStatus:true,
            data: {user: req.user}
        })
    }
    catch(error){
        res.status(400).send({
            error: error.message,
            apiStatus:false,
            data: 'unable to update'
        })
    }
})

//Delete Account
router.delete('/user/me', auth, async(req, res)=>{
    try{
        await req.user.remove()
        res.status(200).send({
            error: null,
            apiStatus:true,
            data: 'deleted'
        })
    }
    catch(error){
        res.status(400).send({
            error: error.message,
            apiStatus:false,
            data: 'unauthorized user'
        })
    }
})

module.exports=router