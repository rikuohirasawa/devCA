import { LegendColor, MapLegendWrapper, FlexRow } from "./mapLegendStyles"
export const MapLegend: React.FC = () => {
    const legendColors: string[] = [
        'rgba(255, 255, 255, 0.8)',
        '#D7ECD4',
        '#B8DFBA',
        '#9CD2A8',
        '#80C49D',
        '#65B596',
        '#4BA694',
        '#319795',
        '#297486',
        '#225374',
        '#1B3662'
    ];
    return (
        <MapLegendWrapper>
            {legendColors.map((color, index)=>{
                return ( 
                <FlexRow>
                    <LegendColor bgColor={color}/>
                    <div>{index === 0 ? <span style={{marginLeft: '8px'}}>{index}</span> : `< ${index * 100}`}</div>
                </FlexRow>
                )
            })}
        </MapLegendWrapper>
    )
}