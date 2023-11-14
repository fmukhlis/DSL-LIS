import {
    useState,
    useEffect,
    FormEvent,
    ComponentPropsWithoutRef,
} from 'react'

// Internal
import Input from '@/Components/Input'
import Alert from '@/Components/Alert'
import { Select, SelectItem } from '@/Components/Select'
import PrimaryButton from '@/Components/PrimaryButton'

// Inertia JS
import {
    useForm,
    usePage,

} from '@inertiajs/react'

const AddParameter = ({
    tests,
    className,
    categories,
    parameters,
}: ComponentPropsWithoutRef<'div'> &
    {
        tests: Record<string, unknown>[]
        categories: Record<string, unknown>[]
        parameters: Record<string, unknown>[]
    }
) => {

    const [addedTest, setAddedTest] = useState<Record<string, unknown>[]>([])
    const [addedParameter, setAddedParameter] = useState<Record<string, unknown>[]>([])
    const [formID, setFormID] = useState(() => Math.random())

    const { data, setData, post, processing, clearErrors, errors, reset } = useForm({
        category: '',
        test: '',
        name: '',
    });

    const { flash } = usePage<Record<string, { parameterAddMsg: string }>>().props

    const submitForm = (e: FormEvent) => {
        e.preventDefault()
        clearErrors()
        post(
            route('manage.parameter'),
            {
                onSuccess: () => {
                    setFormID(Math.random())
                    reset('name')
                }
            }
        )
    }

    useEffect(() => {
        setAddedParameter(parameters.filter((item: Record<string, unknown>) => ((item.test_ids as string[]).includes(data.test))))
    }, [data.test, formID])

    useEffect(() => {
        const filteredTests = tests.filter(test => (test.category_id === data.category))
        setAddedTest(filteredTests)

        reset('test')

    }, [data.category])

    return (
        <div className={`bg-white p-5 rounded-lg shadow-lg ${className}`}>
            <form onSubmit={submitForm}>
                <div className="flex flex-col gap-3">
                    <h2 className='font-bold pb-1 text-center uppercase text-teal-700 border-b-2 border-teal-700'>
                        Add Parameter
                    </h2>

                    {flash.parameterAddMsg && <Alert formID={formID} message={flash.parameterAddMsg} type='success' />}
                    {errors.name && <Alert formID={formID} message={errors.name} type='error' />}
                    {errors.test && <Alert formID={formID} message={errors.test} type='error' />}
                    {errors.category && <Alert formID={formID} message={errors.category} type='error' />}


                    <Select
                        placeholder='Select a category...'
                        value={data.category}
                        triggerProps={{
                            className: `px-2 py-1 w-28 ml-auto w-full py-2 bg-white border-gray-300 ${data.category !== '' ? 'text-black' : 'text-gray-500'}`
                        }}
                        onValueChange={value => {
                            setData('category', value)
                        }}
                    >
                        {categories.map(category => (
                            <SelectItem
                                key={category._id as string}
                                value={category._id as string}
                            >
                                {category.name as string}
                            </SelectItem>
                        ))}
                    </Select>
                    {data.category !== '' &&
                        < Select
                            placeholder='Select a test...'
                            value={data.test}
                            triggerProps={{
                                className: `px-2 py-1 w-28 ml-auto w-full py-2 bg-white border-gray-300 ${data.category !== '' ? 'text-black' : 'text-gray-500'}`
                            }}
                            onValueChange={value => {
                                setData('test', value)
                            }}
                        >
                            {addedTest.length
                                ? addedTest.map(test => (
                                    <SelectItem
                                        key={test._id as string}
                                        value={test._id as string}
                                    >
                                        {test.name as string}
                                    </SelectItem>
                                )) : (
                                    <SelectItem
                                        disabled
                                        key='invalid'
                                        value='invalid'
                                        className='pl-2 justify-center'
                                    >
                                        No test found.
                                    </SelectItem>
                                )
                            }
                        </Select>
                    }
                    {addedParameter.length ?
                        <div className='flex flex-col text-xs px-1 gap-2'>
                            <div className='uppercase border-b-2 pb-0.5 text-center'>
                                Currently added parameter(s)
                            </div>
                            <div className='flex flex-wrap justify-center gap-1'>
                                {addedParameter.map((item) => (
                                    <div
                                        key={item._id as string}
                                        className='rounded-full bg-teal-700 px-1.5 py-0.5 text-teal-50'
                                    >
                                        {item.name as string}
                                    </div>
                                ))}
                            </div>
                        </div>
                        : null
                    }
                    <Input
                        value={data.name}
                        placeholder={`Type parameter's name...`}
                        onChange={(e) => { setData('name', e.target.value) }}
                    />
                    <PrimaryButton
                        className='px-3 py-1.5 text-[0.8rem] w-24 mx-auto'
                        disabled={processing}
                    >
                        Add
                    </PrimaryButton>
                </div>
            </form >
        </div >
    )
}

export default AddParameter