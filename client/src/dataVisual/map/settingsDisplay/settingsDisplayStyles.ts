import styled from "styled-components";

export const SettingsDisplayHeader = styled.header`
    position: absolute;
    top: 1%;
    transition: width 2s, height 4s;
`
export const SettingsDisplayWrapper = styled.div<{minimize: boolean}>`
	box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
    background: ${props=>props.minimize ? 'var(--teal)' : 'var(--black)'};
    border: 1px solid var(--teal-light);
    z-index: 9999;
    position: fixed;
    bottom: 0%;
    left: 0%;
    padding:${props=>props.minimize ? '0px' : '0 0 16px 0px'};
    border-radius: 0px 8px 0px 0px;
    word-wrap: break-word;
    width: 450px;
	`

export const TextContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    gap: 16px;
    max-width: 50%;
    `

export const MinimizeIcon = styled.div<{minimize: boolean}>`
        width: 30px;
		height: 30px;
		position: relative;
        &:before,
		&:after {
            position: absolute;
            content: "";
            width: 10px;
            height: 2px;
            background-color: ${props=>props.minimize ? 'var(--black)' : 'var(--teal)'};
            border-radius: 2px;
            top: 14px;
            left: 10px;
            transition: all .35s ease-in-out;   
			}
			
        &:before{
            transform: ${props=>props.minimize ? 'translateX(3px) rotate(45deg)' : 'translateX(-3px) rotate(45deg)'} 
        }
        
        &:after{
            transform: ${props=>props.minimize ? 'translateX(-3px) rotate(-45deg)' : 'translateX(3px) rotate(-45deg)'} 
        }
        
        @media only screen and (min-width: 450px) {
            float: right;
            
        }`