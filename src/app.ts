import express from 'express'
import Router from './Router'
import swaggerUi from 'swagger-ui-express'
import swaggerDocument from './swagger.json'

class App {
  private httpServer: any

  constructor() {
    this.httpServer = express()
    new Router(this.httpServer);
    this.httpServer.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));     
  }

  public Start = (port: number) => {
    return new Promise((resolve, reject) => {

      this.httpServer.listen(
        port,
        () => {
          resolve(port)
        })
        .on('error', (err: object) => reject(err));
    })
  }
}

export default App;
