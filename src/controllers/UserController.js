const connection = require('../database/connection');
const jwt = require('../utils/jwt')

module.exports = {
    async index (req,res){
        await connection('users')
            .select('*')
            .then(response=>{
                return res.status(200).json(response)
            })
            .catch(err=>{
                return res.status(400).json(err)
            })
    },
    async add (req,res){
        const { email, password } = req.body;
        await connection('users')
            .insert({
                email,
                password
            })
            .then(response=>{
                return res.status(201).json({id:response})
            })
            .catch(err=>{
                return res.status(400).json(err)
            })
    },
    async login (req,res){
        const { email, password } = req.body;
        if(!email || !password) return res.status(401).json("You must pass the user and password on the body");
        let user = await connection('users')
            .select("id","email","password")
            .where('email',email)
            .first()
            .then(response=>{
                return response
            })
            .catch(err=>{
                return res.status(401).json("There's no user with this email");
            })
        
        if(email == user.email  && password == user.password){
            const token = jwt.signin(user.id)
            return res.status(200).json({token});
        }
        
        return res.status(401).json("Invalid email or password");
    },
    async auth (req,res){
        const id = req.headers.id;
        const user = await connection('users')
            .select("id","email","password")
            .where('id',id)
            .first()
            .then(response=>{
                return response
            })
            .catch(err=>{
                return res.status(401).json("There's no user with this email");
            })

        return res.status(200).json({user});
    }

}