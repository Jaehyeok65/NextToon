describe('Main Page Navigation Test', () => {
    it('should navigate to the list Page', () => {
      // Start from the index page
      cy.visit('http://localhost:3000/');

      cy.get('a[href*="list"]').click()

      

    })
  })