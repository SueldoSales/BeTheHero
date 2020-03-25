const crypto = require('crypto');

const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const ongs = await connection('ongs').select('*');
    
        return response.json(ongs);
    },

    async create(request, response) {
        // Query Params: Parâmetros nomeados enviados na rota após "?" (Filtros, Paginação) 
        // const params = request.query;
        // console.log(params);

        // Route Params: Parâmetros utilizados para identificar recursos ('/users:id')
        // const params = request.params;
        // console.log(params);

        // Request Body: Corpo da requisição, utilizado para criar ou alterar recursos
        // const body = request.body;
        // console.log(body);

        // return response.json({
        //     evento: 'Semana OmniStack 11',
        //     aluno: 'Sueldo Sales',
        //     idade: '30'
        // });
        const { name, email, whatsapp, city, uf } = request.body;

        const id = crypto.randomBytes(4).toString('HEX');

        await connection('ongs').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf,
        });

        return response.json({id});
    }
};