// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
 Cypress.Commands.add('fillMandatoryFieldsAndSubmit', (firstName, lastName, email) => {
    cy.get('[name="firstName"]').type(firstName)
    cy.get('[name="lastName"]').type(lastName)
    cy.get('input#email',).type(email)
    cy.get('[name="open-text-area"]').type('Testando campo de texto')
    cy.contains('Enviar').click()
 })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })