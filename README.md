<h1 align="center">Buscar Médicos Brasil</h1>

<p align="center">
  <strong>Um projeto incrível que une contratantes e médicos em busca de serviço em todo o Brasil.</strong>
</p>

<p align="center">
  Este projeto é a avaliação final do segundo módulo da escola de programação Arnia.
</p>

<p align="center">
  <a href="https://buscar-medicos-brasil.vercel.app/">Acesse a aplicação aqui</a>
</p>

<h2 align="center">Visão Geral</h2>

<p align="center">
  A aplicação <strong>Buscar Médicos Brasil</strong> tem como objetivo facilitar a busca por vágas na área médica em todo o Brasil. Ela se conecta a uma API desenvolvida pela Arnia para fornecer informações atualizadas sobre vagas em diversas localidades. O projeto é construído em React com Vite e utiliza as bibliotecas axios, date-fns, react-modal, react-router-dom e styled-components para criar uma experiência de usuário agradável e eficiente.
</p>

<h2 align="center">Configuração do Ambiente</h2>

<p align="center">
  Antes de começar a trabalhar com este projeto, certifique-se de que possui Node.js instalado. Você pode instalar todas as dependências necessárias usando o seguinte comando:
</p>

```bash
npm install
```

<h2 align="center">Executando o Projeto</h2>
<p align="center">
  Para executar o projeto localmente, você pode usar o seguinte comando:
</p>

```bash
npm start
```

<p align="center">
  Isso iniciará um servidor local e abrirá a aplicação no seu navegador padrão.
</p>
<h2 align="center">Como Contribuir</h2>
<p align="center">
  Se você deseja contribuir para este projeto, sinta-se à vontade para criar pull requests. No entanto, é importante notar que devido a problemas pessoais e uma mudança brusca na rotina, alguns itens não foram desenvolvidos.
</p>
<h2 align="center">Estilo</h2>
<p align="center">
  Adicionamos um toque de estilo personalizado para tornar a aplicação mais atraente. Usamos o CSS no arquivo Usamos o CSS no arquivo `styles.ts` de cada componente e na pasta `src/assets/styles` para personalizar elementos visuais. Fique à vontade para personalizar ainda mais o estilo de acordo com suas preferências.
</p>
<h2 align="center">Deploy</h2>
<p align="center">
  Este projeto foi hospedado no serviço Vercel. Você pode acessá-lo em <a href="https://buscar-medicos-brasil.vercel.app/">Buscar Médicos Brasil no Vercel</a>. Certifique-se de que está acessando a versão mais recente da aplicação.
</p>
<h2 align="center">Contato</h2>
<p align="center">
  Para entrar em contato com a equipe de desenvolvimento da Arnia, visite <a href="https://arnia.com.br/">arnia.com</a>.
</p>
<h2 align="center">Erros identificados</h2>
<ol>
  <li>Não foi implementado a mudança de cor dos inputs do login. Verificar passagem de props condicionada.</li>
  <li>Não foi implementado o tratamento de erro da API, nem o callback com mensagem. Definir principais códigos e criar uma listagem de mensagens.</li>
  <li>Não foi implementado a mudança de cor dos icones. Estudar componentizar icones svg.</li>
  <li>O input de data foi com tipo errado em NotificationDetails. Mudar o tipo para date. A conversão para o valor recebido foi feita usando date-fns.</li>
  <li>Nas listagens, ao deletar um item, não é renderizado novamente a tela. Achar uma forma que não seja gambiarra.</li>
  <li>Ao criar/editar um novo item, não é renderizado novamente a tela. Verificar função closeModal.</li>
  <li>Não foi mapeado ações ao fechar modal clidando fora do mesmo. Alternativa seria criar um modal em vez de usar da biblioteca.</li>
  <li>Ao entrar na página inicial, o background para a pagina ativa não inicializa automaticamente.</li>
  <li>As tabs não ficaram na cor correta. Visível pelo monitor do trabalho.</li>
  <li>Mesmo com o disabled, os conteúdos dos inputs ficaram com cor forte. Condicionar a cor á existência do disabled passando por props.</li>
  <li>Ao mudar de página, o menu suspenso permanece aberto. Verificar a possibilidade de condicionar ao hover e focus também.</li>
  <li>Apesar de não ser obrigatório, não fiz a busca por cidade, especialidade e estado. Verificar a possibilidade de mandar alguns dados simulados para o Lucas e testar essa funcionalidade.</li>
  <li>Ao clicar em visualizar e depois clicar em delete, posteriomente fechando o modal sem deletar, a página de detalhes buga.</li>
  <li>O valor em Plans não foi formatado.</li>
  <li>Nenhuma responsividade foi implementada.</li>
  <li>O arrows unicode usados para paginação não é compatível com Firefox/Linux.</li>
  <li>A solução encontrada para atualizar a renderização ao clicar no checkbox nas listagens (Specialties e Plans) só pode ser definido como gambiarra. Estudar uma alternativa.</li>
  <li>Não foi implementada uma solução para token expirado enquanto navega. Verificar a inclusão de uma função para validar isso, possivelmente usando o /me. Caso o token esteja expirado, redirecionar para login.</li>
</ol>
<p align="center">
  Espero que este projeto seja útil e que você possa aprender com ele. Fique à vontade para explorar o código-fonte e contribuir para o seu desenvolvimento!
</p>
<p align="center">
  Obrigado por sua visita!
</p>
```
