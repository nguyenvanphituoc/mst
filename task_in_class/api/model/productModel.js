module.exports = function (mongoose) {

    let nameValidators = [
        {
            validator: (name) => {
                return /[a-zA-Z0-9]+/.test(name);
            },
            message: "name must between a-z, 0-9"
        },
        {
            validator: (name) => {
                return name.length <= 100 && name.length >= 5;
            },
            message: "name lenght must less than 100 and more than 5"
        }
    ]

    let descriptionValidators = [
        {
            validator: (descript) => {
                return descript.length <= 500 && descript.length >= 20;
            },
            message: "descript lenght must less than 500 and more than 20"
        }
    ]

    let priceValidators = [
        {
            validator: (price) => {
                return price > 0;
            },
            message: "price must be greater than zero"
        }
    ]

    var Schema = mongoose.Schema;
    var ProSchema = new Schema({
        name: { type: String, required: true, validate: nameValidators },
        description: { type: String, validate: descriptionValidators},
        price: { type: Number, required: true, validate: priceValidators}
    });
    ProSchema.index({name: "text", description: "text"});
    return mongoose.model('Product', ProSchema);
}
