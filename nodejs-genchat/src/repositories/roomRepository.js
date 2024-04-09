const {Room} = require("../models/index")

const createRoom = async(users, relationship)=>{
    try {
        await Room.create({
            users, relationship
        })
    } catch (error) {
        console.log(error)
        throw new Error(error)
    }
}
// findRoomByPhoneNumber
const findRoomByPhoneNumber = async(phoneNumber) =>{
    try {
        const room = Room.findOne({phoneNumber})
        if(!room){
            throw new Error("Room is not exist!")
        }
        return room;
    } catch (error) {
        console.log(error)
        throw new Error(error)
    }
}
module.exports = {
    findRoomByPhoneNumber,
    createRoom
}