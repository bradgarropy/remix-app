import type {Todo, User} from "@prisma/client"

import {db} from "~/utils/db.server"

const createTodo = async (userId: User["id"], content: Todo["content"]) => {
    const todo = await db.todo.create({data: {content, userId}})
    return todo
}

const getTodos = async (userId: User["id"]) => {
    const todos = await db.todo.findMany({where: {userId: {equals: userId}}})
    return todos
}

const updateTodo = async (id: Todo["id"], data: Partial<Todo>) => {
    const todo = await db.todo.update({where: {id}, data})
    return todo
}

const deleteTodo = async (id: Todo["id"]) => {
    const todo = await db.todo.delete({where: {id}})
    return todo
}

export {createTodo, deleteTodo, getTodos, updateTodo}
