// Como podemos melhorar o esse código usando TS? 

type profissao = 'Atriz' | 'Padeiro'

type pessoa = {
	nome: string;
	idade: number;
	profissao?: profissao;
}

let pessoa1: pessoa = {
	nome: 'Maria',
	idade: 29,
	profissao: 'Atriz'
}

let pessoa2: pessoa = {
	nome: 'Roberto',
	idade: 19,
	profissao: 'Padeiro',
}

let pessoa3: pessoa = {
	nome: 'Laura',
    idade: 32,
    profissao: 'Atriz'
};

let pessoa4: pessoa = {
	nome: 'Carlos',
    idade: 19,
    profissao: 'Padeiro'
}