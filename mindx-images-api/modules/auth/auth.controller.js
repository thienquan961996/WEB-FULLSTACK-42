const UserModel = require('./user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const createUser = async ({ username, password}) =>{
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);
    
    const user = await UserModel.create({ username, password: hashPassword});
    return user;
};

const findUser = async ({ username, password }) =>{
    const foundUser = await UserModel.findOne({ username}).lean();

    if( !foundUser) throw new Error('Not found user');

    const { password: foundPassword, ...restUser } = foundUser;
    const samePassword = bcrypt.compareSync(password, foundPassword);
    if (!samePassword) throw new Error('Password wrong');

    const token = jwt.sign(
        { userId: restUser._id},
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRES_IN
        }   
    )
    return { user: restUser, token };
}
module.exports = {
    createUser,
    findUser
}