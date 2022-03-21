function buscar() {
    /*ajuste da pokedex*/
    var pokedex = window.document.getElementsByClassName('pokedex-main')[0]
    pokedex.style.backgroundImage = 'url("pokedex-aberta.webp")'
    pokedex.style.backgroundSize = '100%'
    /*infos1 : componentes da primeira tela pokédex*/
    var imagem = window.document.getElementsByClassName('imagem-poke')[0]
    var nome = window.document.getElementsByClassName('nome-pokemon')[0]
    var idpoke = window.document.getElementsByClassName('id-pokemon')[0]
    var tipo = window.document.getElementsByClassName('tipo-pokemon')[0]
    var altura = window.document.getElementsByClassName('altura-pokemon')[0]
    var peso = window.document.getElementsByClassName('peso-pokemon')[0]
    /*infos2 : componentes da segunda tela pokédex*/
    var habilidade = window.document.getElementsByClassName('habilidade')[0]
    var habilidadeoculta = window.document.getElementsByClassName('habilidade-oculta')[0]
    var statuspadrao = window.document.getElementsByClassName('status-padrao')[0]
    var statusbox1 = window.document.getElementsByClassName('status1')[0]
    var statusbox2 = window.document.getElementsByClassName('status2')[0]
    /*mudar estilo do interior dos topicos da pokedex*/
    nome.style.borderStyle = 'dashed'
    nome.style.borderColor = '#302b2bc9'
    nome.style.backgroundColor = '#8df4f769'
    idpoke.style.borderStyle = 'dashed'
    idpoke.style.borderColor = '#302b2bc9'
    idpoke.style.backgroundColor = '#8df4f769'
    tipo.style.borderStyle = 'dashed'
    tipo.style.borderColor = '#302b2bc9'
    tipo.style.backgroundColor = '#8df4f769'
    altura.style.borderStyle = 'dashed'
    altura.style.borderColor = '#302b2bc9'
    altura.style.backgroundColor = '#8df4f769'
    peso.style.borderStyle = 'dashed'
    peso.style.borderColor = '#302b2bc9'
    peso.style.backgroundColor = '#8df4f769'
    

    var pesquisa = window.document.getElementsByClassName('pesquisa-sub-cabeçalho')[0]
    var nomepoke = pesquisa.value.toLowerCase()
    const url = `https://pokeapi.co/api/v2/pokemon/${nomepoke}`
    
    fetch(url)
    .then(resposta => {
        if (resposta.status == 200) {
        resposta.json()
        .then(dados => {
            var quanttipo = dados.types
            var quantabilit = dados.abilities

            /*tela-pokédex-1*/
            imagem.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${dados.id}.png`
            nome.innerHTML = `Nome:<br>${dados.name}`
            idpoke.innerHTML = `ID: ${dados.id}`

            if (quanttipo.length == 2) {
                tipo.innerHTML = `Tipo: ◾${dados.types[0].type.name}<br>◾${dados.types[1].type.name}`
            } else {tipo.innerHTML = `Tipo: ◾${dados.types[0].type.name}`}

            altura.innerHTML = `Altura comum: <br>${(Number(dados.height) / 10)}m`.replace('.', ',')
            peso.innerHTML = `Peso comum: ${(Number(dados.weight) / 10)}Kg`.replace('.', ',')
            /*tela-pokédex-2*/
            if (quantabilit.length == 2) {
                habilidade.innerHTML = `HABILIDADE: ${dados.abilities[0].ability.name}`
                habilidadeoculta.innerHTML = `HABILIDADE OCULTA: ${dados.abilities[1].ability.name}`
            } else {
                habilidade.innerHTML = `HABILIDADE: ${dados.abilities[0].ability.name}`
                habilidadeoculta.innerHTML = `HABILIDADE OCULTA: Não disponível`
            }
                
            statuspadrao.innerHTML = 'STATUS PADRÃO:'
            statusbox1.innerHTML = `HP: ${dados.stats[0].base_stat}<br>ATTACK: ${dados.stats[1].base_stat}<br>DEFENSE: ${dados.stats[2].base_stat}`
            statusbox2.innerHTML = `SPECIAL ATTACK: ${dados.stats[3].base_stat}<br>SPECIAL DEFENSE: ${dados.stats[4].base_stat}<br>SPEED: ${dados.stats[5].base_stat}`
            
            /*Movimentos dos pokémon*/ 
            var moves = dados.moves
            var movimentos = window.document.getElementsByClassName('movimentos')[0];
            movimentos.innerHTML = ''
            var counter = 0
            while (counter < moves.length) {
                var div_move = document.createElement('div')
                div_move.className = 'div-move'
                let movimento = document.createTextNode(`🔹${dados.moves[counter].move.name}`)
                div_move.appendChild(movimento)
                movimentos.appendChild(div_move)
                counter += 1
            }

            /*localização pokémon*/
            var localizaçao = window.document.getElementsByClassName('localizaçao')[0]
            localizaçao.innerHTML = ''
            fetch(`https://pokeapi.co/api/v2/pokemon/${dados.id}/encounters`)
            .then(response => {
                response.json()
                .then(data => {
                    if (data == '') {localizaçao.innerHTML = 'Desconhecida.'; localizaçao.style.backgroundImage = 'url("pokemon-confused.gif")'; localizaçao.style.height = '250px'; localizaçao.style.backgroundSize = '100%'; localizaçao.style.backgroundRepeat = 'no-repeat'; localizaçao.style.borderRadius = '20px';} else {
                        localizaçao.style.backgroundImage = ''
                        for (let elemento of data) {
                            var p = document.createElement('p')
                            p.className = 'locais'
                            let local = document.createTextNode(`🔸${elemento.location_area.name}`)
                            p.appendChild(local)
                            localizaçao.appendChild(p) 
                        }
                       
                    }
                })
            })
        })

        } else {throw new Error(resposta.status)}
    })

    .catch(erro => {
        window.alert('Erro ao buscar resultado.')
    })
}


/*Buscador de pokémon e suas ids para a lista*/
var count = 1
while (count < 898) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${count}`)
    .then(resposta => {
        resposta.json()
        .then(dados => {
            var lista_pokemons = window.document.getElementsByClassName('lista-pokemons-existentes')[0]
            var div = document.createElement('div')
            var img = document.createElement('img')
            var paragrafo = document.createElement('p')
            var nome_id = document.createTextNode(`Nome: ${dados.name} / ID:${dados.id}`)
            div.className = 'div-dos-pokemons'
            img.className = 'imagem-div-dos-pokemons'
            paragrafo.className = 'nome-id'
            img.src = `${dados.sprites.front_default}`
            paragrafo.appendChild(nome_id)
            div.appendChild(img)
            div.appendChild(paragrafo)
            lista_pokemons.appendChild(div)
        })
    })
    count += 1
}
