import {
    useState,
    useEffect,
    FormEvent,
    ComponentPropsWithoutRef
} from "react"

// Inertia JS
import {
    usePage,
    useForm
} from "@inertiajs/react"

// Internal
import Alert from "@/Components/Alert"
import Input from "@/Components/Input"
import PrimaryButton from "@/Components/PrimaryButton"
import { Select, SelectItem } from "@/Components/Select"
import SearchableSelect from "@/Components/SearchableSelect"

const AddDoctor = ({
    doctors,
    className,
    departments,
    specializations,
}: ComponentPropsWithoutRef<'div'> &
    {
        doctors: Record<string, unknown>[]
        departments: Record<string, unknown>[]
        specializations: Record<string, unknown>[]
    }
) => {

    const [addedDoctor, setAddedDoctor] = useState<Record<string, unknown>[]>([])


    const options = specializations.map(specialization => ({
        value: specialization._id as string,
        label: `${specialization.name} (${specialization.title})`,
    }))

    const [formID, setFormID] = useState(() => Math.random())

    const { data, setData, errors, clearErrors, post, processing, reset, transform } = useForm<{
        name: string
        department_id: string
        specialization_ids: unknown[]
    }>({
        name: '',
        department_id: '',
        specialization_ids: [],
    })

    transform(data => ({
        ...data,
        specialization_ids: data.specialization_ids.map(specialization_id => (specialization_id as { value: string, label: string }).value)
    }))

    useEffect(() => {
        const filteredDoctor: Record<string, unknown>[] = doctors.filter(doctor => (
            doctor.department_id === data.department_id
        )).map(doctor => ({
            ...doctor,
            specialization_ids: specializations.filter(specialization => (
                doctor.specialization_ids as string[]).includes(specialization._id as string)
            )
        }))
        setAddedDoctor(filteredDoctor)
    }, [data.department_id, formID])

    console.log(addedDoctor)
    const { flash } = usePage<Record<string, { doctorAddMsg: string }>>().props

    const submitForm = (e: FormEvent) => {
        e.preventDefault()
        clearErrors()
        post(route('manage.doctor'), {
            onSuccess: () => {
                setFormID(Math.random())
                reset('name', 'specialization_ids')
            }
        })
    }

    return (
        <div className={`bg-white p-5 rounded-lg shadow-lg ${className}`}>
            <form onSubmit={submitForm}>
                <div className="flex flex-col gap-3">
                    <h2 className='font-bold pb-1 text-center uppercase text-teal-700 border-b-2 border-teal-700'>
                        Add Doctor
                    </h2>

                    {flash.doctorAddMsg && <Alert formID={formID} message={flash.doctorAddMsg} type='success' />}
                    {errors.department_id && <Alert formID={formID} message={errors.department_id} type='error' />}
                    {errors.specialization_ids && <Alert formID={formID} message={errors.specialization_ids} type='error' />}
                    {errors.name && <Alert formID={formID} message={errors.name} type='error' />}

                    <Select
                        value={data.department_id}
                        placeholder="Select department..."
                        triggerProps={{
                            className: `px-2 py-1 w-28 ml-auto w-full py-2 bg-white border-gray-300 ${data.department_id !== '' ? 'text-black' : 'text-gray-500'}`
                        }}
                        onValueChange={value => {
                            setData('department_id', value)
                        }}
                    >
                        {!departments.length
                            ? (
                                <SelectItem
                                    disabled
                                    value="invalid"
                                    className="pl-2 justify-center"
                                >
                                    No department found.
                                </SelectItem>
                            ) : (
                                departments.map(department => (
                                    <SelectItem
                                        key={department._id as string}
                                        value={department._id as string}
                                    >
                                        {department.name as string}
                                    </SelectItem>
                                ))
                            )}
                    </Select>


                    {addedDoctor.length ?
                        <div className='flex flex-col text-xs px-1 gap-2'>
                            <div className='uppercase border-b-2 pb-0.5 text-center'>
                                Currently added doctor(s)
                            </div>
                            <div className='flex flex-wrap justify-center gap-1'>
                                {addedDoctor.map((item) => (
                                    <div
                                        key={item._id as string}
                                        className='rounded-full bg-teal-700 px-1.5 py-0.5 text-teal-50'
                                    >
                                        Dr. {item.name as string}{(item.specialization_ids as Record<string, unknown>[]).map(specialization => `, ${specialization.title as string}`)}
                                    </div>
                                ))}
                            </div>
                        </div>
                        : null
                    }

                    <Input
                        value={data.name}
                        placeholder={`Type doctor's name...`}
                        onChange={(e) => { setData('name', e.target.value) }}
                    />

                    <SearchableSelect
                        isMulti
                        options={options}
                        maxMenuHeight={200}
                        className='text-sm'
                        value={data.specialization_ids}
                        placeholder="Select doctor's specialization..."
                        onChange={(newValue) => { setData('specialization_ids', [...newValue]) }}
                    />

                    <PrimaryButton
                        className='px-3 py-1.5 text-[0.8rem] w-24 mx-auto'
                        disabled={processing}
                    >
                        Add
                    </PrimaryButton>
                </div>
            </form>
        </div>
    )
}

export default AddDoctor