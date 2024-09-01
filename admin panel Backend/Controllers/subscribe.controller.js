const { subscribeService, getSubscribeService, unSubscribeService, deleteService, blockService, statusService } = require("../Services/subscribe.service")

exports.subscribeController=async (req,res)=>{
try {
    const response=await subscribeService(req);
    return res.status(200).json(response)
} catch (error) {
    console.log("🚀 ~ exports.subscribeController= ~ error:", error)
    return res.status(400).json({error:error});
}
}

exports.getSubscribersController=async (req,res)=>{
    try {
        const response=await getSubscribeService(req);
        return res.status(200).json(response)
    } catch (error) {
        console.log("🚀 ~ exports.getSubscribersController= ~ error:", error)
        return res.status(400).json({error:error});
    }
}
exports.unSubscribersController=async (req,res)=>{
    try {
        const response=await unSubscribeService(req);
        return res.status(200).json(response)
    } catch (error) {
        console.log("🚀 ~ exports.unSubscribersController= ~ error:", error)
       
        return res.status(400).json({error:error});
    }
}
exports.deleteController=async (req,res)=>{
    try {
        const response=await  deleteService(req);
        return res.status(200).json(response)
    } catch (error) {
        console.log("🚀 ~ exports.deleteController ~ error:", error)
       
        return res.status(400).json({error:error});
    }
}
exports.blockController=async (req,res)=>{
    try {
        const response=await  blockService(req);
        return res.status(200).json(response)
    } catch (error) {
        console.log("🚀 ~ exports.blockController= ~ error:", error)
       
        return res.status(400).json({error:error});
    }
}
exports.statusController=async (req,res)=>{
    try {
        const response=await  statusService(req);
        return res.status(200).json(response)
    } catch (error) {
        console.log("🚀 ~ exports.blockController= ~ error:", error)
       
        return res.status(400).json({error:error});
    }
}
 