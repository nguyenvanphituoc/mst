module.exports = function (mongoose) {

    var Schema = mongoose.Schema;
    var ProSchema = new Schema({
        name: { type: String, required: true },
        description: { type: String},
        price: { type: Number}
    });

    return mongoose.model('Product', ProSchema);
}
