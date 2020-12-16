const UserModel = require('./user');
const bcrypt = require('bcryptjs');


const createUser = async ({ username, password}) =>{
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);
    
    const user = await UserModel.create({ username, password: hashPassword});
    return user;
};

const findUser = async ({ username, password }) =>{
    const foundUser = await UserModel.findOne({ username});

    if( !foundUser) throw new Error('Not found user');

    const { password: foundPassword } = foundUser;
    const samePassword = bcrypt.compareSync(password, foundPassword);
    if (!samePassword) throw new Error('Password wrong');

    return foundUser;
}
module.exports = {
    createUser,
    findUser
}