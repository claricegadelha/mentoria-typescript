export type body1 = {
	username: string,
	password: string,
	request_token: string
}

export type body2 = {
	name: string,
	description: string,
	language: string
}

export type body3 = {
	media_id: string
}

export interface get {
	url: string,
	method: string, 
	body?: body1 | body2 | body3| string | null
}

export type results = {
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

export interface procurarFilme {
	page: number,
	results: results[],
	total_pages: number,
	total_results: number
}

export type genres = {
	id: number,
	name: string
}

export type production_companies = {
      id: number,
      logo_path: string | null,
      name: string,
      origin_country: string
    }

export type production_countries = {
      iso_3166_1: string,
      name: string
}

export type spoken_languages = {
	english_name: string,
	iso_639_1: string,
	name: string
}

export interface adicionarFilme {
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

export interface criarRequestToken {
	success: boolean,
	expires_at: string,
	request_token: string
}

export interface logar {
	success: boolean,
	status_code: number,
	status_message: string
}

export interface criarSessao {
	success: boolean,
	failure: boolean,
	status_code: number,
	status_message: string,
	session_id: string
}