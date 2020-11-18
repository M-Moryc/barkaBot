//this exists only to satisfy heroku port binding

const Express = require('express');
const app = Express();

app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), () => {
    console.log('Express server listening on port ' + app.get('port'));
});

module.exports = {app};