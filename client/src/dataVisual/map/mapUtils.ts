export const getFillColor = (count: number, viewByPercentage: boolean) => {
    if (viewByPercentage) {
        switch (true) {
            case (count <= 10):
               return '#B8DFBA'
            case (count <= 20):
                return '#9CD2A8'
            case (count <= 30):
                return '#80C49D'
            case (count <= 40):
                return '#65B596'
            case (count <= 50):
                return '#4BA694'
            case (count <= 60):
                return '#319795'
            case (count <= 70):
                return '#297486'
            case (count <= 80): 
                return '#225374'
            case (count <= 90): 
                return '#1B3662'
            case (count <= 100): 
                return '#151F4F'
        }   
    } else {
        switch (true) {
            case (count === 0):
                return 'rgba(255, 255, 255, 0.8)'
            case (count <= 100):
               return '#D7ECD4'
            case (count <= 200):
                return '#B8DFBA'
            case (count <= 300):
                return '#9CD2A8'
            case (count <= 400):
                return '#80C49D'
            case (count <= 500):
                return '#65B596'
            case (count <= 600):
                return '#4BA694'
            case (count <= 700):
                return '#319795'
            case (count <= 800): 
                return '#297486'
            case (count <= 900): 
                return '#225374'
            case (count > 1000): 
                return '#1B3662'
        }   
    }
}

