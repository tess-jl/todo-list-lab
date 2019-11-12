import Component from '../Component.js';

class AddTodo extends Component {

    onRender(form) {
        const { onAdd } = this.props;
        
        form.addEventListener('submit', async event => {
            event.preventDefault();

            const formData = new FormData(form); 

            const todoTask = {
                task: formData.get('todo'), 
                complete: false
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