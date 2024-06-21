const express = require('express');
const mustacheExpress = require('mustache-express');
const db = require('./src/db')
const app = express();
const PORT = 8080;


app.engine('html', mustacheExpress());
app.set('view engine', 'html');
app.set('views', __dirname + '/src/views');
app.use(express.urlencoded({extended: true}));

db.sync(() => console.log('Conectado ao banco de dados'));

app.listen(PORT,function() {
    console.log('Hospedado na porta ' + PORT);
});
