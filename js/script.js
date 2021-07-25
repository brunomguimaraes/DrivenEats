

function handleClick(divItem) {
    const subsecaoAtual = divItem.parentNode
    const itemSelecionado = subsecaoAtual.querySelector('.selecionado')


    if (itemSelecionado === null) {
        divItem.classList.add('selecionado')
    } else if (itemSelecionado === divItem) {
        divItem.classList.remove('selecionado')
    } else {
        itemSelecionado.classList.remove('selecionado')
        divItem.classList.add('selecionado')
    }

    const pedidoPronto = verificarPedido()
    const botaoFecharPedido = document.querySelector('.botao-fechar')
    const botaoFecharTexto = botaoFecharPedido.querySelector('span')

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