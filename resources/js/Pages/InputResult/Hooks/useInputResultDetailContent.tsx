import { useContext, useEffect, useState } from "react"
import { InputResultDetailsContext } from "../Contexts/InputResultDetailsContext"
import { usePage } from "@inertiajs/react"
import { FlashDataProps } from "@/Types"
import { animated, useTransition } from "@react-spring/web"
import * as PrimitivesTabs from '@radix-ui/react-tabs'


const useInputResultDetailContent = () => {

    const { order } = useContext(InputResultDetailsContext)!

    const { flash } = usePage<{ flash: FlashDataProps }>().props
    const [open, setOpen] = useState(flash.toastMsg ? true : false)
    const [tabValue, setTabValue] = useState('test-details')
    const [slide, slideAPI] = useTransition(tabValue, () => ({
        from: (item) => ({
            opacity: 0,
            maxHeight: '500px',
            transform: item === 'test-details' ? 'translate(-100px,0)' : 'translate(100px,0)'
        }),
        enter: {
            opacity: 1,
            maxHeight: '500px',
            transform: 'translate(0px,0)'
        },
        leave: {
            opacity: 0,
            maxHeight: '0px',
            transform: 'translate(0px,0)'
        },
        config: (item, key, phase) => {
            return (item && phase === 'enter' ? ({}) : ({
                duration: 0
            }))
        }
    }))

    const AnimatedTabContent = animated(PrimitivesTabs.Content)

    useEffect(() => {
        slideAPI.start()
    }, [tabValue])

    return ({
        AnimatedTabContent,
        flash,
        open,
        order,
        setOpen,
        setTabValue,
        slide,
        tabValue,
    })
}
export default useInputResultDetailContent