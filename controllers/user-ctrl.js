const {
    addUserService,
    getUserList,
} = require('../services/user-service');

const {
    SUCCESS
} = require('../constants/messages');



const add = async (req, res) => {
    const response = await addUserService(
        req.body
    );
    res.status(201).json({
        message: "success",
        data: response
    });

};

const login = async (req, res) => {

    const response = await getUserList(req.body);

    res.status(200).json({
        message: "Login Successfull",
        data: response
    });

}

module.exports = { add, login };