import Component from '../Component.js';

class AddTodo extends Component {

    onRender(dom) {
        const { onAdd } = this.props;
        const form = dom.querySelector('form');
        const input = dom.querySelector('input[name=todo]');
        
        form.addEventListener('submit', async event => {
            event.preventDefault();

            const todoTask = {
                name: input.value
            };

            try {
                await onAdd(todoTask);
            
                form.reset();
                document.activeElement.blur();
            }
            catch (err) {
                //nothing to do here
            }
        });
    }

    renderHTML() {
        return /*html*/`
            <form class="todo-form">
                <input name="todo" required>
                <button>Add</button>
            </form>
        `;
    }
}

export default AddTodo;