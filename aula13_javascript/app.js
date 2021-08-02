// Incluido a biblioteca
const http = require('http');
const queryString = require('query-string');
const url = require('url');
const fs = require('fs');


// Definição de endereço / url
const hostname = '127.0.0.1'; // localhost
const port = 3000;

// Implemetação da regra de negócio
const server = http.createServer((req, res) => {     

    var resposta;
    const urlparse = url.parse(req.url, true);

     // Receber informacoes do usuario
     const params = queryString.parse(urlparse.search);
    
        // Criar um usuario - Atualizar um usuario
        if(urlparse.pathname == '/criar-atualizar-usuario'){            

        // Salvar as informacoes
        fs.appendFile('users/' + params.id + '.txt', JSON.stringify(params), function (err) {
            if (err) throw err;
            console.log('Saved!');

            resposta = 'Usuario criado com sucesso';

            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/plain');
            res.end(resposta);
          });          

        // Selecionar usuario 
        } else if(urlparse.pathname == '/selecionar-usuario') {
            fs.readFile('users/' + params.id + '.txt', function(err, data) {
               resposta = data;
               
               res.statusCode = 200;
               res.setHeader('Content-Type', 'application/json');
               res.end(resposta);
              });
        }                 

        // Remover usuario  
        else if(urlparse.pathname == '/remover-usuario') {
            fs.unlink('users/' + params.id + '.txt', function (err) {
               console.log('File deleted!');

               resposta = err ? "Usuario nao encontrado" : "Usuario removido.";

               res.statusCode = 200;
               res.setHeader('Content-Type', 'text/plain');
               res.end(resposta);
              });   
}  
});

        // Execução
        server.listen(port, hostname, () => {
            console.log(`server running at http://${hostname}:${port}/ `);
        })

// localhost:3000/criar-atualizar-usuario?nome=beto&idade=93&id=1
// localhost:3000/criar-atualizar-usuario?nome=beto&idade=43&id=1
// localhost:3000/selecionar-usuario?id=1
// localhost:3000/remover-usuario?id=1