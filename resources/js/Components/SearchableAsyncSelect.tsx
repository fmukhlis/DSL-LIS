import { useState, useEffect } from 'react'

// React Select
import AsyncSelect, { AsyncProps } from "react-select/async"
import {
    GroupBase,
    StylesConfig,
} from "react-select"

const SearchableAsyncSelect = <
    Option = unknown,
    IsMulti extends boolean = false,
    Group extends GroupBase<Option> = GroupBase<Option>
>(props: AsyncProps<Option, IsMulti, Group>) => {

    const styles: StylesConfig<Option, IsMulti, Group> = {
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