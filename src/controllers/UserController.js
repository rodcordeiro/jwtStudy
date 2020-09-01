const connection = require('../database/connection');
const cript = require('../utils/crypto');
const generateUniqueId = require('../utils/generateUniqueId');

module.exports = {
    async index(req, res){
        try{
            await connection('users')
            .select('*')
            .then(response=>{
                return res.status(200).json(response)
            })
        } catch (err){
            throw new Error(err.message);
        }
    },
    async create(req,res){
        const { email, password } = req.body;
        if (!email || !password){
            return res.status(400).json({status:"BAD REQUEST",message:"email and password are required fields"})
        }
        try {
            let hash = cript(password)
            const id = generateUniqueId();
            await connection("users").insert({
                id,
                email,
                password:hash
            });
            return res.status(200).json({
                id
            })
        } catch (error) {
            throw new Error(error);
        }
    },

}