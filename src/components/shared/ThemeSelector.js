import React from 'react'
import { useTheme } from '../../providers/ThemeProvider'
import styled from 'styled-components'

import WheelSelect, { WheelButton, HoverArea } from '../ring/WheelSelect'

export default props => {
    const {all, theme, change} = useTheme();
   
    return <WheelSelect
                size={ 150 }
                TemplateClass={ ThemeTemplate }
                data={ all }
                value={ theme }
                onChange={ v => change( v ) }
                hoverPattern={[1.2]}
                activeItemSize={1.4}
            />
}

const ThemeTemplate = props =>
  <ThemeButton {...props} >
    <HoverArea/>
  </ThemeButton>

const ThemeButton = styled(WheelButton)`
    background-color: ${ ({value}) => value ? value.previewColor : 'red' }
`