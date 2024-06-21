import bcryptjs from 'bcryptjs';
import User from '../models/User.model.js';
import generateTokenAndSetCookie from '../utils/generateTokens.js';
// import 


// signupUser ---->  controller ....
export const signupUser = async (req , res) =>{
    
    try{
        console.log("please signup !")
        const {name , email  , password , confirmPassword , role } = req.body ;

        if(password !== confirmPassword){
            return res.status(400).json({error : "Password don't match "});
        }

        // if User already exist or not ...
        const user = await User.findOne({email});
        if(user){
            return res.status(400).json({error : "user already exist with same email Id"});
        }


        // Hash the password ...
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password , salt);

        // creating new user ...
        const newUser = new User({
            name , email , password  : hashedPassword, role ,
        }) ;

        if(newUser){
            // Generate JWT token here ...
            generateTokenAndSetCookie(newUser.role , newUser._id , res );
            // save the user to database ...
            await newUser.save();


            // response json payload ...
            return res.status(201).json({
                _id : newUser._id,
                name : newUser.name ,
                email : newUser.email ,
                role : newUser.role ,
            });
        }
          
    }catch(error){
        console.log("Error in Signup Controller ", error.message);
        return res.status(500).json({error : error.message});

    }
};

// login functionality ...
export const loginUser = async (req , res)=>{
    try{
        const {name ,email ,  password} = req.body ;
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({error : "User already exist with same emailId . "});

        }
        const isPasswordCorrect = await bcryptjs.compare(password , user?.password || "");

        if(!isPasswordCorrect){
            return res.status(400).json({error : "Invalid  Password "});
        }

        generateTokenAndSetCookie(user.role, user._id , res);

        res.status(200).json({
            _id : user._id,
            name : user.name , 
            email : user.email,
        })
    }catch(error){
        console.log("Error in Login Controller " , error.message);
        res.status(5000).json({error : "Internal server error"});
    }
};

// logout functionality ...
export const logoutUser = (req, res) => {
    try {
      // Clear the 'jwt' cookie by setting it to an empty string and setting the expiration to now
      res.cookie('jwt', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Ensure secure cookies in production
        sameSite: 'strict', // Helps protect against CSRF attacks
        expires: new Date(0), // Expire the cookie immediately
      });
  
      // Send a response indicating successful logout
      res.status(200).json({ message: 'Logged out successfully!' });
    } catch (error) {
      console.log('Error in logout controller:', error.message);
  
      // Send a response indicating an internal server error
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

export const getUserProfile = async(req , res)=>{
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
};

