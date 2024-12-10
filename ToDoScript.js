'use strict';

// Получаем элемент списка из DOM
const list = document.getElementsByClassName("list")[0];

// Загружаем список дел при загрузке страницы
loadList();

// Функция для добавления нового элемента в список
function addItem() {
    // Запрашиваем у пользователя текст новой задачи
    const itemText = prompt("Что добавить?");

    // Если текст пустой или отменен, не добавляем задачу
    if (itemText === null || itemText.trim() === "") {
        return;
    }

    // Создаем новый элемент списка
    const item = createListItem(itemText);
    // Добавляем элемент в список на странице
    list.appendChild(item);
    // Сохраняем обновленный список в localStorage
    saveList();
}

// Функция для очистки всего списка
function clearList() {
    // Очищаем содержимое контейнера с задачами
    list.innerHTML = '';
    // Сохраняем пустой список в localStorage
    saveList();
}

// Функция для удаления задачи
function deleteItem(event) {
    // Удаляем родительский элемент кнопки (саму задачу)
    event.target.parentElement.remove();
    // Сохраняем обновленный список в localStorage
    saveList();
}

// Функция для создания элемента списка с текстом задачи
function createListItem(text) {
    const item = document.createElement("div"); // Создаем новый элемент div для задачи
    // Вставляем текст задачи и кнопку удаления
    item.innerHTML = `${text}<button class="btn delete-btn">X</button>`;

    // Получаем кнопку удаления из только что созданного элемента
    const deleteButton = item.querySelector(".delete-btn");
    // Добавляем обработчик события для удаления задачи при клике на кнопку
    deleteButton.addEventListener("click", deleteItem);

    // Возвращаем готовый элемент задачи
    return item;
}

// Функция для сохранения списка задач в localStorage
function saveList() {
    const items = [];
    // Получаем все элементы в списке
    const listItems = list.children;

    // Проходим по всем элементам списка и извлекаем текст каждой задачи
    for (let i = 0; i < listItems.length; i++) {
        const text = listItems[i].firstChild.textContent
            .replace("X", "")  // Убираем символ кнопки "X"
            .trim();            // Убираем лишние пробелы
        items.push(text);     // Добавляем текст задачи в массив
    }

    // Сохраняем массив задач в localStorage в формате JSON
    localStorage.setItem("todoList", JSON.stringify(items));
}

// Функция для загрузки списка задач из localStorage
function loadList() {
    // Получаем данные из localStorage и парсим их в массив
    const items = JSON.parse(localStorage.getItem("todoList"));

    // Если в localStorage есть сохраненные задачи, добавляем их в список
    if (items) {
        for (const itemText of items) {
            const item = createListItem(itemText);  // Создаем элемент для каждой задачи
            list.appendChild(item);  // Добавляем элемент в список
        }
    }
}