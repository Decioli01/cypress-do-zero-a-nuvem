/// <reference types= ‘cypress’>

describe('Central de Atendimento ao Cliente TAT', () => {
  beforeEach(() => {
    cy.visit('../../src/index.html')
  })
  it('verifica o título da aplicação', () => {
    cy.title().should('eq', 'Central de Atendimento ao Cliente TAT')
  })
  it('preenche os campos obrigatórios e envia o formulário', () => {
    cy.get('[name="firstName"]').type('Eduardo')
    cy.get('[name="lastName"]').type('Decioli')
    cy.get('input#email',).type('eduardo@yahoo.com')
    cy.get('[name="open-text-area"]').type('Testando campo de texto')
    cy.contains('Enviar').click()

    cy.get('.success').should('be.visible')
  })
  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    cy.get('[name="firstName"]').type('Eduardo')
    cy.get('[name="lastName"]').type('Decioli')
    cy.get('input#email').type('eduardoyahoo.com')
    cy.get('[name="open-text-area"]').type('Testando campo de texto')
    cy.contains('Enviar').click()

    cy.get('.error').should('be.visible')
  })
  it('campo telefone continua vazio quando digitado valor não-numerico', () => {
    cy.get('input#phone')
      .type('testeTelefone')
      .should('have.value', '')
  })
  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy.get('[name="firstName"]').type('Eduardo')
    cy.get('[name="lastName"]').type('Decioli')
    cy.get('input#email').type('eduardo@yahoo.com')
    cy.get('#phone-checkbox').check()

    cy.get('.phone-label-span').should('have.text', ' (obrigatório)')

    cy.get('[name="open-text-area"]').type('Testando campo de texto')
    cy.contains('Enviar').click()

    cy.get('.error').should('be.visible')
  })
  it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
    cy.get('[name="firstName"]').type('Eduardo').should('have.value', 'Eduardo').clear().should('have.value', '')
    cy.get('[name="lastName"]').type('Decioli').should('have.value', 'Decioli').clear().should('have.value', '')
    cy.get('input#email').type('eduardo@yahoo.com').should('have.value', 'eduardo@yahoo.com').clear().should('have.value', '')
    cy.get('input#phone').type('14998529770').should('have.value', '14998529770').clear().should('have.value', '')
  })
  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
    cy.contains('Enviar').click()
    cy.get('.error').should('be.visible')
  })
  it.only('envia o formuário com sucesso usando um comando customizado', () => {
    cy.fillMandatoryFieldsAndSubmit('Eduardo', 'Decioli', 'Eduardo@yahoo.com')
    cy.get('.success').should('be.visible')
  })
})