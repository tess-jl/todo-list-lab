import TodoItem from '../todo/TodoItem.js';
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
    <li class="todo-list-item">
        <span class="${todo.complete ? 'inactive' : ''}">${todo.task}</span>
        <div>

            <button class="inactive-button">
                Make ${todo.complete ? 'Inactive' : 'Active'}
            </button>
            
            <button class="remove-button">
                🗑
            </button>
            
        </div>
    </li>
    `;

    // act
    const todoItem = new TodoItem({ todo: todo });
    const html = todoItem.renderHTML();
    
    // assert
    assert.htmlEqual(html, expected);
});