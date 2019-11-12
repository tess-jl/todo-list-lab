import TodoItem from '../todo-list/TodoItem.js';
const test = QUnit.test;

QUnit.module('Render Todo Item');

test('renders html from data', assert => {
    // arrange
    const todo = {
        id: 3,
        task: 'Tested Design',
        complete: true
    };

    const expected = /*html*/`
    <li class="todo-item">
        <div class="info-container">
            <h2>${todo.task}</h2>
        </div>
        <div class="complete-container">
            <input type="checkbox" id="box" name="todo-check">
            <label for="box">Completed</label>
        </div>
    </li>  
    `;

    // act
    const todoItem = new TodoItem({ todo: todo });
    const html = todoItem.renderHTML();
    
    // assert
    assert.htmlEqual(html, expected);
});