
const textTobeDone= "What needs to be done?";
const TODO_LIST=[
    "Limpiar",
    "Deporte",
    "Compra"
]

export async function writeTask(page){
    const placeholder=page.getByPlaceholder(textTobeDone);
        for(var item of TODO_LIST){
            await placeholder.click();
            await placeholder.fill(item);
            await placeholder.press('Enter');
        }
}
