//mongoose
const { rejects } = require('assert');
const mongoose = require('mongoose')
let todotable;
exports.Conn = () => {
    return new Promise((resolve, rejects) => {
        console.log("connected")
        mongoose.connect('mongodb://localhost:27017/sanosh');
        const TODO_SCHMEA = new mongoose.Schema({
            list: {
                type: String,
                required: true
            },
            from_who: {
                type: String,
                required: true
            }
        })
        todotable = new mongoose.model('todo', TODO_SCHMEA);
        console.log(todotable)
        resolve(todotable);
    })

}

exports.items = (data) => {
    return new Promise((resolve, reject) => {
        todotable.find({ from_who: data }, (err, data) => {
            if (err) {
                reject(new Error("cannot find data"))
            } else {
                // console.log(data)
                resolve(data)
            }
        })
    })
}

exports.delete = (data, from) => {
    return new Promise((resolve, rejects) => {
        console.log("on delete data", data)
        todotable.deleteOne({ list: data, from_who: from }, (err, data) => {
            if (err) {
                console.log("error on deleting", err)
                rejects(err);
            } else {
                resolve(data)
            }
        })
    })
}