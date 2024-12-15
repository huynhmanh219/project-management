const Chat = require("../../models/chat.model");
const User = require("../../models/user.model");
//[GET] /chat
module.exports.index = async (req,res)=>{
    const userId = res.locals.user.id;    
    //socket
    _io.once("connection",(socket)=>{ // io.once chỉ load duy nhât một lần khác với io.on mỗi lần load trang là 1 làn load connection
        socket.on("CLIENT_SEND_MESSAGE",async (content)=>{
            //save in databe
            const chat = new Chat({
                user_id:userId,
                content:content
            });
            await chat.save();
        })
    })
    //end socket
    //lấy data từ db 
    const chats = await Chat.find({
        deleted:false
    });
    //end lấy data từ db 
    for (const chat of chats) {
        const infoUser = await User.findOne({
            _id:chat.user_id,
            deleted:false
        }).select("fullname");
        chat.infoUser = infoUser;
    } 

    res.render("client/pages/chat/index",
        {
            pageTitle:"Chat",
            chats : chats
        }
    )
}