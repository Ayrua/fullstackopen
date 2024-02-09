describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const user = {
      name: 'Test User',
      username: 'user',
      password: '12345678'
    }
    const user2 = {
      name: 'Test User 2',
      username: 'user2',
      password: '12345678'
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user2)
    cy.visit('')
  })

  it('login form is shown', function () {
    cy.contains('please log in')
    cy.get('#username')
    cy.get('#password')
    cy.get('#login-button')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.contains('login')
      cy.get('#username').type('user')
      cy.get('#password').type('12345678')
      cy.get('#login-button').click()
      cy.contains('user is logged in')
    })

    it('fails with wrong credentials', function () {
      cy.contains('login')
      cy.get('#username').type('user')
      cy.get('#password').type('1234')
      cy.get('#login-button').click()
      cy.contains('Wrong username or password!')
    })
  })

  describe('when logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'user', password: '12345678' })
      cy.createBlog({ title: 'test title', author: 'test author', url: 'test url' })
    })

    it('A blog can be created', function () {
      cy.contains('new blog').click()
      cy.get('#title').type('test title cypress')
      cy.get('#author').type('test author cypress')
      cy.get('#url').type('test url cypress')
      cy.contains('add').click()
      cy.contains('was added!')         // check creation
      cy.visit('')                      // refresh page
      cy.contains('test title cypress') // check it's in the list
    })

    it('like a blog', function () {
      cy.contains('test title')
        .contains('show')
        .click()
      cy.contains('test title')
        .parent()
        .find('#likeButton')
        .as('likeButton')
      cy.contains('test title')
        .parent()
        .contains('likes 0')
      cy.get('@likeButton').click()
      cy.contains('test title')
        .parent()
        .contains('likes 1')
    })

    it('delete a created blog', function () {
      cy.contains('test title')
        .contains('show')
        .click()
      cy.contains('test title')
        .parent()
        .find('#deleteButton')
        .as('deleteButton')
      cy.get('@deleteButton').click()
      cy.get('html').should('not.contain', 'test title')
    })

    it('only creator can delete it', function () {
      cy.contains('logout').click()
      cy.login({ username: 'user2', password: '12345678' }) // different user
      cy.contains('test title')
        .contains('show')
        .click()
      cy.get('html').should('not.contain', 'delete')
    })
  })
  describe('when blog list is created', function () {
    beforeEach(function () {
      cy.login({ username: 'user', password: '12345678' })
      cy.createBlog({ title: 'test title 1', author: 'test author', url: 'test url' })
      cy.createBlog({ title: 'test title 2', author: 'test author', url: 'test url' })
      cy.createBlog({ title: 'test title 3', author: 'test author', url: 'test url' })
    })

    it('check like order is correct', function () {
      // first get all like button
      cy.contains('test title 1')
        .contains('show')
        .click()
      cy.contains('test title 1')
        .parent()
        .find('#likeButton')
        .as('likeButton1')
      cy.contains('test title 2')
        .contains('show')
        .click()
      cy.contains('test title 2')
        .parent()
        .find('#likeButton')
        .as('likeButton2')
      cy.contains('test title 3')
        .contains('show')
        .click()
      cy.contains('test title 3')
        .parent()
        .find('#likeButton')
        .as('likeButton3')
      // now like them in order 3 > 2 > 1
      // doing this permutation worked, if not maybe add wait()
      cy.get('@likeButton3').click()
      cy.get('@likeButton2').click()
      cy.get('@likeButton1').click()
      cy.get('@likeButton3').click()
      cy.get('@likeButton2').click()
      cy.get('@likeButton3').click()

      cy.get('.blog').eq(0).should('contain', 'test title 3')
      cy.get('.blog').eq(1).should('contain', 'test title 2')
      cy.get('.blog').eq(2).should('contain', 'test title 1')
    })
  })
})
