// Comando que verifica que la información del hotel esté presente
Cypress.Commands.add('verificarInfoHotel', () => {
  cy.get('p').contains('Shady Meadows B&B').should('be.visible');
  cy.get('p').contains('The Old Farmhouse, Shady Street, Newfordburyshire, NE1 410S').should('be.visible');
  cy.get('p').contains('012345678901').should('be.visible');
  cy.get('p').contains('fake@fakeemail.com').should('be.visible');
});
  
// Comando que verifica que al menos una imagen sea visible
Cypress.Commands.add('verificarImagenVisible', () => {
  cy.get('img.hotel-logoUrl').should('be.visible');
});

// Comando que confirma que el texto de la descripción del hotel sea el esperado
Cypress.Commands.add('verificarDescripcionHotel', (descripcionEsperada) => {
  cy.get('p').contains(descripcionEsperada).should('exist').should('be.visible');
});

// Importa el soporte para simular eventos del navegador en Cypress
import 'cypress-real-events/support';
// Importa el soporte para arrastrar y soltar en Cypress
import '@4tw/cypress-drag-drop';


// 1 Comando que realiza una nueva reserva de habitación a través de la API

Cypress.Commands.add('hacerReservaHabitacion', (nombre, apellido, email, telefono) => {
  // Inicia el proceso de reserva
  cy.get('button').contains('Book this room').should('be.visible').click();
  cy.wait(2000);

  const clickNextUntilAvailable = () => {
    cy.get('div').then($div => {
      if ($div.text().includes('Unavailable')) {
        cy.get('button').contains('Next').click();
        cy.wait(1000);
        clickNextUntilAvailable(); // Llamada recursiva
      } else {
        // Selecciona las fechas de inicio y fin
        cy.get('.rbc-button-link').contains('05').as('startDate');
        cy.get('.rbc-button-link').contains('20').as('endDate');

        cy.get('@startDate').drag('@endDate');
        cy.wait(2000);

        // Llena el formulario de reserva
        cy.get('input[placeholder="Firstname"]').type(nombre);
        cy.get('input[placeholder="Lastname"]').type(apellido);
        cy.get('input[placeholder="Email"]').first().type(email);
        cy.get('input[placeholder="Phone"]').first().type(telefono);

        // Envía el formulario
        cy.get('button.btn.book-room').eq(1).click();

        // Verifica el mensaje de éxito
        cy.verificarMensaje('Success', 'Booking Successful!');
      }
    });
  };

  clickNextUntilAvailable();
});

// Comando personalizado para verificar los mensajes en la UI
Cypress.Commands.add('verificarMensaje', (tipoMensaje, mensajeEsperado) => {
  const selectores = {
    'Success': 'h3',
  };

  const selector = selectores[tipoMensaje];
  
  if (!selector) {
    throw new Error(`Campo de Nombre ingresado con datos inválidos ${tipoMensaje}`);
  }

  cy.get(selector, { timeout: 10000 })
    .should('be.visible')
    .and('contain.text', mensajeEsperado);
});


// 2 Comando que completa el formulario dejando el campo phone en blanco

Cypress.Commands.add('completarFormularioContacto', (nombre, email, telefono, asunto, descripcion) => {
  cy.get('#name').type(nombre);
  cy.get('#email').type(email);

  if (telefono) {
    cy.get('#phone').type(telefono);
  }
  
  cy.get('#subject').type(asunto);
  cy.get('#description').type(descripcion);
});

// Esto envía el formulario de contacto
Cypress.Commands.add('enviarFormularioContacto', () => {
  cy.get('#submitContact').click();
});

// verifica si hay alguna alerta y mensaje de error de campos vacíos

Cypress.Commands.add('verificarErrorCampoVacio', () => {
  cy.get('.alert.alert-danger').should('be.visible');
  cy.get('.alert.alert-danger').should('contain.text', 'may not be blank');
});


// 3 verifica el mensaje de éxito del formulario de contacto

Cypress.Commands.add('verificarMensajeExito', () => {
  cy.contains('Thanks').should('be.visible');
});


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
// Cypress.Commands.add('login', (email, password) => { ... })
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