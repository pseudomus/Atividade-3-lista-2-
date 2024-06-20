const express = require('express');
const mustacheExpress = require('mustache-express');
const app = express();

app.engine('html', mustacheExpress());
app.set('view engine', 'html');
app.set('views', __dirname + '/src/views');
app.use(express.urlencoded({extended: true}));

const PORT = 8080;

app.listen(PORT,function() {
    console.log('Hospedado na porta ' + PORT);
});
