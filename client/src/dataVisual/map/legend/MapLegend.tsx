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

    // '#CAF0F8',
    // '#B9DCEB',
    // '#A9C9DE',
    // '#98B5D2',
    // '#88A1C5',
    // '#778EB8',
    // '#677AAB',
    // '#56669E',
    // '#455391',
    // '#353F85',
    // '#242B78',
    // '#14186B',
    // '#03045E'

    // '#BAE2D3',
    // '#A8D4D3',
    // '#A0C7CD',
    // '#99B7C5',
    // '#92A8BD',
    // '#8B99B5',
    // '#8189AB',
    // '#74769F',
    // '#6B6794',
    // '#645B88',
    // '#5E4F7B',
    // '#57446E',
    // '#503960'

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