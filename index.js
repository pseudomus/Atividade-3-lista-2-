const express = require('express');
const mustacheExpress = require('mustache-express');
const sequelize = require('./src/db')
const app = express();
const PORT = 8080;


app.engine('html', mustacheExpress());
app.set('view engine', 'html');
app.set('views', __dirname + '/src/views');
app.use(express.urlencoded({extended: true}));

sequelize.authenticate();
console.log('Conectado ao banco de dados');

app.listen(PORT,function() {
    console.log('Hospedado na porta ' + PORT);
});

// const sequelize = require('./src/db');
// const User = require('./src/models/User');
// const FinancialGoal = require('./src/models/FinancialGoal');
// const Transaction = require('./src/models/Transaction');

// (async () => {
//     try {
//         await sequelize.authenticate();
//         console.log('Conexão estabelecida com sucesso.');

//         await sequelize.sync({ force: true }); 
//         console.log('Modelos sincronizados com sucesso.');

//         const newUser = await User.create({
//             username: 'john_doe2',
//             email: 'john@example.com',
//             password: 'securepassword123',
//         });

//         const newGoal = await FinancialGoal.create({
//             title: 'Poupar para viagem',
//             description: 'Economizar dinheiro para uma viagem internacional.',
//             targetAmount: 5000.00,
//             deadline: new Date('2025-12-31'),
//             userId: newUser.id, 
//         });

//         const newTransaction = await Transaction.create({
//             amount: 250.00,
//             date: new Date(),
//             description: 'Depósito inicial',
//             userId: newUser.id, 
//         });


//     } catch (error) {
//         console.error('Não foi possível conectar ao banco de dados:', error);
//     } finally {
//         await sequelize.close();
//     }
// })();
