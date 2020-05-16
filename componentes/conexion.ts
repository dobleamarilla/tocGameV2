var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/testeze', { useNewUrlParser: true, useUnifiedTopology: true }).catch(err => {
    console.log(err);
});
mongoose.set('useFindAndModify', false);
exports.mongoose = mongoose;