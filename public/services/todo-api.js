const URL = '/api';

//this is a wrapper around fetch 
async function fetchWithError(url, options) {
    const response = await fetch(url, options);
    const data = await response.json();

    if (response.ok) {
        return data;
    }
    else {
        throw data.error;
    }
}

export function getTodos() {  
    const url = `${URL}/todos`;
    return fetchWithError(url);
}

//make sure i'm sending along the body because it's a post!!!
export function addTodo(todo) {  
    const url = `${URL}/todos`;
    return fetchWithError(url, {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(todo)
    });
}

export function updateTodo(todo) {  
    const url = `${URL}/todos/${todo.id}`;
    return fetchWithError(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        }, 
        body: JSON.stringify(todo)
    });
    
}

export function removeTodo(todoId) {  
    const url = `${URL}/todos/${todoId}`;
    return fetchWithError(url, {
        method: 'DELETE'
    });
}

