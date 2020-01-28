const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const app = express();
const cors = require('cors');// extensão que tira o bloqueio da api rodar em um localhost e a web em outro impedindo o acesso de endereços. 
mongoose.connect('mongodb+srv://omnistack:12345@cluster0-atwx8.mongodb.net/week10?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
app.use(cors())// se quiser rodar online, so colocar o endereço do local com um origin:''conteudo''
// se nao, so deixar sem nada q ele roda com qualquer aplicação
app.use(express.json());
app.use(routes);
// metodos http : get, post, put e delete

// tipos de paramentros:

// Query Params: req.query (Filtros, ordenação, paginação,...)
// Route Params: request.params ( indentificar um recurso na alteração ou remoção)
// Body: request.body ( sao dados para criação ou alteração de um registro)

// Mongo DB (nao relacional)
app.listen(3333);