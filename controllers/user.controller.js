const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const { userService } = require("../services");
const User = require("../models/user.model")
const axios = require("axios");
const getUsers = catchAsync(async (req, res) => {
    const user = await userService.getUser();
    res.send(user);
});
const getUserByUsername =catchAsync(async (req, res) =>{
    const { username } = req.params;
    const user = await userService.getUserByUsername(username);
    res.send(user);
});
const findMutuallyFriends = async (user,url) => {
    try {
        const followersResp = await axios.get(`${url}/followers`);
        const followers = followersResp.data;
        const followingResp = await axios.get(`${url}/following`);
        const following = followingResp.data;

        const commonFriends = followers.filter(follower => following.some(followingUser => followingUser.id === follower.id));
        return commonFriends;
    } catch (error) {
        console.error('Error fetching data:', error.message);
        throw error;
    }
};
const addUser = catchAsync(async (req, res) => {
    const { username } = req.params;
    console.log(username);
    const isUserExist = await User.findOne({ username });
    if(!isUserExist){
        try {
            const url=`https://api.github.com/users/${username}`;
            const githubResponse = await axios.get(url);
            const githubUser = githubResponse.data;
            const mutuallyfriends=await findMutuallyFriends(githubUser,url);
            const user =await userService.addUsertoDB(githubUser,mutuallyfriends);
            res.status(httpStatus.CREATED).send(user);
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    }else{
        res.status(httpStatus.BAD_REQUEST).send('User already created')
    }
    
});

const deleteUser = catchAsync(async (req, res) =>{
    const { username } = req.params;
    const user = await userService.deleteUser(username);
    console.log("User Deleted");
    res.send(user);
})
module.exports ={
    getUsers,
    addUser,
    deleteUser,
    getUserByUsername
}