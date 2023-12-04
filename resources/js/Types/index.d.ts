import { 
    ReactElement, 
    ComponentPropsWithRef,
    ComponentPropsWithoutRef, 
} from "react"

// TanStack Table
import { 
    ColumnDef, 
    Row,
} from "@tanstack/react-table"

// Inertia
import { InertiaLinkProps } from "@inertiajs/react"

// Radix UI
import { 
    DropdownMenuContentProps as DMContentProps, 
    DropdownMenuTriggerProps as DMTriggerProps,
} from "@radix-ui/react-dropdown-menu"
import { TransitionFn } from "@react-spring/web"

// React Select
import { GroupBase } from "react-select"
import type { } from "react-select/base"




export interface AnalystModelProps {
    _id: string
    name: string
    title: string
    pin: string
    signature: string

    orders?: OrderModelProps[]
}

export interface CategoryModelProps {
    _id: string
    name: string

    tests?: TestModelProps[]
}

export interface ContactModelProps {
    _id: string
    contact: string
    type: string
    patient_ids: string[]

    patients?: PatientModelProps[]
}

export interface DepartmentModelProps {
    _id: string
    name: string

    doctors?: DoctorModelProps[]
}

export interface DoctorModelProps {
    _id: string
    name: string
    department_id: string
    specialization_ids: string[]
    
    department?: DepartmentModelProps
    specializations?: SpecializationModelProps[]
    orders?: OrderModelProps[]
}

export interface OrderModelProps {
    _id: string
    is_cito: boolean
    payment_method: 'BPJS' | 'Self-Payment' | 'Insurance'
    registration_id: string
    updated_at: string
    created_at: string
    total_price: number
    doctor_id: string
    patient_id: string
    results: ResultModelProps[] 

    note?: string
    confirmed_at?: string
    inputted_at?: string
    validated_at?: string
    analyst_id?: string 
    
    patient?: PatientModelProps
    doctor?: DoctorModelProps
    analyst?: AnalystModelProps
}

export interface ParameterModelProps {
    _id: string
    name: string
    test_ids: string[]

    tests?: TestModelProps[]
    units?: UnitModelProps[]
}

export interface PatientModelProps {
    _id: string
    reg_id: number
    name: string
    contact_ids: string[]

    contacts: ContactModelProps[]
    orders?: OrderModelProps[]
}

export interface ResultModelProps {
    _id: string
    test_id: string
    updated_at: string
    created_at: string
    order_id: string
    parameterValues: {
        _id: { $oid: string }
        value: number
        parameter_id: string
    }[]

    test?: TestModelProps
    order?: OrderModelProps
}

export interface SpecializationModelProps {
    _id: string
    name: string
    title: string
    doctor_ids: string[]

    doctors?: DoctorModelProps[] 
}

export interface TestModelProps {
    _id: string
    name: string
    price: number
    is_manual: boolean
    category_id: string
    parameter_ids: string[]

    category?: CategoryModelProps    
    parameters?: ParameterModelProps[]
    results?: ResultModelProps[]
}

export interface UnitModelProps {
    _id: string
    name: string
    min_abnormal: number
    max_abnormal: number    
    parameter_id: string

    parameter: ParameterModelProps
}

export interface InputResultProps {
    registration_id: string
    confirmed_at : Date
    created_at: Date
    patient_id: string
    analyst_id: string
    is_cito: boolean

    patient: {
        _id: string
        name: string
    }
    analyst: {
        _id: string
        name: string
        title: string
    }
    tests: {
        _id: string
        name: string
        category_id: string
        is_manual: boolean
        order_id: string[]
        parameter_ids: string[]
        price: number
    }[]
}

export interface DataTableProps<TData> {
    data: TData[]
    columns: ColumnDef<TData>[]
    isLoading: boolean
    getRowCanExpand: (row: Row<TData>) => boolean
    renderSubComponent: (props: {row: Row<TData>}) => React.ReactElement
}

export interface AnchorProps extends InertiaLinkProps {
    children: React.ReactNode
    className?: string
}

export interface AuthenticatedLayoutProps extends ComponentPropsWithoutRef<'button'> {
    user?: string;
    header?: string; 
}

export interface DropdownMenuContentProps extends DMContentProps {
    transition: TransitionFn<boolean>
    minWidth: string
}

export interface NavigationMenuDropdownProps extends DMTriggerProps {
    trigger: { title: JSX.Element, withIcon: boolean }
    minWidth: string
}

export interface InputProps extends ComponentPropsWithRef<'input'> {
    isFocused? : boolean
}

export interface SingleOrderProps {
    registration_id: string
    created_at: string
    confirmed_at?: string
    is_cito: boolean
    payment_method: 'BPJS' | 'Self-Payment' | 'Insurance'
    note: string
    total_price: number

    analyst: {
        name: string
        title: string
    }

    patient: {
        name: string
        reg_id: string
        contacts: {
            _id: string
            contact: string
            type: string
        }[]
    }

    doctor: {
        name: string,
        specializations: {
            _id: string
            title: string
        }[],
        department: {
            name: string
        }
    }

    tests: {
        _id: string
        name: string
        price: number
        is_manual: boolean
        parameters: {
            _id: string
            name: string
            units: {
                name: string
                max_abnormal: number
                min_abnormal: number
            }[]
        }[]
    }[]

    results: {
        _id: string
        created_at: string
        updated_at: string
        test_id: string
        parameterValues: {
            _id: { $oid: string }
            parameter_id: string
            value: number
        }
    }[]
}