import { CreateTable } from "../domain/use-cases/create-table.use-case"
import { SaveFile } from "../domain/use-cases/save-file.use-case"

interface RunOption {
    base: number,
    limit: number,
    show: boolean,
    name: string,
    destination: string
}


export class ServerApp {


    static run({base, limit, show, name, destination}: RunOption){
        console.log('Server running...')
        
        const table = new CreateTable().execute({ base, limit })
        const wasCreate = new SaveFile()
            .execute({ 
                fileContent: table, 
                destination: destination, 
                fileName: name 
            })

        if( show ){
            console.log(table)
        }

        ( wasCreate )
            ? console.log('File created')
            : console.error('File not created')
    }

}