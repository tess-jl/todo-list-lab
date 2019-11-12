import Component from '../Component.js';
import TodoItem from './TodoItem.js';

class TodoList extends Component {
    
    onRender(list) {
        const { todos, onUpdate, onRemove } = this.props;

        todos
            .map(todos => new TodoItem({ todos, onUpdate, onRemove }))
            .map(todo => todo.renderDOM())
            .forEach(dom => list.appendChild(dom));
    }
    renderHTML() {
        return /*html*/`
            <ul class="todo-list"></ul>
        `;
    }
}

export default TodoList;
