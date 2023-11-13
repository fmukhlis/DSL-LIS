import {
    useState,
    FormEvent,
    ComponentPropsWithoutRef,
} from 'react'

// Internal
import Input from '@/Components/Input'
import Alert from '@/Components/Alert'
import PrimaryButton from '@/Components/PrimaryButton'

// Inertia JS
import {
    useForm,
    usePage,

} from '@inertiajs/react'

const CreateCategory = ({ className }: ComponentPropsWithoutRef<'div'>) => {

    const [formID, setFormID] = useState(() => Math.random())

    const { data, setData, post, processing, clearErrors, errors, reset } = useForm({
        name: '',
    });
    const { flash } = usePage<Record<string, { categoryAddMsg: string }>>().props

    const submitForm = (e: FormEvent) => {
        e.preventDefault()
        clearErrors()
        post(
            route('manage.category'),
            {
                onSuccess: () => {
                    setFormID(Math.random())
                    reset('name')
                }
            }
        )
    }

    return (
        <div className={`bg-white p-5 rounded-lg shadow-lg ${className}`}>
            <form onSubmit={submitForm}>
                <div className="flex flex-col gap-3">
                    <h2 className='font-bold pb-1 text-center uppercase text-teal-700 border-b-2 border-teal-700'>
                        Create Category
                    </h2>

                    {flash.categoryAddMsg && <Alert formID={formID} message={flash.categoryAddMsg} type='success' />}
                    {errors.name && <Alert formID={formID} message={errors.name} type='error' />}

                    <Input
                        value={data.name}
                        placeholder={`Type category's name...`}
                        onChange={(e) => { setData('name', e.target.value) }}
                    />
                    <PrimaryButton
                        className='px-3 py-1.5 text-[0.8rem] w-24 mx-auto'
                        disabled={processing}
                    >
                        Create
                    </PrimaryButton>
                </div>
            </form>
        </div>
    )
}

export default CreateCategory