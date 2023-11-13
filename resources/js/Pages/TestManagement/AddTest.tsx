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
import Checkbox from '@/Components/Checkbox'

const AddTest = ({
    tests,
    className,
    categories,
}: ComponentPropsWithoutRef<'div'> &
    {
        tests: Record<string, unknown>[]
        categories: Record<string, unknown>[]
    }
) => {
    const [addedTest, setAddedTest] = useState<Record<string, unknown>[]>([])
    const [formID, setFormID] = useState(() => Math.random())

    const { data, setData, post, processing, clearErrors, errors, reset } = useForm({
        category: '',
        name: '',
        price: 0,
        is_manual: true,
    });

    const { flash } = usePage<Record<string, { testAddMsg: string }>>().props

    const submitForm = (e: FormEvent) => {
        e.preventDefault()
        clearErrors()
        post(
            route('manage.test'),
            {
                onSuccess: () => {
                    setFormID(Math.random())
                    reset('name', 'price', 'is_manual')
                }
            }
        )
    }
    useEffect(() => {
        setAddedTest(tests.filter(test => (test.category_id === data.category)))
    }, [data.category, formID])

    return (
        <div className={`bg-white p-5 rounded-lg shadow-lg ${className}`}>
            <form onSubmit={submitForm}>
                <div className="flex flex-col gap-3">
                    <h2 className='font-bold pb-1 text-center uppercase text-teal-700 border-b-2 border-teal-700'>
                        Add Test
                    </h2>

                    {flash.testAddMsg && <Alert formID={formID} message={flash.testAddMsg} type='success' />}
                    {errors.category && <Alert formID={formID} message={errors.category} type='error' />}
                    {errors.name && <Alert formID={formID} message={errors.name} type='error' />}
                    {errors.price && <Alert formID={formID} message={errors.price} type='error' />}
                    {errors.is_manual && <Alert formID={formID} message={errors.is_manual} type='error' />}

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
                        {!categories.length
                            ? (
                                <SelectItem
                                    disabled
                                    value='invalid'
                                    className='pl-2 justify-center'
                                >
                                    No category found.
                                </SelectItem>
                            ) : categories.map(category => (
                                <SelectItem
                                    key={category._id as string}
                                    value={category._id as string}
                                >
                                    {category.name as string}
                                </SelectItem>
                            ))}
                    </Select>

                    {addedTest.length ?
                        <div className='flex flex-col text-xs px-1 gap-2'>
                            <div className='uppercase border-b-2 pb-0.5 text-center'>
                                Currently added test(s)
                            </div>
                            <div className='flex flex-wrap justify-center gap-1'>
                                {addedTest.map((test) => (
                                    <div
                                        key={test._id as string}
                                        className='rounded-full bg-teal-700 px-1.5 py-0.5 text-teal-50'
                                    >
                                        {test.name as string}
                                    </div>
                                ))}
                            </div>
                        </div>
                        : null
                    }

                    <Input
                        value={data.name}
                        placeholder={`Type test's name...`}
                        onChange={(e) => { setData('name', e.target.value) }}
                    />
                    <label className='w-full flex justify-between items-center text-sm'>
                        <span>This test is automatic ?</span>
                        <Checkbox
                            checked={!data.is_manual}
                            onChange={(e) => { setData('is_manual', !e.target.checked) }}
                        />
                    </label>
                    <div className='flex items-center text-sm'>
                        <label htmlFor="price">Price</label>
                        <span className='ml-auto mr-1 text-gray-400'>Rp</span>
                        <Input
                            id='price'
                            step={1000}
                            type='number'
                            className='w-48'
                            value={data.price}
                            onChange={(e) => { setData('price', Number(e.target.value) > 0 ? Number(e.target.value) : 0) }}
                        />
                    </div>
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

export default AddTest