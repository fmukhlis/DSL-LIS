import { useState, useEffect } from 'react'

// React Select
import AsyncSelect, { AsyncProps } from "react-select/async"
import {
    GroupBase,
    StylesConfig,
} from "react-select"

const SearchableAsyncSelect = (
    props: AsyncProps<{ value: string, label: string }, false, GroupBase<{ value: string, label: string }>>
) => {
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
        <AsyncSelect
            {...props}
            cacheOptions
            defaultOptions
            styles={styles}
        />
    )
}

export default SearchableAsyncSelect