var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/tocgame', { useNewUrlParser: true, useUnifiedTopology: true }).catch(err => {
    console.log(err);
});
mongoose.set('useFindAndModify', false);
exports.mongoose = mongoose;
//# sourceMappingURL=conexion.js.map