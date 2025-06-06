var usuarioModel = require("../models/usuarioModel");

function autenticar(req, res) {
    var usuario = req.body.usuario;
    var email = req.body.email;
    var senha = req.body.senha;

    if (usuario == undefined) {
        res.status(400).send("Seu nome de usuário está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {

        usuarioModel.autenticar(usuario, email, senha)
            .then(
                function (resultadoAutenticar) {
                    console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String

                    if (resultadoAutenticar.length == 1) {
                        console.log("Usuário autenticado com sucesso!");
                        res.json({
                            id: resultadoAutenticar[0].id,
                            email: resultadoAutenticar[0].email,
                            nome: resultadoAutenticar[0].nome,
                            sobrenome: resultadoAutenticar[0].sobrenome,
                            data_nascimento: resultadoAutenticar[0].data_nascimento,
                            nome_usuario: resultadoAutenticar[0].nome_usuario,
                            genero: resultadoAutenticar[0].genero
                        });
                    } else if (resultadoAutenticar.length == 0) {
                        res.status(403).send("Email e/ou senha inválido(s)");
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                    }
                }).catch(
                    function (erro) {
                        console.log(erro);
                        console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                        res.status(500).json(erro.sqlMessage);
                    }
                );
    }

}

function cadastrar(req, res) {

    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var nome = req.body.nome;
    var sobrenome = req.body.sobrenome;
    var dataNascimento = req.body.dataNascimento;
    var genero = req.body.genero;
    var usuario = req.body.usuario;
    var email = req.body.email;
    var senha = req.body.senha;

    // Faça as validações dos valores
    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (sobrenome == undefined) {
        res.status(400).send("Seu sobrenome está undefined!");
    } else if (dataNascimento == undefined) {
        res.status(400).send("Sua data de nascimento está undefined!");
    } else if (genero == undefined) {
        res.status(400).send("Seu gênero está undefined!");
    } else if (usuario == undefined) {
        res.status(400).send("Seu usuário está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else {
        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.cadastrar(nome, sobrenome, dataNascimento, genero, usuario, email, senha)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function exibirFotoDoUsuario(req, res) {
    var usuarioId = req.params.usuarioId;

    if (usuarioId != null) {
        usuarioModel.exibirFotoDoUsuario(usuarioId)
            .then(function (resultado) {
                res.json(resultado[0]);
            })
            .catch(function (erro) {
                console.log(erro);
            }
            )
    }
}

function salvarDataHoraAcesso(req, res) {
    var usuarioId = req.body.id;

    if (usuarioId != null) {
        usuarioModel.salvarDataHoraAcesso(usuarioId)
            .then(function (resultado) {
                res.json(resultado);
            })
            .catch(function (erro) {
                console.log(erro);
            })
    }
}

function exibirMesMaisAcessadoPeloUsuario(req, res) {
    var usuarioId = req.params.usuarioId;

    if (usuarioId != null) {
        usuarioModel.exibirMesMaisAcessadoPeloUsuario(usuarioId)
            .then(function (resultado) {
                res.json(resultado);
            })
            .catch(function (erro) {
                console.log(erro);
            })
    }
}

function exibirMesMaisAcessadoNoGeral(req, res) {
    usuarioModel.exibirMesMaisAcessadoNoGeral()
        .then(function (resultado) {
            res.json(resultado);
        })
        .catch(function (erro) {
            console.log(erro);
        })
}

module.exports = {
    autenticar,
    cadastrar,
    exibirFotoDoUsuario,
    salvarDataHoraAcesso,
    exibirMesMaisAcessadoPeloUsuario,
    exibirMesMaisAcessadoNoGeral
}