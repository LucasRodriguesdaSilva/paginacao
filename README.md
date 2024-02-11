# Classe de Paginação com JavaScript

Este projeto apresenta uma classe simples para facilitar a implementação de paginação em HTML usando JavaScript puro. A classe é leve, de fácil utilização e não requer a dependência de bibliotecas ou frameworks externos.

## Como usar

1. Importe a classe de paginação para o seu arquivo JavaScript.
2. Inicie uma instância da classe, fornecendo o `ID` da div no HTML onde a paginação será exibida e uma função `callback` que será responsável pela busca dos dados.
3. Utilize o método `start` para gerar a paginação, informando a quantidade total de dados na lista.

## Exemplo

```javascript
// Importar a classe
const paginacao = new Paginacao('paginacao', callback);

// Iniciar a paginação com o total de registros
paginacao.start(total_registros);
```

- Este exemplo criará uma paginação com base na quantidade de itens.
- Sempre que houver uma mudança de página, a função ``callback`` será chamada, atualizando assim os itens exibidos.
- Um exemplo funcional está presente [aqui](/public/js/app.js);




## Tarefas Pendentes

- [ ] Adicionar outros temas
- [ ] Adicionar opção de quantidade máxima de itens por página.
- [ ] Documentar classe.
