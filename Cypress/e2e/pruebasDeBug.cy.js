describe('Pruebas de validación de reserva de habitación con datos inválidos', { testIsolation: true }, () => {
    beforeEach(() => {
      cy.visit('https://automationintesting.online/');
    });
  
    // Caso de prueba 1: Nombre con caracteres alfanuméricos
    it('Debería fallar si el campo Nombre contiene caracteres alfanuméricos', () => {
      cy.hacerReservaHabitacion(
        'Jaime123',  // Nombre con caracteres alfanuméricos
        'Lozano',
        'jlozanog@outlook.es',
        '94932776300'
      );
      cy.pause();
      // Verifica que se muestre un mensaje de error para el campo Nombre
      cy.verificarMensaje('firstname', 'campo Nombre contiene caracteres alfanuméricos');
      cy.wait(2000);
    });
  
    // Caso de prueba 2: Apellido con caracteres alfanuméricos
    it('Debería fallar si el campo Apellido contiene caracteres alfanuméricos', () => {
      cy.hacerReservaHabitacion(
        'Jaime',
        'Lozano123',  // Apellido con caracteres alfanuméricos
        'jlozanog@outlook.es',
        '94932776300'
      );
      cy.pause();
      // Verifica que se muestre un mensaje de error para el campo Apellido
      cy.verificarMensaje('lastname', 'campo Apellido contiene caracteres alfanuméricos');
      cy.wait(2000);
    });
    
    // Caso de prueba 3: Teléfono con caracteres alfabéticos
    it('Debería fallar si el campo Teléfono contiene caracteres alfabéticos', () => {
      cy.hacerReservaHabitacion(
        'Jaime',
        'Lozano',
        'jlozanog@outlook.es',
        'abc123defgh'  // Teléfono con caracteres alfabéticos
      );
      cy.pause();
      // Verifica que se muestre un mensaje de error para el campo Teléfono
      cy.verificarMensaje('phone', 'campo Teléfono contiene caracteres alfabéticos');
      cy.wait(2000);
    });
  });
  
