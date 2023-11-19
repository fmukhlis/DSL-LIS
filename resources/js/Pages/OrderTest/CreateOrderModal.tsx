import {
  useState,
  FormEvent,
  useEffect,
} from 'react'

// Internal
import Checkbox from "@/Components/Checkbox"
import Textarea from "@/Components/Textarea"
import PrimaryButton from '@/Components/PrimaryButton'
import { Select, SelectItem } from '@/Components/Select'
import SecondaryButton from '@/Components/SecondaryButton'
import SearchableSelect from "@/Components/SearchableSelect"
import PrimaryOutlineButton from '@/Components/PrimaryOutlineButton'
import SearchableAsyncSelect from "@/Components/SearchableAsyncSelect"

// Radix UI
import * as PrimitivesTabs from '@radix-ui/react-tabs'
import {
  Dialog,
  DialogTitle,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/Components/Dialog"

// Inertia JS
import { useForm } from '@inertiajs/react'
import { FilePlusIcon, UpdateIcon } from '@radix-ui/react-icons'
import Alert from '@/Components/Alert'

const CreateOrderModal = ({
  doctors,
  categories,
}: {
  doctors: Record<string, unknown>[]
  categories: Record<string, unknown>[]
}) => {

  const doctorOptions = doctors !== undefined
    ? doctors.map(doctor => ({
      value: doctor._id,
      label: `Dr. ${doctor.name},${(doctor.specializations as Record<string, unknown>[]).map(specialization => ` ${specialization.title}`)}`,
    }))
    : []

  const { data, setData, errors, clearErrors, reset, processing, post, transform } = useForm<{
    note: string
    tests: unknown[]
    is_cito: boolean
    patient: Record<string, unknown> | null
    doctor: Record<string, unknown> | null | string
    payment_method: 'BPJS' | 'Insurance' | 'Self-Payment' | ''
  }>({
    note: '',
    tests: [],
    doctor: null,
    patient: null,
    is_cito: false,
    payment_method: ''
  })

  transform((data) => ({
    ...data,
    doctor: data.doctor ? (data.doctor as Record<string, string>).value : null,
    patient: data.patient ? data.patient.value as Record<string, unknown> : null,
    tests: data.tests.map(dataTest => (dataTest as Record<string, unknown>)._id),
  }))

  const [isOpen, setIsOpen] = useState(false)

  let typingTimeout: ReturnType<typeof setTimeout>

  const loadOptions = (inputValue: string) => {
    return new Promise<{
      value: Record<string, string>,
      label: string,
    }[]>((resolve) => {
      if (typingTimeout) {
        clearTimeout(typingTimeout)
      }
      typingTimeout = setTimeout(async () => {
        try {
          const response = await fetch('https://reqres.in/api/users')
          if (!response.ok) {
            throw new Error(`Http error. (${response.status})`)
          }
          const data: {
            value: Record<string, string>,
            label: string,
          }[] = (await response.json()).data.map((item: Record<string, string>) => ({
            value: item,
            label: item.first_name,
          }))
          resolve(data.filter((i) => i.label.toLowerCase().includes(inputValue.toLowerCase())))
        } catch (error) {
          console.log(error)
        }
      }, 500)
    })
  }

  const submitForm = (e: FormEvent) => {
    e.preventDefault()
    clearErrors()
    post(
      route('order.test'),
      {
        onSuccess: () => {
          setIsOpen(false)
        }
      }
    )
  }

  useEffect(() => {
    setData(
      'payment_method',
      ['BPJS', 'Insurance', 'Self-Payment'][Math.floor(Math.random() * 3)] as 'BPJS' | 'Insurance' | 'Self-Payment'
    )
  }, [data.patient])

  useEffect(() => {
    if (!isOpen) {
      reset()
      clearErrors()
    }
  }, [isOpen])

  return (
    <Dialog
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <DialogTrigger asChild>
        <PrimaryOutlineButton
          className="px-3 py-2"
        >
          Make new order
        </PrimaryOutlineButton>
      </DialogTrigger>
      <DialogContent className='h-full overflow-hidden select-none'>

        <form
          onSubmit={submitForm}
          className='flex flex-col h-full'
        >
          <DialogTitle
            className="
            pt-6 pl-7 pr-6 pb-2 z-10
            flex items-center justify-between 
            font-bold uppercase text-teal-800 text-lg
            shadow-[0px_0px_13px_7px_rgba(240,_253,_250,_1)]
          "
          >
            Order Test
            <FilePlusIcon width={22} height={22} />
          </DialogTitle>

          <div className='px-6 py-2 overflow-y-auto flex flex-col gap-2'>

            {errors.note && <Alert formID={0} message={errors.note} type='error' />}
            {errors.tests && <Alert formID={0} message={errors.tests} type='error' />}
            {errors.doctor && <Alert formID={0} message={errors.doctor} type='error' />}
            {errors.is_cito && <Alert formID={0} message={errors.is_cito} type='error' />}
            {errors.patient && <Alert formID={0} message={errors.patient} type='error' />}
            {errors.payment_method && <Alert formID={0} message={errors.payment_method} type='error' />}

            <div className="flex flex-col gap-2 ">
              <div className="flex justify-between gap-3">
                <SearchableAsyncSelect
                  maxMenuHeight={180}
                  value={data.patient}
                  className="w-1/2 text-sm"
                  loadOptions={loadOptions}
                  placeholder='Select patient...'
                  noOptionsMessage={() => "Patient not found"}
                  onChange={(newValue) => { setData('patient', newValue as Record<string, string> | null) }}
                />
                <SearchableSelect
                  maxMenuHeight={180}
                  value={data.doctor}
                  menuPosition='fixed'
                  options={doctorOptions}
                  className="w-1/2 text-sm"
                  placeholder='Select doctor...'
                  noOptionsMessage={() => "Doctor not found"}
                  onChange={(newValue) => { setData('doctor', newValue as Record<string, string> | null) }}
                />
              </div>

              {
                categories.length ? (
                  <PrimitivesTabs.Root
                    className="flex flex-col"
                    defaultValue={categories[0]._id as string}
                  >
                    <PrimitivesTabs.List
                      className="flex bg-white rounded gap-2 text-sm font-bold p-1 mb-2 text-teal-50 overflow-x-scroll"
                      aria-label="Select laboratory test"
                    >
                      {
                        categories.map((category => (
                          <PrimitivesTabs.Trigger
                            key={category._id as string}
                            value={category._id as string}
                            className="
                      px-2 uppercase py-1 rounded duration-150 select-none outline-none ring-offset-2 ring-teal-400 cursor-default
                      bg-teal-800 
                      hover:bg-teal-600
                      data-[state=active]:bg-teal-600
                      focus:ring-2 
                    "
                          >
                            {category.name as string}
                          </PrimitivesTabs.Trigger>
                        )))
                      }
                    </PrimitivesTabs.List>
                    {categories.map((category => (
                      <PrimitivesTabs.Content
                        className="outline-none"
                        key={category._id as string}
                        value={category._id as string}
                      >
                        <div className="p-2 rounded text-sm flex flex-wrap gap-y-[2px] outline-none bg-white max-h-[150px] overflow-y-auto">
                          {(category.tests as Record<string, unknown>[]).length
                            ? (
                              category.tests as Record<string, unknown>[]).map(test => (
                                <label
                                  key={test._id as string}
                                  className="flex items-center gap-2 shrink-0 grow-0 basis-1/2"
                                >
                                  <Checkbox
                                    checked={data.tests.some(dataTest => (dataTest as Record<string, unknown>)._id === test._id)}
                                    onChange={(e) => {
                                      if (e.target.checked) {
                                        setData('tests', [...data.tests as Record<string, unknown>[], test])
                                      } else {
                                        setData('tests', (data.tests as Record<string, unknown>[]).filter(dataTest => dataTest._id !== test._id))
                                      }
                                    }}
                                  />
                                  <span>{test.name as string}</span>
                                </label>
                              )
                              ) : (
                              <div className='mx-auto text-gray-400'>No test found on this category.</div>
                            )
                          }
                        </div>
                      </PrimitivesTabs.Content>)
                    ))}
                  </PrimitivesTabs.Root>
                ) : null
              }
            </div>

            <Select
              disabled
              value={data.payment_method}
              placeholder='Select payment method...'
              triggerProps={{
                className: `px-2 py-1 w-28 ml-auto w-full py-2 bg-white border-gray-300 ${data.payment_method !== '' ? 'text-black' : 'text-gray-500'}`
              }}
              onValueChange={(value: '' | 'BPJS' | 'Insurance' | 'Self-Payment') => {
                setData('payment_method', value)
              }}
            >
              <SelectItem value='BPJS'>BPJS</SelectItem>
              <SelectItem value='Insurance'>Insurance</SelectItem>
              <SelectItem value='Self-Payment'>Self-Payment</SelectItem>
            </Select>

            <div className="flex flex-col text-sm">
              <div className="font-bold text-base text-teal-50 flex justify-between bg-teal-800 rounded-sm px-2 py-1">
                <div className=''>
                  Order Summary
                </div>
                <label className="flex items-center gap-2 text-xs rounded-sm">
                  <span className=''>Mark as <i>CITO</i></span>
                  <Checkbox checked={data.is_cito} onChange={(e) => { setData('is_cito', e.target.checked) }} />
                </label>
              </div>
              {
                data.tests.length
                  ? (
                    <div className='px-2.5 pb-2.5 pt-1.5 bg-white'>
                      {data.tests.map(test => (
                        <div
                          key={(test as Record<string, unknown>)._id as string}
                          className="flex gap-1 items-center justify-between"
                        >
                          <div>{(test as Record<string, unknown>).name as string}</div>
                          <div className='font-bold'>{((test as Record<string, unknown>).price as number).toLocaleString('id-ID', {
                            style: 'currency',
                            currency: 'IDR',
                            maximumFractionDigits: 0,
                          })}</div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className='text-gray-500 text-center bg-white pb-2.5 pt-1.5'>No selected test.</div>
                  )
              }
            </div>

            <Textarea
              rows={2}
              value={data.note}
              placeholder="Add note..."
              className="w-full resize-none"
              onChange={(e) => { setData('note', e.target.value) }}
            />
          </div>

          <div className='flex items-center px-6 py-3 shadow-[0px_0px_13px_7px_rgba(240,_253,_250,_1)] mt-auto'>
            {
              data.tests.length
                ? (
                  <div className='font-bold text-[1.05rem] flex gap-1 text-teal-800'>
                    Total {(data.tests as Record<string, unknown>[])
                      .reduce((accumulator, dataTest) => (
                        accumulator + ((dataTest as Record<string, unknown>).price as number)
                      ), 0)
                      .toLocaleString('id-ID', {
                        style: 'currency',
                        currency: 'IDR',
                        maximumFractionDigits: 0,
                      })
                    }
                  </div>
                ) : null
            }
            <DialogClose aria-label="Close" asChild>
              <SecondaryButton
                className='py-2 px-3 ml-auto'
              >
                Cancel
              </SecondaryButton>
            </DialogClose>
            <PrimaryButton
              disabled={processing}
              className='py-2 px-3 ml-3'
            >
              {processing ? <>Processing...<UpdateIcon className='animate-spin ml-2' /></> : 'Create Order'}
            </PrimaryButton>
          </div>

        </form>
      </DialogContent>
    </Dialog >
  )
}

export default CreateOrderModal