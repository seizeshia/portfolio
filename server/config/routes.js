var controller = require('./../controllers/controller')

module.exports = (app) =>{
  app.get('/', controller.index)

}
