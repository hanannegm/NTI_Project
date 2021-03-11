const validator = require('validator')
const mongoose = require('mongoose')
const bcrypt    = require('bcryptjs')
const jwt       = require('jsonwebtoken')
const Book = require('./book')

    const userSchema = new mongoose.Schema({
        name:{
            type:String,
            required: true,
            trim: true
        },
        email:{
            type: String,
            unique: true,
            required:true,
            trim: true,
            lowercase: true,
            validate(value){
                if(!validator.isEmail(value)) throw new Error('Invalid Email')
            }
        },
        password:{
            type:String,
            minlength:6,
            required:true,
            trim:true,
            match:/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/,
        
        },
        phone:{
            type:String,
            trim:true,
            validate(value){
                if(!validator.isMobilePhone(value,['ar-EG'])) throw new Error('invalid phone number')
            }
        },
        age:{
            type:Number,
            default:21,
            validate(value){
                if(value<18) throw new Error('lesa so8yr')
            }
        },
        image:{
            type:String,
            trim:true
        },
        user_type:{
            type:String,
            enum:['Admin', 'Writer', 'User'],
            required: true
        },
        status:{
            type:Boolean, 
            default:false
        },
        role : {
            type: Number,
            required: true,
            default: 0
           
        
        },
        tokens:[
            {
                token:{type:String}
            }
        ]
        },
        {timestamps:true}
    )
 
   


userSchema.virtual('Comments',{
    ref:'Comments', localField:'_id', foreignField:'owner'
})

userSchema.virtual('Book',{
    ref:'Book', localField:'_id', foreignField:'bookowner'
})

userSchema.methods.toJSON = function(){
    const user = this.toObject()
    delete user.password
    delete user.tokens
    return user
}

userSchema.pre('save',async function(next){
    const user = this
    if(user.isModified('password'))
    user.password = await bcrypt.hash(user.password , 10)
    next()
})

// userSchema.pre('remove',async function(next){
//     const user = this
//     if(user.role == role)
//    await Comments.deleteMany({user_id:user.id})
//     next()
// })

userSchema.statics.findUserByCredentials =  async(email, password)=>{
    const user = await User.findOne({email})
    if(!user) throw new Error('invalid email')
    const matched = await bcrypt.compare(password, user.password)
    if(!matched) throw new Error('invalid password')
    return user
}
userSchema.methods.generateToken = async function(){
    const user = this
    const token = jwt.sign({_id: user._id.toString()},'1234565')
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}


const User = mongoose.model('User', userSchema)

module.exports = User