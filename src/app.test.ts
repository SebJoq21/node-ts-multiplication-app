import { ServerApp } from "./presentation/server-app"

describe('test - App', () => {

    test('Should call Server.run with values', async() => {

        const serverRunMock = jest.fn()
        ServerApp.run = serverRunMock
        process.argv = ['node', 'app.ts', '-b', '10', '']

    })

})