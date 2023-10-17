import { test, expect } from '@playwright/test';
import { skip } from 'node:test';
import {writeTask} from '../helpers/helpers.spec';
import { hasUncaughtExceptionCaptureCallback } from 'node:process';
const textTobeDone= "What needs to be done?";
const TODO_LIST=[
    "Limpiar",
    "Deporte",
    "Compra"
]


test.beforeEach(async({page})=>{
    await page.goto('todomvc/');
});

test.describe("navigatio",()=>{

    test.skip('main navigation', async ({page}) => {
        await page.goto('todomvc/');
    
        await expect(page).toHaveTitle("React • TodoMVC");
    });

   
});

test.describe("List Functionality", ()=>{

    test.skip('fill one task',async({page})=>{

        const placeholder=page.getByPlaceholder(textTobeDone)
        await placeholder.click();
        await placeholder.fill(TODO_LIST[0]);
        await placeholder.press('Enter');
    
        await expect(page.getByTestId("todo-item")).toBeVisible();
        await expect(page.getByTestId("todo-item")).toHaveText(TODO_LIST[0]);
        
    });
    
    test.skip('fill two task',async({page})=>{
    
        const placeholder=page.getByPlaceholder(textTobeDone)
        for(var item in TODO_LIST){
            await placeholder.click();
            await placeholder.fill(item);
            await placeholder.press('Enter');
        }
        await expect(page.getByTestId("todo-item")).toHaveCount(3);
    });
    
    test.skip ('clear input after add a task', async({page})=>{
    
        const placeholder=page.getByPlaceholder(textTobeDone);
        await placeholder.click();
        await placeholder.fill(TODO_LIST[0]);
        await placeholder.press('Enter');
        await expect(placeholder).toBeEmpty();
    
    });

    test.skip ('Assert that are 3 elements in the list', async({page})=>{
        
        await writeTask(page)
        
        const todoCount=page.getByTestId("todo-count");

        await expect(page.getByText("3 items left")).toBeVisible();
        await expect(todoCount).toHaveText("3 items left");
        await expect(todoCount).toContainText('3');
    });

    test.skip('Add 3 todos and check', async({page})=>{

        await writeTask(page)
        const todoCount=page.getByTestId("todo-count");

        await page.getByLabel("Mark all as complete").check();

        const numCompletedItems= await page.locator(".completed").count();

        await expect(numCompletedItems).toBe(3);

    });

    test.skip('Add 3 todos and check and uncheck', async({page})=>{

        await writeTask(page)
        const todoCount=page.getByTestId("todo-count");

        await page.getByLabel("Mark all as complete").click();

        var todoItems= await page.getByTestId("todo-item").all();

        for(const li of todoItems){
            await expect(li).toHaveClass('completed')
        }
        await page.getByLabel("Mark all as complete").click();

        todoItems= await page.getByTestId("todo-item").all();

        for(const li of todoItems){
            await expect(li).not.toHaveClass('completed')
        }
    });
    //test que compruebe que se puede editar con doble click el elemento de la lista
    test('Add 3 todos and edit with double click', async({page})=>{
        await writeTask(page);

        const todoItem=await page.getByTestId("todo-item");
        const secondTodo=todoItem.nth(1);
        await secondTodo.dblclick();
        await expect(secondTodo.getByRole("textbox",{name: "Edit"})).toHaveValue(TODO_LIST[1]);
        await secondTodo.getByRole("textbox",{name : "Edit"}).fill("comprar jabon de labadora");
        await secondTodo.getByRole("textbox",{name : "Edit"}).press("Enter");

        await expect(page.getByText("comprar jabon de labadora")).toBeVisible();
        
    });

    test.skip('Add 3 todos and check one and delete it', async({page})=>{

        await writeTask(page)
        const todoItems=page.getByTestId("todo-count");

        await page.getByLabel("Mark all as complete").check();
        await page.getByRole('button', {name : 'Clear completed'}).click();
        await expect(todoItems).toHaveCount(2);
    });
})




 