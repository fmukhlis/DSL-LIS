// React Select
import Select, {
    Props,
    StylesConfig,
} from "react-select"

const SearchableSelect = (props: Props<{ value: string, label: string }>) => {

    const styles: StylesConfig<{ value: string, label: string }, false> = {
        option: (baseStyles, state) => ({
            ...baseStyles,
            backgroundColor: state.isSelected ? '#0d9488' : state.isFocused ? '#ccfbf1' : '',
            transitionDuration: '0.25s',
            transitionProperty: 'background-color',
            ':before': state.isSelected
                ? {
                    content: '"🗸"',
                    display: 'inline-block',
                    marginRight: '0.5rem'
                } : {}
        }),
        menu: (baseStyles) => ({
            ...baseStyles,
            minWidth: 'max-content'
        }),
        menuList: (baseStyles) => ({
            ...baseStyles,
            padding: '0px',
            borderRadius: '3px'
        })
    }

    return (
        <Select
            {...props}
            styles={styles}
        />
    )
}

export default SearchableSelect