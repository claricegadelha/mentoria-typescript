console.log('Arquivo de testes. Pode mexer nele como quiser.')

// Um desenvolvedor tentou criar um projeto que consome a base de dados de filme do TMDB para criar um organizador de filmes, mas desistiu 
// pois considerou o seu código inviável. Você consegue usar typescript para organizar esse código e a partir daí aprimorar o que foi feito?

// A ideia dessa atividade é criar um aplicativo que: 
//    - Busca filmes
//    - Apresenta uma lista com os resultados pesquisados
//    - Permite a criação de listas de filmes e a posterior adição de filmes nela

// Todas as requisições necessárias para as atividades acima já estão prontas, mas a implementação delas ficou pela metade (não vou dar tudo de graça).
// Atenção para o listener do botão login-button que devolve o sessionID do usuário
// É necessário fazer um cadastro no https://www.themoviedb.org/ e seguir a documentação do site para entender como gera uma API key https://developers.themoviedb.org/3/getting-started/introduction

// import { 
// 	get,
// 	procurarFilme, 
// 	criarRequestToken, 
// 	logar, 
// 	criarSessao, 
// } from "./modulos";

type body1 = {
	username: string,
	password: string,
	request_token: string
}

type body2 = {
	name: string,
	description: string,
	language: string
}

type body3 = {
	media_id: string
}

interface get {
	url: string,
	method: string, 
	body?: body1 | body2 | body3| string | null
}

type results = {
	adult: boolean,
	backdrop_path: string,
    genre_ids: number[],
	id: number,
	original_language: string,
	original_title: string,
	overview: string,
	popularity: number,
	poster_path: string,
	release_date: string,
	title: string,
	video: false,
	vote_average: number,
	vote_count: number
}

interface procurarFilme {
	page: number,
	results: results[],
	total_pages: number,
	total_results: number
}

type genres = {
	id: number,
	name: string
}

type production_companies = {
      id: number,
      logo_path: string | null,
      name: string,
      origin_country: string
    }

type production_countries = {
      iso_3166_1: string,
      name: string
}

type spoken_languages = {
	english_name: string,
	iso_639_1: string,
	name: string
}

interface adicionarFilme {
	adult: boolean,
	backdrop_path: string,
	belongs_to_collection: null,
	budget: number,
	genres: genres[],
	homepage: string,
	id: number,
	imdb_id: string,
	original_language: string,
	original_title: string,
	overview: string,
	popularity: number,
	poster_path: string,
	production_companies: production_companies[],
	production_countries: production_countries[],
	release_date: string,
	revenue: number,
	runtime: number,
	spoken_languages: spoken_languages[],
	status: string,
	tagline: string,
	title: string,
	video: boolean,
	vote_average: number,
	vote_count: number
}

interface criarRequestToken {
	success: boolean,
	expires_at: string,
	request_token: string
}

interface logar {
	success: boolean,
	status_code: number,
	status_message: string
}

interface criarSessao {
	success: boolean,
	failure: boolean,
	status_code: number,
	status_message: string,
	session_id: string
}


var apiKey: string = '0ff2baf4a2100c00a6dea3e210a5a99a';
let requestToken: string;
let username: string;
let password: string;
let sessionId: string;
let listId: string = '7101979';

let loginButton = document.getElementById('login-button') as HTMLButtonElement;
let searchButton = document.getElementById('search-button') as HTMLButtonElement;
let searchContainer = document.getElementById('search-container') as HTMLDivElement;

loginButton.addEventListener('click', async () => {
	await criarRequestToken();
	await logar();
	await criarSessao();
})

searchButton.addEventListener('click', async () => {
	let lista = document.getElementById("lista") as HTMLInputElement;
	if (lista) {
		lista.outerHTML = "";
	}
	let query = (document.getElementById('search') as HTMLInputElement).value;
	let listaDeFilmes = await procurarFilme(query);
	let ul = document.createElement('ul');
	ul.id = "lista"
	for (const item of listaDeFilmes.results) {
		let li = document.createElement('li');
		li.appendChild(document.createTextNode(item.original_title))
		ul.appendChild(li)
	}
	console.log(listaDeFilmes);
	searchContainer.appendChild(ul);
})

function preencherSenha() {
	password = (document.getElementById('senha') as HTMLInputElement).value;
	validateLoginButton();
}

function preencherLogin() {
	username = (document.getElementById('login') as HTMLInputElement).value;
	validateLoginButton();
}

function preencherApi() {
	apiKey = (document.getElementById('api-key') as HTMLInputElement).value;
	validateLoginButton();
}

function validateLoginButton() {
	if (password && username && apiKey) {
		loginButton.disabled = false;
	} else {
		loginButton.disabled = true;
	}
}

class HttpClient {
	static async get({ url, method, body = null }: get){
		return new Promise((resolve, reject) => {
			let request = new XMLHttpRequest();
			request.open(method, url, true);

			request.onload = () => {
				if (request.status >= 200 && request.status < 300) {
					resolve(JSON.parse(request.responseText));
				} else {
					reject({
						status: request.status,
						statusText: request.statusText
					})
				}
			}
			request.onerror = () => {
				reject({
					status: request.status,
					statusText: request.statusText
				})
			}

			if (body) {
				request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
				body = JSON.stringify(body);
			}
			request.send(body);
		})
	}
}

async function procurarFilme(query: string) {
	query = encodeURI(query)
	console.log(query)
	let result = await HttpClient.get({
		url: `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`,
		method: "GET"
	})
	return result as procurarFilme
}

async function adicionarFilme(filmeId: string) {
	let result = await HttpClient.get({
		url: `https://api.themoviedb.org/3/movie/${filmeId}?api_key=${apiKey}&language=en-US`,
		method: "GET"
	})
	console.log(result);
}

async function criarRequestToken() {
	let result = await HttpClient.get({
		url: `https://api.themoviedb.org/3/authentication/token/new?api_key=${apiKey}`,
		method: "GET"
	})
	requestToken = (result as criarRequestToken).request_token
	console.log("RequestToken criado com sucesso!")
}

async function logar() {
	await HttpClient.get({
		url: `https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=${apiKey}`,
		method: "POST",
		body: {
			username: `${username}`,
			password: `${password}`,
			request_token: `${requestToken}`
		}
	})
	console.log("Logado com sucesso!")
}

async function criarSessao() {
	let result = await HttpClient.get({
		url: `https://api.themoviedb.org/3/authentication/session/new?api_key=${apiKey}&request_token=${requestToken}`,
		method: "GET"
	})
	sessionId = (result as criarSessao).session_id;
	console.log("Sessão criada com sucesso!")
}

async function criarLista(nomeDaLista: string, descricao: string) {
	let result = await HttpClient.get({
		url: `https://api.themoviedb.org/3/list?api_key=${apiKey}&session_id=${sessionId}`,
		method: "POST",
		body: {
			name: nomeDaLista,
			description: descricao,
			language: "pt-br"
		}
	})
	console.log(result);
}

async function adicionarFilmeNaLista(filmeId: string, listaId: string) {
	let result = await HttpClient.get({
		url: `https://api.themoviedb.org/3/list/${listaId}/add_item?api_key=${apiKey}&session_id=${sessionId}`,
		method: "POST",
		body: {
			media_id: filmeId
		}
	})
	console.log(result);
}

async function pegarLista() {
	let result = await HttpClient.get({
		url: `https://api.themoviedb.org/3/list/${listId}?api_key=${apiKey}`,
		method: "GET"
	})
	console.log(result);
}

{/* 
	<div class="flex-container">
		<div class="login-container">
			<input id="login" placeholder="Login" onchange="preencherLogin(event)">
			<input id="senha" placeholder="Senha" type="password" onchange="preencherSenha(event)">
			<input id="api-key" placeholder="Api Key" onchange="preencherApi()">
			<button type="submit" id="login-button" disabled>Login</button>
		</div>
		<div class="search-container" id="search-container">
			<input id="search" placeholder="Escreva...">
			<button type="submit" id="search-button">Pesquisar Filme</button>
		</div>
	</div>
*/}

{/*
	.flex-container{
		display: flex;
	}
	.login-container{
		display: flex; 
		width: 300px; 
		height: 100px; 
		justify-content: space-between; 
		flex-direction: column;
	}
	
	.search-container{
		margin-left: 20px
	}
*/}