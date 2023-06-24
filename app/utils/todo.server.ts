import {Todos, Users, getXataClient} from "~/xata"

const createTodo = async (userId: Users["id"], content: Todos["content"]) => {
    const xata = getXataClient()
    const todo = await xata.db.todos.create({content, user: userId})
    return todo
}

const getTodos = async (userId: Users["id"]) => {
    const xata = getXataClient()
    const todos = await xata.db.todos.filter({"user.id": userId}).getMany()
    return todos
}

const updateTodo = async (id: Todos["id"], data: Partial<Todos>) => {
    const xata = getXataClient()
    const todo = await xata.db.todos.update(id, data)
    return todo
}

const deleteTodo = async (id: Todos["id"]) => {
    const xata = getXataClient()
    const todo = await xata.db.todos.delete(id)
    return todo
}

export {createTodo, deleteTodo, getTodos, updateTodo}
