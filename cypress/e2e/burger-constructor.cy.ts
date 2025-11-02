import type { TIngredient } from '../../src/utils/types';
const API = Cypress.env('BURGER_API_URL');
const localhost = 'http://localhost:4000';

describe('Тест бургер-конструктора (сценарий для авторизованного пользователя)', () => {
  beforeEach(() => {
    cy.intercept('GET', `${API}/ingredients`, {
      fixture: 'ingredients.json'
    }).as('getIngredients');
    cy.intercept('GET', `${API}/auth/user`, {
      fixture: 'user.json'
    }).as('getUser');
    cy.intercept('POST', `${API}/orders`, {
      fixture: 'order.json'
    }).as('createOrder');

    window.localStorage.setItem('accessToken', 'test-access-token');
    window.localStorage.setItem('refreshToken', 'test-refresh-token');

    cy.visit(localhost);
    cy.wait('@getIngredients');
    cy.wait('@getUser');
  });

  afterEach(() => {
    cy.clearLocalStorage();
  });

  it('Загрузка ингредиентов при запуске приложения', () => {
    cy.contains('Соберите бургер').should('be.visible');

    cy.fixture('ingredients.json').then((ingredientData) => {
      ingredientData.data.forEach((ingredient: TIngredient) => {
        cy.contains(ingredient.name).should('exist');
      });
    });
  });

  it('Добавление ингредиента в конструктор', () => {
    cy.get('[data-cy="ingredient-bun"]').contains('button', 'Добавить').click();

    cy.get('[data-cy="ingredient-main"]')
      .contains('button', 'Добавить')
      .click();

    cy.get('[data-cy="ingredient-sauce"]')
      .contains('button', 'Добавить')
      .click();

    cy.get('[data-cy="constructor-bun-top"]').should('exist');
    cy.get('[data-cy="constructor-bun-bottom"]').should('exist');
    cy.get('[data-cy="constructor-filling-empty"]').should('not.exist');

    cy.get('[data-cy="order-button"]').should('be.enabled');
  });

  describe('Работа модального окна', () => {
    it('Открытие модального окна', () => {
      cy.get('[data-cy="ingredient-details-link"]').first().click();
      cy.get('[data-cy="modal"]').should('be.visible');
      cy.contains('Состав ингредиента').should('exist');
    });

    it('Закрытие модального окна по кнопке закрытия', () => {
      cy.get('[data-cy="ingredient-details-link"]').first().click();
      cy.get('[data-cy="modal-close-button"]').click();
      cy.get('[data-cy="modal"]').should('not.exist');
    });

    it('Закрытие модального окна по нажатию на оверлей', () => {
      cy.get('[data-cy="ingredient-details-link"]').first().click();
      cy.get('[data-cy="modal-overlay"]').click({ force: true });
      cy.get('[data-cy="modal"]').should('not.exist');
    });
  });

  it('Полный процесс создания заказа', () => {
    cy.get('[data-cy="ingredient-bun"]')
      .contains('Флюоресцентная булка R2-D3')
      .parent()
      .contains('button', 'Добавить')
      .click();

    cy.get('[data-cy="ingredient-main"]')
      .contains('Говяжий метеорит (отбивная)')
      .parent()
      .contains('button', 'Добавить')
      .click();

    cy.get('[data-cy="ingredient-main"]')
      .contains('Мясо бессмертных моллюсков Protostomia')
      .parent()
      .contains('button', 'Добавить')
      .click();

    cy.get('[data-cy="ingredient-main"]')
      .contains('Хрустящие минеральные кольца')
      .parent()
      .contains('button', 'Добавить')
      .click();

    cy.get('[data-cy="ingredient-main"]')
      .contains('Плоды Фалленианского дерева')
      .parent()
      .contains('button', 'Добавить')
      .click();

    cy.get('[data-cy="ingredient-sauce"]')
      .contains('Соус Spicy-X')
      .parent()
      .contains('button', 'Добавить')
      .click();

    cy.get('[data-cy="order-button"]').click();

    cy.wait('@createOrder');

    cy.get('[data-cy="modal"]').should('be.visible');

    cy.contains('92877').should('exist');

    cy.get('[data-cy="modal-close-button"]').click();

    cy.get('[data-cy="modal"]').should('not.exist');
    cy.get('[data-cy="constructor-bun-top"]').should('not.exist');
    cy.get('[data-cy="constructor-bun-bottom"]').should('not.exist');
    cy.get('[data-cy="constructor-filling-empty"]').should('exist');
  });
});

describe('Тест бургер-конструктора (альтернативный сценарий для неавторизованного пользователя)', () => {
  beforeEach(() => {
    cy.intercept('GET', `${API}/ingredients`, {
      fixture: 'ingredients.json'
    }).as('getIngredients');

    cy.visit(localhost);
    cy.wait('@getIngredients');
  });

  it('Создание заказа при отсутствии авторизации', () => {
    cy.get('[data-cy="ingredient-bun"]')
      .contains('Флюоресцентная булка R2-D3')
      .parent()
      .contains('button', 'Добавить')
      .click();

    cy.get('[data-cy="ingredient-main"]')
      .contains('Говяжий метеорит (отбивная)')
      .parent()
      .contains('button', 'Добавить')
      .click();

    cy.get('[data-cy="ingredient-sauce"]')
      .contains('Соус Spicy-X')
      .parent()
      .contains('button', 'Добавить')
      .click();

    cy.get('[data-cy="order-button"]').click();

    cy.url().should('include', '/login');
    cy.contains('Вход').should('exist');
    cy.get('[data-cy="login-page"]').should('exist');
  });
});
