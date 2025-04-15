# Rastreador de Localização

Este projeto é um rastreador de localização simples que permite aos usuários enviar suas coordenadas geográficas e visualizar as localizações recebidas em uma interface web. O projeto é construído com Node.js e utiliza HTML e JavaScript para o frontend.

## Funcionalidades

- **Enviar Localização**: Os usuários podem capturar e enviar suas coordenadas geográficas.
- **Exibir Localizações**: Uma interface que exibe todas as localizações recebidas em tempo real.

## Tecnologias Utilizadas

- Node.js
- Express
- HTML
- JavaScript

## Pré-requisitos

Antes de começar, você precisará ter o Node.js instalado em sua máquina. Você pode baixar e instalar o Node.js a partir do [site oficial](https://nodejs.org/).

## Instalação

1. Clone o repositório:

   ```bash
   git clone https://github.com/Victor-Santana-2/Location-Capture.git
   cd rastreador-localizacao

2. Instale as Dependências:

   ```bash
   npm install

3. Execução:

   ```bash
   node server.js

O Servidor será iniciado em 'http://localhost:3000'

## Uso do projeto 

- Abra um navegador e acesse http://localhost:3000 para ser redirecionado para a página de envio.
- Clique no botão "Obter Localização" para capturar e enviar sua localização.
- Para visualizar as localizações recebidas, acesse http://localhost:3000/display, ou utilize o terminal do computador.

# Estrutura do Código

 rastreador-localizacao/
- server.js          # Código do servidor
- package.json       # Dependências do projeto
- public/            # Diretório para arquivos estáticos (HTML, CSS, JS)


