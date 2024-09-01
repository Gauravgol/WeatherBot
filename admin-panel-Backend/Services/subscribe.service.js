const User = require('../Models/user.model.js')

exports.subscribeService = async (req) => {

    try {
        console.log("🚀 ~ exports.subscribeService=async ~ req:", req.body)
        const { userId } = req.body
        const response = await User.findOne({ userid: userId })
        console.log("🚀 ~ exports.subscribeService= ~ response:", response)
        if (!response) {
            const addUser = await User.create({
                userid: userId,
                isSubscribed: true,
                subscribedDate: new Date()
            })
            return { status: true, message: "You Have successfully subscribed " }
        }
        else {

            if (response.isSubscribed === true) {
                return { status: true, message: "you have already subscribed" }
            }
            else {
                const updateUser = await User.findOneAndUpdate({ userid: userId }, {
                    isSubscribed: true
                })
                return { status: true, message: "You Have successfully subscribed " }
            }
        }


    } catch (error) {
        console.log("🚀 ~ exports.subscribeService=async ~ error:", error)
        return { status: false, error: error }
    }
}

exports.getSubscribeService = async (req) => {

    try {
        console.log("🚀 ~ exports.getSubscribeService=async",req.query)
        let subscribes

        if (req.query.identifier === 'admin') {
            subscribes = await User.find({})
            console.log("🚀 ~ exports.getSubscribeService= ~ subscribes:", subscribes)

        } else {
            console.log("ji")
            subscribes = await User.find({ isSubscribed: true,isBlocked:false }).select("userid ")
            console.log("🚀 ~ exports.getSubscribeService= ~ subscribes:", subscribes)
        }
        if (subscribes) {
            return { status: true, message: "fetched subscribers List", data: subscribes }
        }
        else {
            return { status: false, message: "no subscribes found" }
        }
    } catch (error) {
        console.log("🚀 ~ exports.getSubscribeService= ~ error:", error)

        return { status: false, error: error }
    }
}

exports.unSubscribeService = async (req) => {


    try {
        console.log("🚀 ~ exports.unSubscribeService= ~ req:", req.body)
        const { userId } = req.body
        const updateUser = await User.findOneAndUpdate({ userid: userId }, { isSubscribed: false })
        if (updateUser) {
            return { status: true, message: "sucessfully unsubscribed" }
        }
        else {
            return { status: false, message: "User not found" }
        }
    } catch (error) {
        console.log("🚀 ~ exports.unSubscribeService= ~ error:", error)
        return { status: false, error: error }
    }
}
exports.deleteService = async (req) => {


    try {
        console.log("🚀 ~ exports.deleteService ~ req:", req.body)
        const { userId } = req.body
        const updateUser = await User.deleteOne({ userid: userId })
        if (updateUser) {
            return { status: true, message: "user deleted successfully" }
        }
        else {
            return { status: false, message: "User not found" }
        }
    } catch (error) {
        console.log("🚀 ~ exports.deleteService ~ error:", error)

        return { status: false, error: error }
    }
}
exports.blockService = async (req) => {

    try {
console.log("🚀 ~ exports.blockService= ~ req:", req.body)
        
        const { userId,identifier } = req.body
        let setUser=identifier==='block'?true:false
        
        const updateUser = await User.findOneAndUpdate({ userid: userId },{isBlocked:setUser})
        if (updateUser) {
            return { status: true, message: `user ${identifier} successfully` }
        }
        else {
            return { status: false, message: "User not found" }
        }
    } catch (error) {
        console.log("🚀 ~ exports.blockService= ~ error:", error)
        return { status: false, error: error }
    }
}
exports.statusService = async (req) => {

    try {
        console.log("🚀 ~ exports.statusService= ~ statusService:", req.body)
        
        const { userId } = req.body
        
        const user = await User.findOne({ userid: userId })
        if (user) {
            return { status: true, message: `user found` ,data:user}
        }
        else {
            return { status: false, message: "User not found" }
        }
    } catch (error) {
        console.log("🚀 ~ exports.statusService= ~ error:", error)
         
        return { status: false, error: error }
    }
}



