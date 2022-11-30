# Pokelex React

> A rewrite of [Pokelex](https://github.com/zshawdev/pokelex) using React, Typescript, and TailwindCSS

## Project Structure

```md
📦pokelex-react
 ┣ 📂pokelex-react-client 
 ┃  ┣ 📙webpack.config.js  }
 ┃  ┣ 📙postcss.config.js  }--> # config for various bundler/ postprocessing tools
 ┃  ┣ 📙tailwind.config.js }
 ┃  ┣ 📙babel.config.js    }
 ┃  ┣ 📂public   # all assets loaded on the client (images, manifest, etc)
 ┃  ┗ 📂src
 ┃     ┣ 📂components # base components that can be reused throughout the application            
 ┃     ┣ 📂hooks      # hooks that (for right now) store mostly context objects
 ┃     ┣ 📂layout     # components that strictly handle application structure/ layout
 ┃     ┣ 📂utils
 ┃     ┣ 📘api.ts       # server application interactoin
 ┃     ┣ 📔[clear.css, index.css] # base imported css styles
 ┃     ┣ ⚛️App.tsx      # Application entry point
 ┃     ┣ ⚛️index.tsx    # bootstrap
 ┃     ┗ 📄index.html   # template for webpack html copy plugin
 ┃
 ┣ 📂server 
 ┃  ┣ 📂[cries, images]  # static assets that are served from the server
 ┃  ┣ 📘app.ts           # base route logic
 ┃  ┣ 📘config.ts        # environment variable extraction
 ┃  ┣ 📘index.ts         # server entry point
 ┃  ┣ 📘pokeapi.ts       # pokeapi.co interaction and transformation
 ┃  ┗ 📘utils.ts
 ┃ 
 ┗ 📜custom.d.ts  # holds all global type declarations used in both client and server
```

## Motivation

PokéLex ("Pokédex" + "lexicon") is a website that combines an immersive language learning approach with the universally-loved, multimedia sensation that is Pokémon. Practice your foreign language skills by learning about the world's favorite mythical creatures via this interactive, multilingual encyclopedia!

## Prerequisites

* [NodeJS](https://nodejs.org/en/download/) version 16+

## Getting Started

```bash
npm install
npm start
```

That's it!

## 🏗 Built With

* [NodeJS](https://nodejs.org/en/) - Node.js® is a JavaScript runtime built on Chrome's V8 JavaScript engine.
* [Typescript](https://www.typescriptlang.org/) - TypeScript is a strongly typed programming language that builds on JavaScript
* [Express](https://expressjs.com/) - A minimalist web framework for Node.js
* [React](https://reactjs.org/) - JS library for building rich user interfaces
* [TailwindCSS](https://tailwindcss.com/) - Utility first CSS framework

## 📸 Screenshots

PokéLex boasts a slick interface and parallels many of the functionalities of the actual Pokédex device as featured throughout the famous video game series:
![Base Features](repo-resources/pokedex-readme.png)
![Other Features](repo-resources/pokedex-readme-m.png)

## TODO

## 🛣 Roadmap

* Spanish, Italian and Japanese as language options
* Options for choosing additional information per Pokémon
* Expand Pokémon list to all current Pokémon
* Additional Pokédex features (world locations, evolutions, additional search sorts and filters)
* Auto-generated TypeScript interfaces for data from PokéAPI
* Containerize application for deployment anywhere
