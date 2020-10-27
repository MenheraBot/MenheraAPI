const config = require("../../config.json")
const mongoose = require("mongoose")
mongoose.connect(config.uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err) => {
    if (err) return console.log(`(x) Error to connecting to database \n${err}`)
    console.log("[DATABASE] Conectado com sucesso à database")
})

let familiaSchema = new mongoose.Schema({
    _id: {
        type: String
    },
    abilities: {
        type: Array
    },
    boost: {
        type: Object
    },
    members: {
        type: Array,
        default: []
    },
    levelFamilia: {
        type: Number,
        default: 1
    },
    bank: {
        type: String,
        default: "0"
    },
    nextLevel: {
        type: String,
        default: "15000"
    }
});

let familia = mongoose.model("Familia", familiaSchema);
module.exports.familia = familia