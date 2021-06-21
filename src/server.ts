import express from 'express'

const app = express();

app.get('/test', (request, response) => {
    // request => Entrando
    // response => Saindo

    return response.send('Olá Mundo (NLW)')
}) 

app.post('/test-post', (request, response) => {
    return response.send('Olá método post');
})

app.listen(3000, () => console.log("Server is running"))

