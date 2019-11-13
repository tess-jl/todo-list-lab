import Component from '../Component.js';

class Header extends Component {
    renderHTML() {
        const title = this.props.title || 'My Alchemy homework to do list';

        return /*html*/`
            <header>
                <img class="logo" src="assets/alchemy-logo.png" alt="Alchemy Code Lab Logo">
                <h1>${title}</h1>
                <nav>
                    <a href="./">Home</a>
                    <a href="./todo.html">Todos</a>
                </nav>
            </header>
        `;
    }
}

export default Header;