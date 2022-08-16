class APIController {
    getTodos(req, res){
        req.models.Todo.find({}, (er, todos) => {
            if (er) {
                res.status(400).send(er)
            } else {
                res.json(todos)
            }
        })
    }
}
export default APIController