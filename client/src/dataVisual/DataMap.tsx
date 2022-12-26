import React, { useEffect } from "react"
import CanadaMap, { Provinces } from "react-canada-map"

interface Props {}
interface State {}

export const DataMap: React.FC = () => {
    console.log(Provinces)
        const custom = {
            [Provinces.AB]: {
                fillColor: 'var(--cherry-red)'
            },
            [Provinces.NL] : {
                fillColor: 'var(--cherry-red)'
            }
        }
    return (
        <CanadaMap
        customize={custom}/>
    )
}