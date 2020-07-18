const { I } = inject();
// Add in your custom step files

Given('я нахожусь на странице логина', () => {
  I.amOnPage('/login');
});

When('я заполняю поля формы:', table => {
  const tableData = table.parse().rawData;

  tableData.forEach((row) => {
    I.fillField(row[0], row[1]);
  });
});

When('нажимаю на кнопку {string}', name => {
  I.click(name);
});

Then('я вижу текст {string}', text => {
  I.waitForText(text);
});

Given('я нахожусь на странице создания заведения', () => {
  I.amOnPage('/add-place');
});

When('нажимаю на поле {string}', () => {
  I.attachFile('form input[name=image]', '../api/public/uploads/fixtures/vesna.jpg');
});

When('нажимаю на чекбокс {string}', name => {
  I.checkOption(name);
});

When('нажимаю на кнопку {string}', name => {
  I.click(name);
});

Then('я вижу текст {string}', text => {
  I.waitForText(text);
});

Given('я нахожусь на корневой странице', () => {
  I.amOnPage('/');
});

When('раскрываю форму отзыва', () => {
  I.click({css: '#comment'});
});

When('нажимаю на звездочку {string}', (css) => {
  I.click(css);
});

Then('я вижу общую оценку {string}', (text) => {
  I.see(text, '#overall');
});

