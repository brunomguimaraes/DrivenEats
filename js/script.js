

function handleClick(divItem) {
    const subsecaoAtual = divItem.parentNode
    const itemSelecionado = subsecaoAtual.querySelector('.selecionado')

    const botaoFecharPedido = document.querySelector('.botao-fechar')
    const botaoFecharTexto = botaoFecharPedido.querySelector('span')

    if (itemSelecionado === null) {
        divItem.classList.add('selecionado')
    } else if (itemSelecionado === divItem) {
        divItem.classList.remove('selecionado')
    } else {
        itemSelecionado.classList.remove('selecionado')
        divItem.classList.add('selecionado')
    }

    const pedidoPronto = verificarPedido()

    if (pedidoPronto) {
        botaoFecharPedido.classList.add('botao-verde')
        botaoFecharTexto.innerHTML = 'Fechar pedido'
    } else {
        botaoFecharPedido.classList.remove('botao-verde')
        botaoFecharTexto.innerHTML = 'Selecione os 3 itens<br>para fechar o pedido'
    }
}

function verificarPedido() {
    if ( !temItemSelecionado('.comida')) return false
    if ( !temItemSelecionado('.bebida')) return false
    if ( !temItemSelecionado('.sobremesa')) return false
    return true
}

function temItemSelecionado(cssSelectorSubsecao) {
    const subsecao = document.querySelector(cssSelectorSubsecao)
    return subsecao.querySelector('.selecionado') !== null
}

function fecharPedido() {
    const pedidoPronto = verificarPedido()

    if (! pedidoPronto) return

    const numeroRestaurante = '5548984658779'
    const urlBase = `https://wa.me/${numeroRestaurante}?text=`

    const nomeComida = pegarNomeItemSelecionadoDaSubsecao('.comida')
    const nomeBebida = pegarNomeItemSelecionadoDaSubsecao('.bebida')
    const nomeSobremesa = pegarNomeItemSelecionadoDaSubsecao('.sobremesa')

    let precoComida = pegarPrecoItemSelecionadoDaSubsecao('.comida')
    let precoBebida = pegarPrecoItemSelecionadoDaSubsecao('.bebida')
    let precoSobremesa = pegarPrecoItemSelecionadoDaSubsecao('.bebida')

    precoComida = tratarPreco(precoComida)
    precoBebida = tratarPreco(precoBebida)
    precoSobremesa = tratarPreco(precoSobremesa)

    let precoTotal = precoComida + precoBebida + precoSobremesa

    precoTotal = precoTotal.toFixed(2)

    let mensagemPedido = `Olá, gostaria de fazer o pedido:
    - Prato: ${nomeComida}
    - Bebida: ${nomeBebida}
    - Sobremesa: ${nomeSobremesa}
    Total: R$ ${precoTotal}`

    const urlCompleta = urlBase + encodeURIComponent(mensagemPedido)

    window.open(urlCompleta)
}

function pegarNomeItemSelecionadoDaSubsecao(cssSelectorSubsecao) {
    const itemSelecionado = document.querySelector(cssSelectorSubsecao)

    const nomeItem = itemSelecionado.querySelector('.nome-item').innerHTML
    return nomeItem
}

function pegarPrecoItemSelecionadoDaSubsecao(cssSelectorSubsecao) {
    const itemSelecionado = document.querySelector(cssSelectorSubsecao)

    const precoItem = itemSelecionado.querySelector('.preco').innerHTML
    return precoItem
}

function tratarPreco(stringPreco) {
    const stringPrecoTratada = stringPreco.replace('R$ ', '').replace(',', '.')
    return Number(stringPrecoTratada)
}