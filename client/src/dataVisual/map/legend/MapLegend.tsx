import { LegendColor, MapLegendWrapper, FlexRow } from "./mapLegendStyles"
import { useContext } from "react";
import { PageContext } from "../../../states/PageContext";
export const MapLegend: React.FC = () => {

    const { state } = useContext(PageContext),
    { viewByFormat } = state
    let legendColors: string[] = [
        '#E4F7D1',
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
    return (
        <MapLegendWrapper>
            {viewByFormat === 'Ranking' ? legendColors.reverse().map((color, index)=> {
                return (
                    <FlexRow key={`legend-container-${index}`}>
                        <LegendColor key={`legend-color-${index}`}
                        bgColor={color}/>
                        <div key={`legend-marker-${index}`}>{index + 1}</div>
                    </FlexRow>
                )
            })
            :
            legendColors.map((color, index)=>{
                return ( 
                    <FlexRow key={`legend-container-${index}`}>
                        <LegendColor 
                        key={`legend-color-${index}`}
                        bgColor={color}
                        style={{
                            display: index > 10 && viewByFormat === 'Percent' ? 'none' : index > 11 && viewByFormat === 'Count' ? 'none' : 'block'
                            }}/>
                        <div key={`legend-marker-${index}`}>{
                            index === 0 ? 
                            <span style={{marginLeft: viewByFormat !== 'Ranking' ? '8px' : '0px'}}>{index}</span>
                            : 
                            viewByFormat === 'Percent' && index === 10
                            ?
                            `<= ${index*10}%`
                            :
                            viewByFormat === 'Percent' && index < 10
                            ? 
                            `< ${index*10}%` 
                            : 
                            viewByFormat === 'Ranking' ? 
                            `${index + 1}` 
                            : 
                            viewByFormat === 'Count' && index === 11
                            ? 
                            ` >= 1000`
                            :
                            viewByFormat === 'Count' && index < 12
                            && 
                            `< ${index * 100}`}
                        </div>
                    </FlexRow>
                )
            })}
            <FlexRow>
                <LegendColor bgColor='rgba(0, 0, 0, 0.5)'/>
                <div>N/A</div>
            </FlexRow>
        </MapLegendWrapper>
    )
}