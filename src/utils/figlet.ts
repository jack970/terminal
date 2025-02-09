import figlet from 'figlet'
import Slant from 'figlet/importable-fonts/Slant'

export const createText = (text: string) => {
    let asciiText: string = ''

    if (text === '') {
        return `Usage: figlet [text].`
    }

    figlet.parseFont('Slant', Slant)
    figlet.text(text, {
        font: 'Slant',
    }, (err, data) => {
        if (err) {
            console.error(err)
            return false
        }

        asciiText = data
    })

    return asciiText
}
