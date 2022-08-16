class MainController {
    index(req, res){
        const Todo = req.models.Todo
        Todo.find({username: req.session.username}, (er, todos) => {
            if (er) {
                res.status(400).send(er)
            } else {
                res.render("index.ejs", {todos})
            }
        })
    }
    new(req, res){
        res.render("new.ejs")
    }
    create(req, res){
        const Todo = req.models.Todo
        req.body.completed = false
        req.body.username = req.session.username
        Todo.create(req.body, (er, todo) => {
            if (er) {
                res.status(400).send(er)
            } else {
                res.redirect("/todo")
            }
        })
    }
    show(req, res){
        const id = req.params.id
        const Todo = req.models.Todo
        Todo.findById(id, (er, todo) => {
            if (er) {
                res.status(400).send(er)
            } else {
                res.render("show.ejs", {todo})
            }
        })
    }
    complete(req, res){
        const id = req.params.id
        const Todo = req.models.Todo
        Todo.findByIdAndUpdate(id, {completed: true}, {new: true}, (er, todo) => {
            if (er) {
                res.status(400).send(er)
            } else {
                res.redirect("/todo")
            }
        })
    }
    destroy(req, res){
        const id = req.params.id
        const Todo = req.models.Todo
        Todo.findByIdAndDelete(id, (er, todo) => {
            if (er) {
                res.status(400).send(er)
            } else {
                res.redirect("/todo")
            }
        })
    }
}
export default MainController