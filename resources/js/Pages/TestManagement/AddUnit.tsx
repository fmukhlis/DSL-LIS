import {
    useState,
    useEffect,
    FormEvent,
    ComponentPropsWithoutRef,
} from 'react'

// Internal
import Input from '@/Components/Input'
import Alert from '@/Components/Alert'
import PrimaryButton from '@/Components/PrimaryButton'
import SearchableSelect from '@/Components/SearchableSelect'

// Inertia JS
import {
    usePage,
    useForm,
} from '@inertiajs/react'

const AddUnit = ({
    units,
    className,
    parameters,
}: ComponentPropsWithoutRef<'div'> & {
    units: Record<string, unknown>[]
    parameters: Record<string, unknown>[]
}
) => {
    const [addedUnit, setAddedUnit] = useState<Record<string, unknown>[]>([])
    const [formID, setFormID] = useState(() => Math.random())
    const { flash } = usePage<Record<string, { unitAddMsg: string }>>().props

    const options: { value: string, label: string }[] = parameters.map(parameter => ({
        value: parameter._id as string,
        label: parameter.name as string
    }))

    const submitForm = (e: FormEvent) => {
        e.preventDefault()
        clearErrors()
        post(
            route('manage.unit'),
            {
                onSuccess: () => {
                    setFormID(Math.random())
                    reset('name', 'max_abnormal', 'min_abnormal')
                }
            }
        )
    }

    const { data, setData, post, processing, clearErrors, reset, errors, transform } = useForm({
        parameter: '',
        name: '',
        min_abnormal: 0,
        max_abnormal: 0,
    })

    useEffect(() => {
        setAddedUnit(units.filter(unit => unit.parameter_id === data.parameter))
    }, [data.parameter, formID])

    return (
        <div className={`bg-white p-5 rounded-lg shadow-lg ${className}`}>
            <form onSubmit={submitForm}>
                <div className="flex flex-col gap-3">
                    <h2 className='font-bold pb-1 text-center uppercase text-teal-700 border-b-2 border-teal-700'>
                        Add Parameter's Unit
                    </h2>

                    {flash.unitAddMsg && <Alert formID={formID} message={flash.unitAddMsg} type='success' />}
                    {errors.parameter && <Alert formID={formID} message={errors.parameter} type='error' />}
                    {errors.name && <Alert formID={formID} message={errors.name} type='error' />}
                    {errors.max_abnormal && <Alert formID={formID} message={errors.max_abnormal} type='error' />}
                    {errors.min_abnormal && <Alert formID={formID} message={errors.min_abnormal} type='error' />}

                    <SearchableSelect
                        options={options}
                        maxMenuHeight={200}
                        className='text-sm'
                        placeholder="Search parameter's name..."
                        onChange={(value: { value: string, label: string } | null) => {
                            setData('parameter', value ? value.value : '')
                        }}
                    />

                    {addedUnit.length
                        ? (
                            <div className='flex flex-col text-xs px-1 gap-2'>
                                <div className='uppercase border-b-2 pb-0.5 text-center'>
                                    Currently added parameter(s)
                                </div>
                                <div className='flex flex-wrap justify-center gap-1'>
                                    {addedUnit.map((item) => (
                                        <div
                                            key={item._id as string}
                                            className='rounded-full bg-teal-700 px-1.5 py-0.5 text-teal-50'
                                        >
                                            {item.name as string}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : null}

                    <Input
                        value={data.name as string}
                        placeholder={`Type unit's name...`}
                        onChange={(e) => { setData('name', e.target.value) }}
                    />
                    <div className='flex items-center justify-between'>
                        <label className="text-sm" htmlFor="min_abnormal">Min. Abnormal Value</label>
                        <Input
                            step={0.1}
                            type='number'
                            className='w-44'
                            id='min_abnormal'
                            value={data.min_abnormal}
                            onChange={(e) => { setData('min_abnormal', Number(e.target.value) > 0 ? Number(e.target.value) : 0) }}
                        />
                    </div>
                    <div className='flex items-center justify-between'>
                        <label className="text-sm" htmlFor="max_abnormal">Max. Abnormal Value</label>
                        <Input
                            step={0.1}
                            type='number'
                            className='w-44'
                            id='max_abnormal'
                            value={data.max_abnormal}
                            onChange={(e) => { setData('max_abnormal', Number(e.target.value) > 0 ? Number(e.target.value) : 0) }}
                        />
                    </div>
                    <PrimaryButton
                        disabled={processing}
                        className='px-3 py-1.5 text-[0.8rem] w-24 mx-auto'
                    >
                        Add
                    </PrimaryButton>
                </div>
            </form>
        </div>
    )
}

export default AddUnit