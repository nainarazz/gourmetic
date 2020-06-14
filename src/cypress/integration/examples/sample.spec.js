describe('My First Test', () => {
  it('Does not do much!', () => {
    expect(true).to.equal(true)
  })

  it('Login through Google', () => {
    cy.visit('/');
    cy.get('[data-cy=hamburger-icon]').click();
    cy.get('[data-cy=sign-in]').click();
    cy.wait(20000);

    const username = Cypress.env('auth_username')
    const password = Cypress.env('auth_password')
    const loginUrl = cy.url();

    const cookieName = Cypress.env('auth0.is.authenticated')
    const socialLoginOptions = {
      username,
      password,
      loginUrl,
      headless: false,
      logs: false,
      loginSelector: 'body > div > main > section > div > div > div > div > form.idp-social-button-container._social-button-container._social-button-container-google > button',
    }

    return cy.task('GoogleSocialLogin', socialLoginOptions).then(({ cookies }) => {
      cy.clearCookies()

      const cookie = cookies.filter(cookie => cookie.name === cookieName).pop()
      if (cookie) {
        cy.setCookie(cookie.name, cookie.value, {
          domain: cookie.domain,
          expiry: cookie.expires,
          httpOnly: cookie.httpOnly,
          path: cookie.path,
          secure: cookie.secure
        })

        Cypress.Cookies.defaults({
          whitelist: cookieName
        })
      }
    })
  })
})
