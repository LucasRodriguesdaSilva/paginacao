/**
 * Autor: Lucas Rodrigues
 * Data: 11/02/2024
 * Descrição: Classe para criação de paginação simples no html com javascript.
 */

class Paginacao {
    constructor(id, callback) {
        console.log('init ...');
        this.id = id;
        this.uid = this.#gerar_UUID();
        this.callback = callback;
        this.paginaAtual = 1;
        this.inicioSet = 1;
        this.fimSet = 10;
        this.ctx = document.getElementById(id);
        this.#destruirPaginacao();
        this.total_registros = 0;
        this.ultimaPagina = 1;
        console.log('concluído. Chame Start');
    }

    start(total_registros) {
        this.total_registros = total_registros;
        this.ultimaPagina = this.#calculaQtdPags();
        this.#criarPaginacao();
    }

    #criarPaginacao() {
        this.#destruirPaginacao();

        if (!this.#verificaMostrarPaginacao())
            return;

        const ul = document.createElement('ul');
        ul.classList.add('pagination');

        const inicio = this.#gerarBotaoPag('waves-effect', 'margin-right: -5px;', 'first_page', this.#irParaInicio);
        const anterior = this.#gerarBotaoPag(`waves-effect`, '', 'chevron_left', this.#irParaAnterior);
        const proximo = this.#gerarBotaoPag(`waves-effect`, '', 'chevron_right', this.#irParaProximo);
        const fim = this.#gerarBotaoPag('waves-effect', 'margin-left: -5px;', 'last_page', this.#irParaFim);

        const proximaSecao = this.#criarSetPag();
        const secaoAnterior = this.#criarSetPag();

        ul.appendChild(inicio);
        ul.appendChild(anterior);

        if (this.inicioSet > 10)
            ul.appendChild(secaoAnterior);

        const aux = this.fimSet >= this.ultimaPagina ? this.ultimaPagina : this.fimSet;

        for (let pg = this.inicioSet; pg <= aux; pg++) {
            const pgClass = this.paginaAtual === pg ? 'active' : 'waves-effect';
            const pagina = this.#gerarNumPag(pgClass, pg, this.#irParaPagina);
            ul.appendChild(pagina);
        }

        if(this.ultimaPagina > 10 && aux < this.ultimaPagina)
            ul.appendChild(proximaSecao);

        ul.appendChild(proximo);
        ul.appendChild(fim);

        this.ctx.appendChild(ul);
    }

    #gerarBotaoPag(className, style, icone, callback) {
        const li = document.createElement('li');
        const a = document.createElement('a');
        const i = document.createElement('i');

        li.className = className;
        li.style = style;

        i.classList.add('material-icons');
        i.textContent = icone;

        a.onclick = () => {
            callback.call(this);
        };
        a.appendChild(i);

        li.appendChild(a);

        return li;
    }

    #criarSetPag() {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.textContent = '...';
        li.className = 'waves-effect disabled';
        li.appendChild(a);

        return li;
    }

    #gerarNumPag(className, pagina, callback) {
        const li = document.createElement('li');
        const a = document.createElement('a');
    
        a.onclick = () => {
            callback.call(this, pagina);
        };
        a.textContent = pagina;
            
        li.className = className;
        li.id = `numPagina_${pagina}_${this.uid}`;
        li.appendChild(a);
    
        return li;
    }

    #paginar() {
        this.callback(this.paginaAtual);
        this.#ativarNumPag(this.paginaAtual);
    }

    #irParaInicio() {
        if (this.paginaAtual == 1)
            return;

        this.paginaAtual = 1;
        this.#paginar();
    }

    #irParaFim() {
        if (this.paginaAtual === this.ultimaPagina)
            return;

        this.paginaAtual = this.ultimaPagina;
        this.#paginar();
    }

    #irParaProximo() {
        this.paginaAtual++;
        if (this.paginaAtual > this.ultimaPagina)
            this.paginaAtual = this.ultimaPagina;

        this.#paginar();
    }

    #irParaAnterior() {
        this.paginaAtual--;
        if (this.paginaAtual < 1)
            this.paginaAtual = 1;

        this.#paginar();
    }

    #irParaPagina(pagina) {
        if (this.paginaAtual === pagina)
            return;

        this.paginaAtual = pagina;
        this.#paginar();
    }

    #verificaMostrarPaginacao() {
        return this.ultimaPagina > 1 ? true : false;
    }

    #calculaQtdPags() {
        var quociente = Math.floor(this.total_registros / 10);
        var resto = this.total_registros % 10;
        if (resto > 0) // se o resto é maior que zero, significa que há uma página incompleta
            quociente += 1; // adiciona um ao quociente para contar essa página

        return quociente;
    }

    #destruirPaginacao() {
        this.ctx.innerHTML = '';
    }

    #ativarNumPag(pagina) {
        const { inicio, fim } = this.#calcularIntervalo(pagina);

        // Verifica se o numero ainda esta no intervalo
        if (inicio != this.inicioSet && fim != this.fimSet) {
            this.inicioSet = inicio;
            this.fimSet = fim;
            this.#criarPaginacao();
        }

        const pagAnterior = document.querySelector(`#${this.id} .active`);
        const pagAtual = document.getElementById(`numPagina_${pagina}_${this.uid}`);

        pagAnterior.classList.remove('active');
        pagAnterior.classList.add('waves-effect');
        pagAtual.classList.add('active');
    }

    #calcularIntervalo(pagina) {
        const inicio = Math.floor((pagina - 1) / 10) * 10 + 1;
        const fim = inicio + 9;

        return { inicio, fim }
    }

    #gerar_UUID() {
        var dt = new Date().getTime();
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = (dt + Math.random() * 16) % 16 | 0;
            dt = Math.floor(dt / 16);
            return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        return uuid;
    }
}