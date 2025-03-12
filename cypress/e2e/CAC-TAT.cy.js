describe('Central de Atendimento ao Cliente TAT', function () {

  beforeEach(() => {
    cy.visit('./src/index.html')
  })

  it('verifica o título da aplicação', () => {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })

  it('preenche os campos obrigatórios e envia o formulário', () => {

    const longText = Cypress._.repeat('testetestetestetestetesteste', 10)

    cy.get('#firstName')
      .should('be.visible')
      .type('Vinicius')
      .should('have.value', 'Vinicius')

    cy.get('#lastName')
      .should('be.visible')
      .type('Ferraz')
      .should('have.value', 'Ferraz')

    cy.get('#email')
      .should('be.visible')
      .type('viniciusferrazmello@hotmail.com')
      .should('have.value', 'viniciusferrazmello@hotmail.com')

    cy.get('#open-text-area')
      .should('be.visible')
      .type(longText, { delay: 0 })
      .should('have.value', longText)

    //cy.get('button[type="submit"]').click()
    cy.contains('button', 'Enviar').click()

    cy.get('.success').should('be.visible')
  })

  it('exibe mensagem de erro ao submeter o formulario com um email com formatacao invalida', () => {

    cy.get('#firstName')
      .should('be.visible')
      .type('Vinicius')
      .should('have.value', 'Vinicius')

    cy.get('#lastName')
      .should('be.visible')
      .type('Ferraz')
      .should('have.value', 'Ferraz')

    cy.get('#email')
      .should('be.visible')
      .type('viniciusferrazmello*hotmail.com')
      .should('have.value', 'viniciusferrazmello*hotmail.com')

    cy.get('#open-text-area')
      .should('be.visible')
      .type('Teste', { delay: 0 })
      .should('have.value', 'Teste')

    //cy.get('button[type="submit"]').click()
    cy.contains('button', 'Enviar').click()

    cy.get('.error').should("be.visible")

  })

  it('campo telefone continua vazio quando preenchido com um valor nao numerico', () => {

    cy.get('#phone')
      .type('abcde')
      .should('have.value', '')

  })

  it('exibe mensagem de erro quando o telefone se torna obrigatorio mas nao e preenchido antes do envio do formulario', () => {

    cy.get('#firstName')
      .should('be.visible')
      .type('Vinicius')
      .should('have.value', 'Vinicius')

    cy.get('#lastName')
      .should('be.visible')
      .type('Ferraz')
      .should('have.value', 'Ferraz')

    cy.get('#email')
      .should('be.visible')
      .type('viniciusferrazmello@hotmail.com')
      .should('have.value', 'viniciusferrazmello@hotmail.com')

    cy.get('#phone-checkbox').check()

    cy.get('#open-text-area')
      .should('be.visible')
      .type('Teste', { delay: 0 })
      .should('have.value', 'Teste')

    //cy.get('button[type="submit"]').click()
    cy.contains('button', 'Enviar').click()
    cy.get('.error').should("be.visible")

  })

  it('preenche e limpa os campos, nome, sobrenome, email e telefone', () => {

    cy.get('#firstName')
      .type('Vinicius')
      .should('have.value', 'Vinicius')
      .clear()
      .should('have.value', '')

    cy.get('#lastName')
      .type('Ferraz')
      .should('have.value', 'Ferraz')
      .clear()
      .should('have.value', '')

    cy.get('#email')
      .type('viniciusferrazmello@hotmail.com')
      .should('have.value', 'viniciusferrazmello@hotmail.com')
      .clear()
      .should('have.value', '')

      cy.get('#phone')
      .type('34992615215')
      .should('have.value', '34992615215')
      .clear()
      .should('have.value', '')

  })

  it('exibe mensagem de erro ao submeter o formulario sem preencher os campos obrigatorios', () => {

    //cy.get('button[type="submit"]').click()
    cy.contains('button', 'Enviar').click()
    cy.get('.error').should("be.visible")

  })
  
  it('envia o formulario com sucesso usando um comando customizado', () => {

    /*const data = {
      firstName: "Vinicius",
      lastName: "Ferraz do Amaral Mello",
      email: "viniciusferrazmello@hotmail.com",
      text: "Teste"
    }*/

    cy.fillMandatoryFieldsAndSubmit()
    cy.get('.success').should('be.visible')

  })
  

  it('seleciona um produto (Youtube) por seu texto', () => {

    cy.get('#product').select('YouTube').should('have.value', 'youtube')

  })

  it('seleciona um produto (Mentoria) por seu valor', () => {

    cy.get('#product').select('mentoria').should('have.value', 'mentoria')

  })

  it('seleciona um produto (Blog) pelo seu indice', () => {

    cy.get('#product').select(1).should('have.value', 'blog')

  })

  it('marca o tipo de atendimento "Feedback"', () => {

    cy.get('input[type="radio"][value="feedback"]').check()
      .should('be.checked')
  })

  it('marca cada tipo de atendimento', () => {

    cy.get('input[type="radio"]')
      .each(typeOfService => {
        cy.wrap(typeOfService)
          .check()
          .should('be.checked')
      })

  })

  it('marca ambos checkboxes, depois desmarca o ultimo', () => {

    cy.get('input[type="checkbox"]')
    .check().should('be.checked')
    .last().uncheck().should('not.be.checked')

  })

  it('seleciona um arquivo da pasta fixtures', () => {

    cy.get('#file-upload').selectFile('cypress/fixtures/example.json')
      .should((input) =>{
        expect(input[0].files[0].name).to.equal('example.json')

    })

  })

  it('seleciona um arquivo simulando um drag-and-drop', () => {

    cy.get('#file-upload')
      .selectFile('cypress/fixtures/example.json', { action: 'drag-drop' })
      .should((input) =>{
        expect(input[0].files[0].name).to.equal('example.json')
  })

  })

  it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
    cy.fixture('example.json').as('sampleFile')
    cy.get('#file-upload')
      .selectFile('@sampleFile')
      .should((input) =>{
        expect(input[0].files[0].name).to.equal('example.json')

    })

  })

  it('verifica que a politica de privacidade abre em outra aba sem a necessidade de um clique', () => {

    cy.contains('a', 'Política de Privacidade')
      .should('have.attr', 'href', 'privacy.html')
      .and('have.attr', 'target', '_blank')

  })

  it('acessa a pagina da politica de privacidade removendo o target e entao clicando no link', () => {

    cy.contains('a', 'Política de Privacidade')
      .invoke('removeAttr', 'target', '_blank')
      .click()

    cy.contains('h1', 'CAC TAT - Política de Privacidade')
      .should('be.visible')

  })

})
