
const paginacao_1 = new Paginacao('paginacao_1', buscar_1);
const paginacao_2 = new Paginacao('paginacao_2', buscar_2);

function inicio_1(lista, total_registros) {
    document.getElementById('total_registros_1').innerHTML = `<b>Total:</b> ${total_registros}`;
    carregarListaTabela(lista,'tbody_tabela_1');
}

function inicio_2(lista, total_registros) {
    document.getElementById('total_registros_2').innerHTML = `<b>Total:</b> ${total_registros}`;
    carregarListaTabela(lista,'tbody_tabela_2' );
}

function carregarListaTabela(lista, id_tbody) {
    const tbody = document.getElementById(id_tbody);
    tbody.innerHTML = '';

    lista.forEach(item => {
        const {
            id,
            nome,
            sobrenome,
            lista
        } = item;


        const tbodyRow = document.createElement('tr');

        const tdId = document.createElement('td');
        const tdLista = document.createElement('td');
        const tdNome = document.createElement('td');
        const tdSobrenome = document.createElement('td');

        tdId.innerHTML = id;
        tdNome.innerHTML = nome;
        tdSobrenome.innerHTML = sobrenome;
        tdLista.innerHTML = lista;

        tbodyRow.appendChild(tdId);
        tbodyRow.appendChild(tdNome);
        tbodyRow.appendChild(tdSobrenome);
        tbodyRow.appendChild(tdLista);
        tbody.appendChild(tbodyRow);
    })
}



function buscar_1(offset = 1) {
    const lista = [];
    var aux = {};
    var total_registros = 105;

    // Exemplo de uso
    var pageSize = 10;
    var {lower, upper} = calcularRange(offset-1, pageSize);
    for (let index = lower; index <= upper; index++) {
        
        aux = {
            id: index,
            lista: `Lista 1`,
            nome: `Nome ${index}`,
            sobrenome: `Sobrenome ${index}`,
        }

        lista.push(aux);

        if(index === total_registros)
            break;
    }
    paginacao_1.start(total_registros);
    inicio_1(lista, total_registros);
}

function buscar_2(offset = 1) {
    const lista = [];
    var aux = {};
    var total_registros = 250;

    // Exemplo de uso
    var pageSize = 10;
    var {lower, upper} = calcularRange(offset-1, pageSize);
    for (let index = lower; index <= upper; index++) {
        
        aux = {
            id: index,
            lista: `Lista 2`,
            nome: `Nome ${index}`,
            sobrenome: `Sobrenome ${index}`,
        }

        lista.push(aux);

        if(index === total_registros)
            break;
    }
    paginacao_2.start(total_registros);
    inicio_2(lista, total_registros);
}

function calcularRange(offset, pageSize) {
    // Certifique-se de que offset e pageSize sejam números positivos
    offset = Math.max(0, Math.floor(offset));
    pageSize = Math.max(1, Math.floor(pageSize));

    // Calcule os limites inferior e superior do intervalo
    var lowerBound = offset * pageSize + 1;
    var upperBound = (offset + 1) * pageSize;

    return { lower: lowerBound, upper: upperBound };
}

buscar_1();
buscar_2();