# Strider
Эмулятор родного приложения sms в Xiaomi

[![Test covered](https://github.com/asavan/strider/actions/workflows/static.yml/badge.svg)](https://github.com/asavan/strider/actions/workflows/static.yml)

## Screenshots

Original             |  Simulator
:-------------------------:|:-------------------------:
![Original](/assets/photo_5307573224525125836_y.jpg)  |  ![Simulator](/assets/photo_5307573224525126292_y.jpg)

## TODO
- [x] раскрасить даты и числа в синий цвет
- [x] выводить дату для сообщений "туда"
- [x] поиграть с шрифтами для даты (сделать поуже), и с высотой между линиями большого текста (сделать больше)
- [x] время отправки писать московское, время отправления брать минус 2 часа 15 мин.
- [x] запоминать сгенерированную дату и число в session storage (протухать через 30 минут);
- [ ] 5 кликов по "плюсику" очишает session storage
- [x] собрать данные и посчитать magic коэффициент более точно.
- [ ] добавить интерактивность, позволить обрабатывать C90, A90, B90, недопустимое (Sintaksna greska)
- [x] select none для кнопок и возможно текстов.
