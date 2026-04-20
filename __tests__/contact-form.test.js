/**
 * @jest-environment jsdom
 */

const fs = require('fs');
const path = require('path');

// Mock DOM elements
document.body.innerHTML = `
  <form id="contact-form">
    <input type="text" id="firstname" name="firstname" required>
    <input type="text" id="lastname" name="lastname" required>
    <input type="email" id="email" name="email" required>
    <select id="sujet" name="sujet" required>
      <option value="">-- Choisir un sujet --</option>
      <option value="stage">Proposition de stage</option>
    </select>
    <textarea id="message" name="message" required></textarea>
    <button type="submit">Envoyer</button>
  </form>
  <div id="form-success" hidden></div>
  <div id="form-error" hidden></div>
  <span id="char-count">0</span>
`;

// Load the contact form script
const contactFormScript = fs.readFileSync(path.join(__dirname, 'js/contact-form.js'), 'utf8');
eval(contactFormScript);

describe('Contact Form Validation', () => {
  test('should validate required fields', () => {
    const form = document.getElementById('contact-form');
    const firstname = document.getElementById('firstname');
    const lastname = document.getElementById('lastname');
    const email = document.getElementById('email');
    const sujet = document.getElementById('sujet');
    const message = document.getElementById('message');

    // Test empty form
    expect(form.checkValidity()).toBe(false);

    // Fill required fields
    firstname.value = 'John';
    lastname.value = 'Doe';
    email.value = 'john.doe@example.com';
    sujet.value = 'stage';
    message.value = 'Hello world';

    expect(form.checkValidity()).toBe(true);
  });

  test('should validate email format', () => {
    const email = document.getElementById('email');

    email.value = 'invalid-email';
    expect(email.validity.valid).toBe(false);

    email.value = 'valid@email.com';
    expect(email.validity.valid).toBe(true);
  });

  test('should count characters in message', () => {
    const message = document.getElementById('message');
    const charCount = document.getElementById('char-count');

    message.value = 'Hello';
    // Trigger input event
    message.dispatchEvent(new Event('input'));

    expect(charCount.textContent).toBe('5');
  });
});