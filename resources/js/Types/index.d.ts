import { 
    ReactElement, 
    ComponentPropsWithRef,
    ComponentPropsWithoutRef,
    ReactNode, 
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
import * as PrimitivesDialog from '@radix-ui/react-dialog'
import * as PrimitivesToast from '@radix-ui/react-toast'

// React Spring
import { SpringValue, TransitionFn } from "@react-spring/web"

// React Select
import { GroupBase } from "react-select"
import type { } from "react-select/base"

export interface FlashDataProps {
    toastMsg: string | null
    responseMsg: string | null
}

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
    
    department?: string
    institution?: string
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
    status: 'need_confirmation' | 'input_process' | 'invalid' | 'valid' | 'finished'

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
    patient_id: string
    name: string
    contact_ids: string[]

    contacts: ContactModelProps[]
    orders?: OrderModelProps[]
}

export interface ResultModelProps {
    _id: string
    test_id: string
    order_id: string
    parameterValues: {
        _id: { $oid: string }
        value: number
        parameter_id: string
    }[]

    feedback_type?: 'approve' | 'disapprove'
    feedback_comment?: string
    
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

export interface UserModelProps {
    _id: string
    username: string
    password: string
    updated_at: string
    created_at: string
    role: 'client' | 'sales' | 'admin' | 'super'
    department?: string 
}

export interface RegisteredPatientProps {
    contacts: Record<string, string>
    name: string
    patient_id: string
    registration_id: string
}

export interface RegisteredDoctorProps {
    name: string
    department: string
}

export interface DataTableProps<TData> {
    data: TData[]
    columns: ColumnDef<TData>[]
    isLoading: boolean
    getRowCanExpand: (row: Row<TData>) => boolean
    renderSubComponent: (props: {row: Row<TData>}) => React.ReactElement
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

export interface DialogContentProps extends PrimitivesDialog.DialogContentProps {
    style: {
        [key: string]: SpringValue<any>
        opacity: any
    }
}

export interface ToastProps extends PrimitivesToast.ToastProps {
    icon?: JSX.Element
}


export interface DateParamProps {
    endDate?: string
    startDate?: string
}