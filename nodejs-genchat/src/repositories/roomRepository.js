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

module.exports = {
    createRoom
}