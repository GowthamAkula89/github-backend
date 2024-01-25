const httpStatus = require("http-status");
const  User  = require("../models/user.model");
const ApiError = require("../utils/ApiError");
const getUser = async () => {

  const user =  User.find({});
  return user;
};
const getUserByUsername = async(username)=>{
  const user = await User.findOne({ username });

  if (!user) {
      throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }

  return user;
}
const addUsertoDB = async (githubUser,mutuallyfriends) =>{
  console.log(githubUser)
    try{
      const mutuallyFriendsLogins = mutuallyfriends.map(friend => friend.login);
        const user = await User.create({
            username: githubUser.login,
            node_id: githubUser.node_id,
            avatar_url: githubUser.avatar_url,
            gravatar_id: githubUser.gravatar_id,
            url: githubUser.url,
            html_url: githubUser.html_url,
            followers_url: githubUser.followers_url,
            following_url: githubUser.following_url,
            gists_url: githubUser.gists_url,
            starred_url: githubUser.starred_url,
            subscriptions_url: githubUser.subscriptions_url,
            organizations_url: githubUser.organizations_url,
            repos_url: githubUser.repos_url,
            events_url: githubUser.events_url,
            received_events_url: githubUser.received_events_url,
            type: githubUser.type,
            site_admin: githubUser.site_admin,
            name: githubUser.name,
            company: githubUser.company,
            blog: githubUser.blog,
            location: githubUser.location,
            email: githubUser.email,
            hireable: githubUser.hireable,
            bio: githubUser.bio,
            twitter_username: githubUser.twitter_username,
            public_repos: githubUser.public_repos,
            public_gists: githubUser.public_gists,
            followers: githubUser.followers,
            following: githubUser.following,
            mutually_friends: mutuallyFriendsLogins,
         });
         return user;
     }catch(e){
      console.log(e)
       throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR,"User creation failed");
     }
}


const updateUser = async (username, updatedFields) => {
  try {
      const user = await User.findOneAndUpdate({ username }, updatedFields, { new: true });
      if (!user) {
          throw new ApiError(httpStatus.NOT_FOUND, "User not found");
      }
      return user;
  } catch (e) {
      console.log(e);
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "User update failed");
  }
};
const deleteUser= async(user_name)=>{
  try {
    const deletedUser = await User.findOneAndDelete({ username:user_name });
    if (!deletedUser) {
        throw new ApiError(httpStatus.NOT_FOUND, "User not found");
    }
    return deletedUser;
  } catch (e) {
      console.log(e);
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "User deletion failed");
  }
}
module.exports={
    getUser,
    getUserByUsername,
    addUsertoDB,
    deleteUser,
    updateUser

}