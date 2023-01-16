import { useContext } from "react"
import { PageContext } from "../../states/PageContext"

export const getPercent = () => {
    return
}

export const getCount = () => {
    return
}

export const getRanking = () => {
    return
}


const fillColors: string[] = [
    'rgba(255, 255, 255, 0.8)',
    '#C8F2C2',
    '#A4E9A7',
    '#89DD9C',
    '#70CE98',
    '#59BE96',
    '#44AC96',
    '#319795',
    '#24879B',
    '#1B759E',
    '#12609F',
    '#0A47A1',
    '#032DA1'
];
export const getFillColor = (count: number, viewByFormat: string, totalCount?: number) => {

    let multiplier: number = viewByFormat === 'Percent' ? 10 : viewByFormat === 'Count' ? 100 : 0
    let fillColor: string = ''
    let sum = 0;
    const sliceFillColors = fillColors.slice(0, 11)
    if (viewByFormat === 'Percent') {
        console.log(totalCount)
        if (count === 0) {
            return sliceFillColors[0]
        } else {
            for (let i = 0; i <= sliceFillColors.length - 1; i++) {
                if (count < i * 10) {
                    fillColor = sliceFillColors[i]
                    break
                } else if (i === sliceFillColors.length - 1) {
                    fillColor = sliceFillColors[i]
                    break
                }
            }
        }
    } else if (viewByFormat === 'Count') {
        if (count === 0) {
            return sliceFillColors[0]
        } else {
            for (let i = 0; i <= sliceFillColors.length - 1; i++) {
                if (count < i * 100) {
                    fillColor = sliceFillColors[i]
                    break
                } else if (i === sliceFillColors.length - 1) {
                    fillColor = sliceFillColors[i]
                    break
                }
            }
        }

        // fillColors.slice(0, 11).forEach((e: string, index: number)=>{
        //     console.log(count)
        //     if (count === 0 && index === 0) {
        //         fillColor = e
        //         console.log('fillcolor zero', fillColor)
        //         return fillColor
        //     } else if (count < index * 100) {
        //         fillColor = e
        //     }
        // })
    } else {
        fillColor = 'red'
    }
    return fillColor


    // if (viewByFormat === 'Percent') {
    //     switch (true) {
    //         case (count === 0):
    //             return 'rgba(255, 255, 255, 0.8)'
    //         case (count < 10):
    //            return '#C8F2C2'
    //         case (count <= 20):
    //             return '#A4E9A7'
    //         case (count <= 30):
    //             return '#89DD9C'
    //         case (count <= 40):
    //             return '#70CE98'
    //         case (count <= 50):
    //             return '#59BE96'
    //         case (count <= 60):
    //             return '#44AC96'
    //         case (count <= 70):
    //             return '#319795'
    //         case (count <= 80): 
    //             return '#24879B'
    //         case (count <= 90): 
    //             return '#1B759E'
    //         case (count <= 100): 
    //             return '#12609F'
    //     }   
    // } else if (viewByFormat === 'Count'){
    //     switch (true) {
    //         case (count === 0):
    //             return 'rgba(255, 255, 255, 0.8)'
    //         case (count <= 100):
    //            return '#C8F2C2'
    //         case (count <= 200):
    //             return '#A4E9A7'
    //         case (count <= 300):
    //             return '#89DD9C'
    //         case (count <= 400):
    //             return '#70CE98'
    //         case (count <= 500):
    //             return '#59BE96'
    //         case (count <= 600):
    //             return '#44AC96'
    //         case (count <= 700):
    //             return '#319795'
    //         case (count <= 800): 
    //             return '#24879B'
    //         case (count <= 900): 
    //             return '#1B759E'
    //         case (count > 1000): 
    //             return '#12609F'
    //     }   
    // }
}

