"use strict";

document.addEventListener("DOMContentLoaded", function () {
    // Вызов элементов
    const addForm = document.forms["add_form"],
    addInput = addForm.querySelector("input"),
    tasksWrapper = document.querySelector(".main_tasks");

    let DB = []; // Массив для хранения данных

    addForm.addEventListener("submit", (e) => { // Действия при отправке формы
        e.preventDefault(); // Отмена стандартного поведения страницы
        DB.push(addInput.value); // Добавляем значение в массив данных
        addForm.reset(); // Сброс формы
        renderItem(); // Вывоз функции построения страницы
    });

    // Функция построения страницы
    function renderItem() {
        tasksWrapper.style.display = "flex"; // Появляет место для постов
        tasksWrapper.innerHTML = ""; // Удаляет преждние/старые посты
        DB.forEach((str, i) => { // Перебор массива данных
            createItem(str, i); // Передаём значения и их индекс в функцию создания постов
        });
    };

    // Функция создания постов
    function createItem(str, i) {
        const item = document.createElement("div"); // Создаём див
        item.classList.add("main_item"); // Добавляем в див класс
        item.setAttribute("id", i); // Устанавливаем в див аттрибут id со значением индекса строки в массиве данных
        item.innerHTML = `
        <div class="item_base">
            <div class="item_title">${str}</div>
            <div class="item_btns">
                <button class="item_edit">Edit</button>
                <button class="item_delete">Delete</button>
            </div>
        </div>
        <div class="item_edit_mode">
                <div class="edit_title">Edit for: ${str}</div>
                <form class="edit_form" action="">
                    <input type="text" placeholder="Edit..." required>
                    <button>Edit</button>
                </form>
        </div>
        `;
        tasksWrapper.append(item); // Добавляем готовый пост на страницу

        item.querySelector(".item_edit").addEventListener("click", e => { // Действия при клике на кнопу "изменить"
            e.target.parentElement.parentElement.style.display = "none"; // Скрываем родительский элемент второго уровня
            e.target.parentElement.parentElement.nextElementSibling.style.display = "flex"; // Появляем форму изменения поста
        });
        item.querySelector(".item_delete").addEventListener("click", e => { // Действия при клике на кнопку "удалить"
            DB.splice(i, 1); // Удаление содержимого поста из массива данных
            renderItem(); // Запуск нового построения страницы
        });
        item.querySelector(".edit_form").addEventListener("submit", e => { // Действия при отправки формы изменения
            e.preventDefault(); // Отмена стандартого поведения страницы
            const input = item.querySelector(".edit_form input"); // Записываем инпут внутри формы в переменную
            DB[i] = input.value; // Перезаписываем значение внутри массива данных
            renderItem(); // Запуск нового построения страницы
        });
    };
});