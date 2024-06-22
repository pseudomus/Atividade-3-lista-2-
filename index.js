const express = require('express');
const mustacheExpress = require('mustache-express');
const session = require('express-session');
const sequelize = require('./src/db');
const authRoutes = require('./src/routes/authRoutes');
const goalRoutes = require('./src/routes/goalRoutes');
const transactionRoutes = require('./src/routes/transactionRoutes');
const mainRoutes = require('./src/routes/mainRoutes');

const app = express();
const PORT = 8080;

app.engine('html', mustacheExpress());
app.set('view engine', 'html');
app.set('views', __dirname + '/src/views');

app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false,
}));

app.use('/', goalRoutes);
app.use('/', authRoutes);
app.use('/', transactionRoutes);
app.use('/', mainRoutes);

sequelize.authenticate()
    .then(() => {
        console.log('Conectado ao banco de dados');
        return sequelize.sync({ force: true });
    })
    .then(async () => {
        console.log('Modelos sincronizados com sucesso');

        // Criar um novo usuário para testes
        const bcrypt = require('bcrypt');
        const User = require('./src/models/User');
        const hashedPassword = await bcrypt.hash('senhateste123', 10);
        await User.create({
            username: 'teste_nome',
            email: 'teste@teste.com',
            password: hashedPassword,
        });

        app.listen(PORT, function() {
            console.log('Hospedado na porta ' + PORT);
        });
    })
    .catch(err => {
        console.error('Erro ao conectar ao banco de dados ou sincronizar modelos:', err);
    });
