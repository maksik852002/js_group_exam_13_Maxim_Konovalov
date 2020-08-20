#language:ru

Функционал: Создание нового заведения
Как незалогиненный пользователь я хочу залогиниться и создать заведение
 Сценарий:
    Допустим я нахожусь на странице логина
    Если я заполняю поля формы:
      | username | admin |
      | password | 123 |
    И нажимаю на кнопку "Log in"
    То я вижу текст "Logged in successfully"
    Допустим я нахожусь на странице создания заведения
    Если я заполняю поля формы:
      | Title | new title  |
      | Description | new description |
    И нажимаю на поле "Image"
    И нажимаю на чекбокс 'I understand'
    И нажимаю на кнопку "Add place"
    То я вижу текст "Place created"
    Допустим я нахожусь на корневой странице
    И нажимаю на кнопку "Hog's Head"
    И раскрываю форму отзыва 
    Если я заполняю поля формы:
    | Leave a comment | new comment  |
    И нажимаю на звездочку 'label[for=qualityOfFood-3]'
    И нажимаю на звездочку 'label[for=serviceQuality-3]'
    И нажимаю на звездочку 'label[for=interior-3]'
    И нажимаю на кнопку "Submit"
    То я вижу общую оценку 'Ok'