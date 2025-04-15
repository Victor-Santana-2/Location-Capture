const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static('public')); // Para servir arquivos estáticos

let locations = []; // Array para armazenar as localizações

// Endpoint para receber a localização
app.post('/send-location', (req, res) => {
    const { latitude, longitude } = req.body;
    locations.push({ latitude, longitude, timestamp: new Date() });
    console.log(`Localização recebida: Latitude: ${latitude}, Longitude: ${longitude}`);
    res.sendStatus(200);
});

// Rota padrão que redireciona para a página de envio
app.get('/', (req, res) => {
    res.redirect('/send');
});

// Endpoint para servir a página de envio
app.get('/send', (req, res) => {
    res.send(`
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Enviar Localização</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 20px;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
        }
        .container {
            background: white;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            padding: 20px;
            text-align: center;
            width: 300px;
        }
        h1 {
            color: #333;
        }
        button {
            background-color: #28a745;
            color: white;
            border: none;
            border-radius: 5px;
            padding: 10px 15px;
            cursor: pointer;
            font-size: 16px;
            transition: background-color 0.3s;
        }
        button:hover {
            background-color: #218838;
        }
        .message {
            margin-top: 15px;
            font-size: 14px;
            color: #555;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Enviar Localização</h1>
        <button id="getLocation">Obter Localização</button>
        <div class="message" id="message"></div>
    </div>
    <script>
        document.getElementById('getLocation').onclick = function() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function(position) {
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;
                    fetch('/send-location', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ latitude, longitude })
                    })
                    .then(response => {
                        const messageElement = document.getElementById('message');
                        if (response.ok) {
                            messageElement.textContent = "Localização enviada com sucesso!";
                            messageElement.style.color = "green";
                        } else {
                            messageElement.textContent = "Erro ao enviar localização.";
                            messageElement.style.color = "red";
                        }
                    })
                    .catch(error => {
                        console.error("Erro na requisição: ", error);
                        document.getElementById('message').textContent = "Erro na requisição.";
                    });
                }, function(error) {
                    console.error("Erro ao obter localização: ", error);
                    document.getElementById('message').textContent = "Erro ao obter localização.";
                });
            } else {
                alert("Geolocalização não é suportada por este navegador.");
            }
        };
    </script>
</body>
</html>
    `);
});

// Endpoint para servir a página de exibição
app.get('/display', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="pt-BR">
        <head>
            <meta charset="UTF-8">
            <title>Exibir Localizações</title>
        </head>
        <body>
            <h1>Localizações Recebidas</h1>
            <ul id="locationList"></ul>
            <script>
                function updateLocationList() {
                    fetch('/get-locations')
                        .then(response => response.json())
                        .then(data => {
                            const locationList = document.getElementById('locationList');
                            locationList.innerHTML = '';
                            data.forEach(location => {
                                const listItem = document.createElement('li');
                                listItem.textContent = \`Latitude: \${location.latitude}, Longitude: \${location.longitude}, Timestamp: \${location.timestamp}\`;
                                locationList.appendChild(listItem);
                            });
                        });
                }

                setInterval(updateLocationList, 2000);
            </script>
        </body>
        </html>
    `);
});

// Endpoint para retornar as localizações armazenadas
app.get('/get-locations', (req, res) => {
    res.json(locations);
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});