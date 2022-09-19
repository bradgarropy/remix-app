import type {Todo} from "@prisma/client"
import type {
    ActionFunction,
    LoaderFunction,
    MetaFunction,
} from "@remix-run/node"
import {json} from "@remix-run/node"
import {Form, useLoaderData, useSubmit} from "@remix-run/react"
import type {ChangeEventHandler} from "react"

import {requireUser} from "~/utils/auth.server"
import {createTodo, deleteTodo, getTodos, updateTodo} from "~/utils/todo.server"

const meta: MetaFunction = () => ({
    title: "💿 remix app | todos",
})

type LoaderData = {
    todos: Todo[]
}

const loader: LoaderFunction = async ({request}) => {
    const userId = await requireUser(request)

    const todos = await getTodos(userId)
    return json<LoaderData>({todos})
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
            <Form method="post" className="mb-12">
                <div className="grid">
                    <label htmlFor="content">Todo</label>

                    <input
                        type="text"
                        name="content"
                        id="content"
                        className="text-black"
                    />
                </div>

                <button type="submit" name="action" value="create">
                    Create
                </button>
            </Form>

            {todos.map(todo => {
                return (
                    <div key={todo.id} className="grid grid-flow-col mb-4">
                        <Form method="post" onChange={handleChange}>
                            <input type="hidden" name="action" value="update" />
                            <input type="hidden" name="id" value={todo.id} />

                            <input
                                type="checkbox"
                                name="isComplete"
                                id="isComplete"
                                defaultChecked={todo.isComplete}
                            />
                        </Form>

                        <p>{todo.content}</p>

                        <Form method="post">
                            <input type="hidden" name="action" value="delete" />
                            <input type="hidden" name="id" value={todo.id} />
                            <button type="submit">Delete</button>
                        </Form>
                    </div>
                )
            })}
        </>
    )
}

export default TodosRoute
export {action, loader, meta}
