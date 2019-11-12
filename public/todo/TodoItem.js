import Component from '../Component.js';

class TodoItem extends Component {

    onRender(dom) {
        const todo = this.props.todo;
        const onUpdate = this.props.onUpdate;
        const onRemove = this.props.onRemove;

        
    }

    renderHTML() {
        const { todo } = this.props;

        return /*html*/`
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
    }
}

export default TodoItem;