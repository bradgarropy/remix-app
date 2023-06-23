import type {Todo} from "@prisma/client"
import type {
    ActionFunction,
    LoaderFunction,
    V2_MetaFunction,
} from "@remix-run/node"
import {json} from "@remix-run/node"
import {Form, useLoaderData, useSubmit} from "@remix-run/react"
import type {ChangeEventHandler} from "react"
import {Fragment} from "react"

import {requireUser} from "~/utils/auth.server"
import {createTodo, deleteTodo, getTodos, updateTodo} from "~/utils/todo.server"

const meta: V2_MetaFunction = () => {
    return [
        {
            title: "💿 remix app | todos",
        },
    ]
}

type LoaderData = {
    todos: Todo[]
}

const loader: LoaderFunction = async ({request}) => {
    const userId = await requireUser(request)

    const todos = await getTodos(userId)
    return json({todos})
}

const action: ActionFunction = async ({request}) => {
    const userId = await requireUser(request)

    const form = await request.formData()
    const action = form.get("action")

    switch (action) {
        case "create": {
            const content = form.get("content") as string
            const todo = await createTodo(userId, content)

            return json(todo)
        }

        case "update": {
            const id = Number(form.get("id"))
            const isComplete = !!form.get("isComplete")
            const todo = await updateTodo(id, {isComplete})

            return json(todo)
        }

        case "delete": {
            const id = Number(form.get("id"))
            const todo = await deleteTodo(id)

            return json(todo)
        }

        default:
            break
    }
}

const TodosRoute = () => {
    const {todos} = useLoaderData<LoaderData>()
    const submit = useSubmit()

    const handleChange: ChangeEventHandler<HTMLFormElement> = event => {
        submit(event.currentTarget)
    }

    return (
        <>
            <Form method="post" className="max-w-2xl m-auto mb-12">
                <div className="grid grid-cols-new-todo">
                    <label htmlFor="content" className="hidden">
                        Todo
                    </label>

                    <input
                        type="text"
                        name="content"
                        id="content"
                        placeholder="new todo"
                        className="text-white border-b-4 border-b-remix-blue bg-neutral-900 p-6 text-lg  focus:outline-remix-blue rounded-tl-md"
                    />

                    <button
                        type="submit"
                        name="action"
                        value="create"
                        className="px-8 py-6 bg-remix-blue text-remix-black font-bold uppercase text-xl w-full rounded-tr-md"
                    >
                        Create
                    </button>
                </div>
            </Form>

            <div className="grid grid-cols-todos gap-4 max-w-2xl m-auto items-center">
                {todos.map(todo => {
                    return (
                        <Fragment key={todo.id}>
                            <Form method="post" onChange={handleChange}>
                                <input
                                    type="hidden"
                                    name="action"
                                    value="update"
                                />
                                <input
                                    type="hidden"
                                    name="id"
                                    value={todo.id}
                                />

                                <input
                                    type="checkbox"
                                    name="isComplete"
                                    id="isComplete"
                                    defaultChecked={todo.isComplete}
                                    className="w-6 h-6 cursor-pointer accent-remix-blue"
                                />
                            </Form>

                            <p>{todo.content}</p>

                            <Form method="post">
                                <input
                                    type="hidden"
                                    name="action"
                                    value="delete"
                                />
                                <input
                                    type="hidden"
                                    name="id"
                                    value={todo.id}
                                />

                                <button
                                    type="submit"
                                    className="border-4 rounded-md px-2 py-1 border-remix-blue"
                                >
                                    Delete
                                </button>
                            </Form>
                        </Fragment>
                    )
                })}
            </div>
        </>
    )
}

export default TodosRoute
export {action, loader, meta}
