import React from 'react'

export const ThemeContext = React.createContext();

const themes = [
    {   //gold
        previewColor: 'gold',
        headerColor: 'gold',
        glowColor: 'gold',
        contrastColor: 'rgb(66,66,66)',
        fancyColor: 'white',
    },

    {   //pink
        previewColor: 'pink',
        headerColor: 'pink',
        glowColor: 'pink',
        contrastColor: '#FF5D7A',//'#FF5D7A',
        fancyColor: '#FFFF',
    },
    {   //lime
        previewColor: 'yellowgreen',
        headerColor: 'yellowgreen',
        glowColor: 'yellowgreen',
        contrastColor: '#304C93',
        fancyColor: '#000',
    },
    {   //cyan
        previewColor: 'cyan',
        headerColor: 'cyan',
        glowColor: 'cyan',
        contrastColor: '#006c7d',
        fancyColor: '#006c7d',
    },
    {   //blue
        previewColor: 'blue',
        headerColor: 'blue',
        glowColor: 'blue',
        contrastColor: '#74FF00',
        fancyColor: '#0E0E62',
    },
    {   //purple
        previewColor: 'purple',
        headerColor: 'purple',
        glowColor: 'purple',
        contrastColor: '#FF00FF',
        fancyColor: '#FF00FF',
    },
    {   //red
        previewColor: 'red',
        headerColor: 'red',
        glowColor: 'red',
        contrastColor: '#FFD200',
        fancyColor: '#FFD200',
    },
]

export default function( props ) {
    const [theme,change] = React.useState( themes[0] )
  
    return <ThemeContext.Provider value={{ theme, change, all:themes }}> {props.children} </ThemeContext.Provider>
}

function useTheme() {
    const context = React.useContext(ThemeContext);
    if (context === undefined) {
      throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
}
  
export { useTheme };