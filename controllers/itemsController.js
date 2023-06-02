const createItem = async (req, res) => {
    res.send('create item')
}

const getAllItems = async (req, res) => {
    res.send('get all items')
}

const updateItem = async (req, res) => {
    res.send('update item')
}

const deleteItem = async (req, res) => {
    res.send('delete item')
}

const showStats = async (req, res) => {
    res.send('show stats')
}


export { createItem, deleteItem, getAllItems, updateItem, showStats };
