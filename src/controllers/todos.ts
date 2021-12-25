import { RequestHandler } from 'express';
import { RequestHandlerConstructor } from 'serve-static';
import { Todo } from '../models/todo';

const TODOS: Todo[] = [];

export const createTodo: RequestHandler = (req, res, next) => {
    const { body: { text } } = req;
    const newTodo = new Todo(Math.random().toString(), text);
    TODOS.push(newTodo);

    res.status(201).json({
        message: 'Created todo',
        createdTodo: newTodo
    });
}

export const getTodos: RequestHandler = (req, res, next) => {
    res.json({
        todos: TODOS
    });
}

export const getTodo: RequestHandler = (req, res, next) => {
    const { params: { id} } = req;
    const todoById = TODOS.filter(todo => todo.id === id);
    res.json({
        todos: todoById
    });
}

export const updateTodo: RequestHandler<{ id: string }> = (req, res, next) => {
    const { params: { id }, body: { text } } = req;
    const findTodoIndex = TODOS.findIndex(todo => todo.id === id);

    if(findTodoIndex) {
        TODOS[findTodoIndex] = new Todo(TODOS[findTodoIndex].id, text);
    }

    res.json({
        message: 'updated todos',
        updatedTodo: TODOS[findTodoIndex]
    });
}

export const deleteTodo: RequestHandler = (req, res, next) => {
    const { params: { id }, body: { text } } = req;
    const findTodoIndex = TODOS.findIndex(todo => todo.id === id);

    if(findTodoIndex) {
        TODOS.splice(findTodoIndex, 1)
    }

    res.json({
        message: 'deleted todos'
    });
}