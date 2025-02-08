import figlet from 'figlet'
import Standard from '../../node_modules/figlet/importable-fonts/Standard'

export const createText = (text: string) => {
    let asciiText: string = ''

    figlet.parseFont('Standard', Standard)
    figlet.text(text, {
        font: 'Standard',
    }, (err, data) => {
        if (err) {
            console.error(err)
            return false
        }

        asciiText = data
    })

    return asciiText
}
