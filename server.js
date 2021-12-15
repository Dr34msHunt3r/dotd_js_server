
// server.js
const uuid = require('uuid')
const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()
var ingredients = []
const recipes = []


server.use(middlewares)
server.use(jsonServer.bodyParser)

//RECIPES
//NOTE: recipe collection works only for POSTMAN
server.post('/recipes/addcollection',(req,res) => {
    req.body.map((item) => {recipes.push({id:uuid.v4(),favourite:item.favourite,imageUrl:item.imageUrl,title:item.title,recipe:item.recipe})})
    res.send({recipes}) 
})
server.post('/recipes/add',(req,res) => {
    recipes.push({id:uuid.v4(),favourite:req.body.favourite,imageUrl:req.body.imageUrl,title:req.body.title,recipe:req.body.recipe})
    res.send(recipes[recipes.length-1]) 
})
server.get('/recipes/get',(req,res) => {
    res.send(recipes.map((item) => item))
})
server.delete('/recipes/delete:id',(req,res) => {
    var counter = recipes.length
    for(var i=0; i < counter; i++){
        if(req.body.id == recipes[i].id){
            recipes.splice(i,1)
            counter--
            i--
        }
    }
    res.send(true)
})
server.put('/recipes/put:id',(req,res) => {
    for(var i=0; i < recipes.length; i++){
        if(req.body.id == recipes[i].id){
            recipes[i] = {id:req.body.id,favourite:req.body.favourite,imageUrl:req.body.imageUrl,title:req.body.title,recipe:req.body.recipe}
        }
    }
    res.send(true)
})

//INGREDIENTS
server.post('/ingredients/addcollection',(req, res) =>{
    const newIngredientCollection = []
    for(var i=0; i < (JSON.parse(req.body.ingredients)).length; i++){
        newIngredientCollection.push({id:uuid.v4(),name:(JSON.parse(req.body.ingredients))[i].name,recipeId:(JSON.parse(req.body.ingredients))[i].recipeId})
    }
    ingredients = ingredients.concat(newIngredientCollection)
    res.send(newIngredientCollection.map((item) => item)) 
})
server.get('/ingredients/get',(req,res) => {
    res.send(ingredients.map((item) => item))
})
server.put('/ingredients/putcollection', (req,res) => {
    var recipeId = JSON.parse(req.body.recipeId)
    var updatedIngredients = JSON.parse(req.body.ingredients)
    var newIngredients = []
    for(var i=0; i < ingredients.length; i++){
        if(ingredients[i].recipeId == recipeId){
            ingredients.splice(i,1)
            i--
        }
    }
    for(var i=0; i < updatedIngredients.length; i++){
        if(updatedIngredients[i].id == ''){
            updatedIngredients[i].id = uuid.v4()
            newIngredients.push(updatedIngredients[i])
        }
    }
    ingredients = ingredients.concat(updatedIngredients)
    res.send(newIngredients.map((item) => item))
})
server.listen(3000, () => {
  console.log('\u001b[' + 32 + 'm' + "Congrats! " + '\u001b[0m')
  console.log('\u001b[' + 32 + 'm' + "You're successfully running JSON Server" + '\u001b[0m')
  console.log('\u001b[' + 32 + 'm' + " ✧*｡٩(ˊᗜ\``*)و✧*｡ " + '\u001b[0m')
})
