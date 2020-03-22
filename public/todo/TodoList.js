import Component from '../Component.js';
import TodoItem from './TodoItem.js';

class TodoList extends Component {
    
    onRender(list) {
        const { todos, onUpdate, onRemove } = this.props;

        todos
            .map(todo => new TodoItem({ todo, onUpdate, onRemove }))
            .map(todo => todo.renderDOM())
            .forEach(dom => list.appendChild(dom));

        // todos.forEach(todo => {
        //     const todoItem = new TodoItem({ todo, onUpdate, onRemove});
        //     list.appendChild.renderDOM(); 
        // });
    }
    renderHTML() {
        return /*html*/`
            <ul class="todo-list"></ul>
        `;
    }
}

export default TodoList;
