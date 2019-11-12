import Component from '../Component.js';
import Header from '../common/Header.js';
import Loading from '../common/Loading.js';
import AddTodo from './AddTodo.js';
import TodoList from './TodoList.js';
import { getTodos, addTodo, updateTodo, removeTodo } from '../services/todo-api.js';

class TodoApp extends Component {

    async onRender(dom) {
        const header = new Header({ title: 'My Todos' });
        dom.prepend(header.renderDOM());
        
        const main = dom.querySelector('main');
        const error = dom.querySelector('.error');

        const loading = new Loading({ loading: true });
        dom.appendChild(loading.renderDOM());

        // initial todo load:
        const addTodo = new AddTodo({
            onAdd: async type => {
                loading.update({ loading: true });
                // clear prior error
                error.textContent = '';
                try {
                    const saved = await addTodo(todo);

                    const { todos }= this.state;
                    todos.push(saved);

                    //tell component to update
                    todoList.update({ todos });
                }
                catch (err) {
                    console.log('TodoApp.js catch error: '+ err);
                }
                finally {
                    loading.update({ loading: false });
                }
            }
        });
        main.appendChild(addToDo.renderDOM());
    }

    renderHTML() {
        return /*html*/`
            <div>
                <!-- header goes here -->
                <!-- show errors: -->
                <p class="error"></p>
                <main>
                    <!-- add todo goes here -->
                    <!-- todo list goes here -->
                </main>
            </div>
        `;
    }
}

export default TodoApp;