import {
    ComponentPropsWithoutRef,
    FormEvent,
    useEffect,
    useState
} from 'react'

// Inertia JS
import {
    useForm,
    usePage,
} from '@inertiajs/react'

// Internal
import Alert from '@/Components/Alert'
import Input from '@/Components/Input'
import PrimaryButton from '@/Components/PrimaryButton'
import CreateableSearchableSelect from '@/Components/CreateableSearchableSelect'

const AddAnalyst = ({
    analysts,
    className,
}: ComponentPropsWithoutRef<'div'> & {
    analysts: Record<string, unknown>[]
}) => {
    const analystOptions = analysts.map(analyst => ({
        ...analyst,
        value: analyst._id,
        label: analyst.name
    }))

    const [savedSignature, setSavedSignature] = useState<string | null>(null)

    const { data, setData, errors, post, clearErrors, reset, processing, transform } = useForm<{
        pin: string,
        title: string,
        signature: File | null,
        name: Record<string, unknown> | string | null,
    }>({
        name: null,
        title: '',
        signature: null,
        pin: '',
    })

    transform((data) => ({
        ...data,
        name: data.name ? (data.name as Record<string, unknown>).value as string : null
    }))

    const [formID, setFormID] = useState(() => Math.random())
    const { flash, asset } = usePage<{ flash: { analystAddMsg: string } }>().props

    const submitForm = (e: FormEvent) => {
        e.preventDefault()
        post(route('manage.analyst'), {
            onSuccess: () => {
                setSavedSignature(null)
                setFormID(Math.random())
                reset('name', 'title', 'pin')
            }
        })
    }

    return (
        <div className={`bg-white p-5 rounded-lg shadow-lg ${className}`}>
            <form onSubmit={submitForm}>
                <div className="flex flex-col gap-3">
                    <h2 className='font-bold pb-1 text-center uppercase text-teal-700 border-b-2 border-teal-700'>
                        Manage Analyst
                    </h2>

                    {flash.analystAddMsg && <Alert formID={formID} message={flash.analystAddMsg} type='success' />}
                    {errors.name && <Alert formID={formID} message={errors.name} type='error' />}
                    {errors.signature && <Alert formID={formID} message={errors.signature} type='error' />}
                    {errors.pin && <Alert formID={formID} message={errors.pin} type='error' />}

                    <CreateableSearchableSelect
                        isClearable
                        value={data.name}
                        className='text-sm'
                        options={analystOptions}
                        onChange={(newValue) => {
                            if (newValue) {
                                if ((newValue as Record<string, unknown>).__isNew__ === undefined) {
                                    setData(data => ({
                                        ...data,
                                        title: (newValue as Record<string, unknown>).title as string ?? '',
                                    }))
                                    setSavedSignature((newValue as Record<string, unknown>).signature as string)
                                }
                                setData(data => ({
                                    ...data,
                                    name: newValue as Record<string, unknown>
                                }))
                            } else {
                                setSavedSignature(null)
                                reset('name', 'pin', 'signature', 'title')
                            }
                        }}
                    />

                    <Input
                        value={data.title}
                        placeholder={`Analyst's title...`}
                        onChange={(e) => { setData('title', e.target.value) }}
                    />

                    {savedSignature &&
                        <div className='text-sm text-center flex justify-center items-center bg-teal-50 p-3'>
                            <img
                                className='h-12 max-w-full'
                                src={`${asset}/${savedSignature}`}
                                alt="Analyst Signature"
                            />
                        </div>
                    }

                    <Input
                        type='file'
                        accept='image/*'
                        onChange={(e) => { setData('signature', e.target.files ? e.target.files[0] : null) }}
                    />

                    <Input
                        type='password'
                        value={data.pin}
                        placeholder='Set PIN...'
                        onChange={(e) => { setData('pin', e.target.value) }}
                    />

                    <PrimaryButton
                        className='px-3 py-1.5 text-[0.8rem] w-36 mx-auto'
                        disabled={processing}
                    >
                        Synchronize
                    </PrimaryButton>
                </div>
            </form>
        </div>
    )
}

export default AddAnalyst