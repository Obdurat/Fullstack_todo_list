const addUser = (req, res) => {
    res.send('User Added !!!');
}

const updateUser = (req, res) => {
    res.send('User Updated !!!');
}

const deleteUser = (req, res) => {
    res.send('User Deleted !!!');
}

module.exports = {
    addUser,
    updateUser,
    deleteUser,
}