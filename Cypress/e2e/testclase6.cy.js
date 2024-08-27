describe('Actividad para las pruebas del sitio web', { testIsolation: true }, () => {
  beforeEach(() => {
    cy.visit('https://automationintesting.online/');
  });

  // Verificando que la información del hotel esté presente en la página
  it('Debe verificar que la información del hotel esté presente', () => {
    cy.verificarInfoHotel(); // Llama al comando personalizado para verificar la información del hotel
  });
  

// Verificando que haya al menos una imagen visible
it('Debe asegurar que haya al menos una imagen visible', () =>
  {
    cy.verificarImagenVisible();  // Verifica existencia y visibilidad
  });

  // Confirmando que el texto de la descripción del hotel sea el esperado
  it('Debe confirmar que el texto de la descripción del hotel sea el esperado', () => {
    const descripcionEsperada = "Welcome to Shady Meadows, a delightful Bed & Breakfast nestled in the hills on Newingtonfordburyshire. A place so beautiful you will never want to leave. All our rooms have comfortable beds and we provide breakfast from the locally sourced supermarket. It is a delightful place.";
    cy.verificarDescripcionHotel(descripcionEsperada);
  });
  

  // Las 3 Pruebas API en adelante

  // 1 Haciendo una nueva reserva 
  it('Debe hacer una reserva de habitación con éxito', () => {
    // Llama al comando personalizado con los datos de reserva
    cy.hacerReservaHabitacion(
      'Jaime',
      'Lozano',
      'jimco18@hotmail.com',
      '94932776300'
    );

    // Verifica que el mensaje de éxito esté visible usando el comando personalizado
    cy.verificarMensaje('Success', 'Booking Successful!');
    cy.get('.alert.alert-danger').should('not.exist'); // Verifica que el mensaje de éxito no esté presente
      cy.wait(2000
    );
    });

  // 2 Prueba de Datos Incompletos con Mensaje de Error
  it('Debe devolver un error si se envían datos incompletos', () => {
    // Completa el formulario sin el campo 'phone'
    cy.completarFormularioContacto(
      'Jaime Lozano',
      'jlozanog@outlook.es',
      '',
      'Camás viejas',
      'Las camas eran viejas y no tenían un colchón bueno.'
    );

    // Envía el formulario usando el comando personalizado
    cy.enviarFormularioContacto();

    // Verifica si hay algún mensaje de error
    cy.verificarErrorCampoVacio();
  });

  // 3 Validando que el mensaje haya sido enviado exitosamente
  it('Debe validar que el mensaje haya sido enviado exitosamente', () => {
    cy.completarFormularioContacto(
      'Jaime Lozano',
      'jlozanog@outlook.es',
      '94932776300',
      'Camás viejas',
      'Las camas eran viejas y no tenían un colchón bueno.'
    );

    // Envía el formulario usando el comando personalizado
    cy.enviarFormularioContacto();

    // Verifica que el mensaje de éxito esté visible usando el comando personalizado
    cy.verificarMensajeExito();
  });
});
