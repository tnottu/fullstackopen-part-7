describe('Blog app', function() {

  const testBlog = {
    title: 'A blog to like',
    author: 'Cybressbot',
    url: 'https://cypresshill.com',
  }

  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Log in to application')
    cy.get('input[name="username"]')
    cy.get('input[name="password"]')
    cy.get('button').contains('login')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('input[name="username"]').type('mluukkai')
      cy.get('input[name="password"]').type('salainen')
      cy.get('#login-button').click()

      cy.contains('Matti Luukkainen logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('input[name="username"]').type('mluukkai')
      cy.get('input[name="password"]').type('wrong')
      cy.get('#login-button').click()

      cy.get('.error')
        .should('contain', 'Wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-top-style', 'solid')
        .and('have.css', 'border-right-style', 'solid')
        .and('have.css', 'border-bottom-style', 'solid')
        .and('have.css', 'border-left-style', 'solid')

      cy.get('html').should('not.contain', 'Matti Luukkainen logged in')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'mluukkai', password: 'salainen' })
    })

    it('A blog can be created', function() {
      cy.contains('create new blog').click()

      cy.get('input[name="title"]').type(testBlog.title)
      cy.get('input[name="author"]').type(testBlog.author)
      cy.get('input[name="url"]').type(testBlog.url)

      cy.get('.blog-form button').contains('create').click()

      cy.contains(testBlog.title)
      cy.contains(testBlog.author)
    })

    it('User can like a blog', function() {
      cy.createBlog(testBlog)
      cy.contains(testBlog.title).parent().as('theBlog')
      cy.get('@theBlog').contains('view').click()
      cy.get('@theBlog').find('.blog-details-likes-count').contains('0')
      cy.get('@theBlog').contains('Like').click()
      cy.get('@theBlog').find('.blog-details-likes-count').contains('1')
    })

    it('User can delete own blog', function() {
      cy.createBlog(testBlog)
      cy.contains(testBlog.title).parent().as('theBlog')
      cy.get('@theBlog').contains('view').click()
      cy.get('@theBlog').contains('remove').click()
      cy.wait(500)
      cy.get('.blog').should('not.exist')
    })

    it('User can not delete another user\'s blog', function() {
      cy.createBlog(testBlog)

      cy.contains('Logout').click()

      const user2 = {
        name: 'Matt Damon',
        username: 'mattdamon',
        password: 'secret'
      }
      cy.request('POST', 'http://localhost:3003/api/users/', user2)
      cy.login(user2)

      cy.contains(testBlog.title).parent().as('theBlog')
      cy.get('@theBlog').contains('view').click()
      cy.contains('remove').should('not.exist')
    })

    it('Blogs are ordered according to likes, most likes first', function() {

      const testBlog1 = {
        title: 'Middle likes',
        author: 'Teppo Testaaja',
        url: 'https://example.com',
      }

      const testBlog2 = {
        title: 'Most likes',
        author: 'Tiina Testaaja',
        url: 'https://example.com',
      }

      const testBlog3 = {
        title: 'Least likes',
        author: 'Taavi Testaaja',
        url: 'https://example.com',
      }

      cy.createBlog(testBlog1)
      cy.createBlog(testBlog2)
      cy.createBlog(testBlog3)


      cy.contains(testBlog1.title).parent().as('theBlog1')
      cy.contains(testBlog2.title).parent().as('theBlog2')
      cy.contains(testBlog3.title).parent().as('theBlog3')

      cy.get('@theBlog1').contains('view').click()
      cy.get('@theBlog1').contains('Like')
        .click()
        .wait(100)
        .click()
        .wait(100)

      cy.get('@theBlog2').contains('view').click()
      cy.get('@theBlog2').contains('Like')
        .click()
        .wait(100)
        .click()
        .wait(100)
        .click()
        .wait(100)

      cy.get('@theBlog3').contains('view').click()

      cy.get('.blog-title').then(function($els) {
        return Cypress.$.makeArray($els).map((el) => el.innerText)
      })
        .should('deep.equal', [testBlog2.title, testBlog1.title, testBlog3.title])

    })
  })

})
