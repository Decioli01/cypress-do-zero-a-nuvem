/// <reference types= ‘cypress’>

describe('Central de Atendimento ao Cliente TAT', () => {
  beforeEach(() => {
    cy.visit('../../src/index.html')
  })
  it('verifica o título da aplicação', () => {
    cy.title().should('eq', 'Central de Atendimento ao Cliente TAT')
  })
  it('preenche os campos obrigatórios e envia o formulário', () => {
    cy.clock()

    cy.get('[name="firstName"]').type('Eduardo')
    cy.get('[name="lastName"]').type('Decioli')
    cy.get('input#email',).type('eduardo@yahoo.com')
    cy.get('[name="open-text-area"]').type('Testando campo de texto')
    cy.contains('Enviar').click()

    cy.get('.success').should('be.visible')
    cy.tick(3000)

    cy.get('.success').should('not.be.visible')
  })
  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    cy.clock()

    cy.get('[name="firstName"]').type('Eduardo')
    cy.get('[name="lastName"]').type('Decioli')
    cy.get('input#email').type('eduardoyahoo.com')
    cy.get('[name="open-text-area"]').type('Testando campo de texto')
    cy.contains('Enviar').click()

    cy.get('.error').should('be.visible')

    cy.tick(3000)

    cy.get('.error').should('not.be.visible')
  })
  it('campo telefone continua vazio quando digitado valor não-numerico', () => {
    cy.get('input#phone')
      .type('testeTelefone')
      .should('have.value', '')
  })
  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy.clock()

    cy.get('[name="firstName"]').type('Eduardo')
    cy.get('[name="lastName"]').type('Decioli')
    cy.get('input#email').type('eduardo@yahoo.com')
    cy.get('#phone-checkbox').check()

    cy.get('.phone-label-span').should('have.text', ' (obrigatório)')

    cy.get('[name="open-text-area"]').type('Testando campo de texto')
    cy.contains('Enviar').click()

    cy.get('.error').should('be.visible')

    cy.tick(3000)

    cy.get('.error').should('not.be.visible')
  })
  it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
    cy.get('[name="firstName"]').type('Eduardo').should('have.value', 'Eduardo').clear().should('have.value', '')
    cy.get('[name="lastName"]').type('Decioli').should('have.value', 'Decioli').clear().should('have.value', '')
    cy.get('input#email').type('eduardo@yahoo.com').should('have.value', 'eduardo@yahoo.com').clear().should('have.value', '')
    cy.get('input#phone').type('14998529770').should('have.value', '14998529770').clear().should('have.value', '')
  })
  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
    cy.clock()

    cy.contains('Enviar').click()
    cy.get('.error').should('be.visible')

    cy.tick(3000)

    cy.get('.error').should('not.be.visible')
  })
  it('envia o formuário com sucesso usando um comando customizado', () => {
    cy.clock()

    cy.fillMandatoryFieldsAndSubmit('Eduardo', 'Decioli', 'Eduardo@yahoo.com')
    cy.get('.success').should('be.visible')

    cy.tick(3000)

    cy.get('.success').should('not.be.visible')
  })

  //selecionando produtos na lista suspensa (dropdown)
  it('seleciona um produto (YouTube) por seu texto', () => {
    cy.get('#product').select('YouTube').should('have.value', 'youtube')
  })
  it('seleciona um produto (Mentoria) por seu valor (value)', () => {
    cy.get('#product').select('mentoria').should('have.value', 'mentoria')
  })
  it('seleciona um produto (Blog) por seu índice', () => {
    cy.get('#product').select(1).should('have.value', 'blog')
  })

  //selecionando produtos na lista de opções (radio)
  it('marca o tipo de atendimento "Feedback"', () => {
    cy.get('input[type="radio"][value="feedback"]')
      .check()
      .should('be.checked')
  })

  //iterando sobre os elementos do tipo radio
  it('marca cada tipo de atendimento', () => {
    cy.get('input[type="radio"]')
      .each(typeOfService => {
        cy.wrap(typeOfService)
          .check()
          .should('be.checked')
      })
  })
  it('marca ambos checkboxes, depois desmarca o último', () => {
    cy.get('input[type="checkbox"]')
      .check()
      .should('be.checked')
      .last()
      .uncheck()
      .should('not.be.checked')
  })
  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy.clock()

    cy.get('#phone-checkbox').check()
    cy.contains('Enviar').click()
    cy.get('.error').should('be.visible')

    cy.tick(3000)

    cy.get('.error').should('not.be.visible')
  })

  //testando upload de arquivos
  it('seleciona um arquivo da pasta fixtures', () => {
    cy.get('input[type="file"]')
      .selectFile('cypress/fixtures/example.json')
      .should((input) => {
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })
  it('seleciona um arquivo simulando um drag-and-drop', () => {
    cy.get('input[type="file"]')
      .selectFile('cypress/fixtures/example.json', { action: 'drag-drop' })
      .should((input) => {
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })
  it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
    cy.fixture('example.json').as('sampleFile')

    cy.get('#file-upload')
      .selectFile('@sampleFile')
      .should((input) => {
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })

  //testando links que abrem em nova aba
  it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
    cy.contains('a', 'Política de Privacidade')
      .should('have.attr', 'target', '_blank')
      .and('have.attr', 'href', 'privacy.html')
  })
  it('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
    cy.contains('a', 'Política de Privacidade')
      .invoke('removeAttr', 'target')
      .click()
    cy.contains('CAC TAT - Política de Privacidade')
      .should('be.visible')
  })

  it('exibe e oculta as mensagens de sucesso e erro usando .invoke()', () => {
    cy.get('.success')
      .should('not.be.visible')
      .invoke('show')
      .should('be.visible')
      .and('contain', 'Mensagem enviada com sucesso.')
      .invoke('hide')
      .should('not.be.visible')
    cy.get('.error')
      .should('not.be.visible')
      .invoke('show')
      .should('be.visible')
      .and('contain', 'Valide os campos obrigatórios!')
      .invoke('hide')
      .should('not.be.visible')
  })

  it('preenche a area de texto usando o comando invoke', () => {
    cy.get('#open-text-area')
      .invoke('val', 'um texto qualquer')
      .should('have.value', 'um texto qualquer')
  })

  it('faz uma requisição HTTP', () => {
    cy.request('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html')
      .as('getRequest')
      .its('status')
      .should('eq', 200)
    cy.get('@getRequest')
      .its('statusText')
      .should('eq', 'OK')
    cy.get('@getRequest')
      .its('body')
      .should('include', 'CAC TAT')
  })

  it('encontra o gato escondido', () => {
    cy.get('#cat')
      .invoke('show')
      .should('be.visible')
    cy.get('#title')
      .invoke('text', 'CAT TAT')
    cy.get('#subtitle')
      .invoke('text', 'Eu <3 gatos')
  })
})