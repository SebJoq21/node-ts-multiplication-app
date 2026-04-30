import { SaveFile } from "./save-file.use-case"
import fs, { mkdir, writeFile } from 'fs'

describe('SafeFileUseCase', () => {

    const customOptions = {
        fileContent: 'custom options',
        destination: 'custom-options/file-destination',
        fileName: 'custom-table-name'
    }

    const customFilePath = `${customOptions.destination}/${customOptions.fileName}.txt`

    afterEach( () => {
        const outputFolderExists = fs.existsSync('outputs')
            if( outputFolderExists ) fs.rmSync('outputs', { recursive: true })

        const customOutputFolderExists = fs.existsSync(customOptions.destination)
        if ( customOutputFolderExists ) fs.rmSync(customOptions.destination, { recursive: true })
    })

    test('should save file with default values', () => {

        const saveFile = new SaveFile()
        const filePath = 'outputs/table.txt'
        const options = {
            fileContent: 'test content'
        }

        const result = saveFile.execute(options)

        expect( result ).toBe( true)
        const checkFile = fs.existsSync( filePath )
        const fileContent = fs.readFileSync( filePath, { encoding: 'utf-8'})
        
        expect( checkFile ).toBe( true )
        expect( fileContent ).toBe( options.fileContent )
    })

    test('Should save file with custom values', () => {

        const saveFile = new SaveFile()
        const options = {
            fileContent: 'custom options',
            destination: 'custom-options/file-destination',
            fileName: 'custom-table-name'
        }
        
        const filePath = `${options.destination}/${options.fileName}.txt`
        
        const result = saveFile.execute( options )
        const fileExists = fs.existsSync( filePath )
        const fileContent = fs.readFileSync( filePath, { encoding: 'utf-8' })

        expect( result ).toBe( true )
        expect( fileExists ).toBe( true )
        expect( fileContent ).toBe( options.fileContent )
    })

    test('should return false if directory could not be created', () => {

        const saveFile = new SaveFile()
        const mkdirSpy = jest.spyOn(fs, 'mkdirSync').mockImplementation(
            () => { throw new Error('This is a custom error message from testing ') }
        )

        const result = saveFile.execute(customOptions)

        expect( result ).toBe( false )

        mkdirSpy.mockRestore()

    })

    test('should return false if file could not be created', () => {

        const saveFile = new SaveFile()
        const WriteFileSpy = jest.spyOn(fs, 'writeFileSync').mockImplementation(
            () => { throw new Error('This is a custom writing error message ') }
        )

        const result = saveFile.execute({ fileContent: 'Hola'})

        expect( result ).toBe( false )

        WriteFileSpy.mockRestore()

    })

})