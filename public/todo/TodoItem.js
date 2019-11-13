import Component from '../Component.js';

class TodoItem extends Component {

    onRender(dom) {
        const { todo, onUpdate, onRemove } = this.props;

        const inactiveButton = dom.querySelector('.inactive-button');
        inactiveButton.addEventListener('click', () => {
            todo.complete = !todo.complete;
            onUpdate(todo);
        });
        
        const removeButton = dom.querySelector('.remove-button');
        removeButton.addEventListener('click', () => {
            const confirmed = confirm(`Are you sure you want to remove "${todo.task}"?`);
            if (confirmed) {
                onRemove(todo);
            }
        });
    }

    renderHTML() {
        const { todo } = this.props;

        return /*html*/`
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
    }
}

export default TodoItem;