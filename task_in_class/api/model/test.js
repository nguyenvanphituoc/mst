var mongoose = require('mongoose');
var CURRENCY_UNIT = ["VND", "USD", "EURO"];

module.exports.NecTemplate = {
    "package": "jarsId",
    "tasks": {
      "01": {
        "name": "dong tien hoc phi",
        "description": " ",
        "created":"10-10-2017 00:00AM GM+7",
        "monney": {
          "currency": 3456789,
          "unit": ["VND", "USD", "EURO"],
          "display": "3456789 VND"
        },
        "completed": false
      },
      "29":{
        "name": "kiem cho lam",
        "description": " ",
        "monney": {
          "currency": 3456789,
          "unit": ["VND", "USD", "EURO"],
          "display": "3456789 VND"
        },
        "created":"10-10-2017 00:00AM GM+7",
        "completed": false
      }
    },
    "totalTask": 2,
    "totalMonney": {
      "currency": 3456789,
      "unit": ["VND", "USD", "EURO"],
      "display": "3456789 VND"
    }
};

Schema = mongoose.Schema;
var NecJarSchema = new Schema({
    package:{type: Schema.Types.ObjectId},
    tasks: {type: Object},
    totalTask: {type: Number},
    totalMonney: {type: Number, default: 0, min: [0, 'what is a negative monney?']}
});
module.exports.NecJarModel = mongoose.model('NEC', NecJarSchema);