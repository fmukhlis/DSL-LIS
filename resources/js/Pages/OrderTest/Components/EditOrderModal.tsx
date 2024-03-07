import { ReactNode } from "react"

// Internal
import Alert from '@/Components/Alert'
import Checkbox from "@/Components/Checkbox"
import Textarea from "@/Components/Textarea"
import PrimaryButton from '@/Components/PrimaryButton'
import SecondaryButton from '@/Components/SecondaryButton'
import SearchableAsyncSelect from "@/Components/SearchableAsyncSelect"
import Input from '@/Components/Input'
import CreateableSearchableSelect from '@/Components/CreateableSearchableSelect'
import useEditOrderModal from "../Hooks/useEditOrderModal"
import DangerButton from "@/Components/DangerButton"
import {
  DoctorModelProps,
  RegisteredDoctorProps,
  RegisteredPatientProps,
  TestModelProps
} from '@/Types'
import {
  Dialog,
  DialogTitle,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/Components/Dialog"

// Radix UI
import * as PrimitivesTabs from '@radix-ui/react-tabs'
import { FilePlusIcon, UpdateIcon } from '@radix-ui/react-icons'
import { animated } from "@react-spring/web"

const EditOrderModal = ({ children, defaultData }: {
  children: ReactNode
  defaultData: {
    note?: string
    tests: TestModelProps[]
    is_cito: boolean
    patient: RegisteredPatientProps
    doctor: RegisteredDoctorProps
    externalDoctor?: DoctorModelProps
    payment_method: 'BPJS' | 'Insurance' | 'Self-Payment'
  }
}) => {
  console.log(defaultData.patient)
  const {
    categories,
    data,
    deleteOnProcess,
    deleteOrder,
    errors,
    extDrExist,
    externalDoctorOptions,
    fade,
    handleCITOCheckboxInput,
    handleInstitutionTextInput,
    handleNoteTextInput,
    handleTabChange,
    handleTestsCheckboxInput,
    isExternal,
    isOpen,
    loadPatients,
    loadDoctors,
    processing,
    selectDoctor,
    selectExternalDoctor,
    selectPatient,
    setIsOpen,
    spring,
    submitForm,
    tab,
  } = useEditOrderModal({ defaultData })

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}    >
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      {fade((style, item) => {
        return item &&
          <DialogContent
            style={style}
            className='w-[600px] h-full overflow-hidden select-none'
          >
            <form onSubmit={submitForm} className='flex flex-col h-full'>
              <DialogTitle
                className="pt-6 pl-7 pr-6 pb-2 z-10 flex items-center justify-between font-bold uppercase text-teal-800 text-lg shadow-[0px_0px_13px_7px_rgba(240,_253,_250,_1)]"
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
                {
                  // @ts-ignore
                  errors['externalDoctor.institution'] && <Alert formID={0} message={errors['externalDoctor.institution']} type='error' />
                }

                <div className="flex flex-col gap-2 ">
                  <div className='flex flex-col gap-2'>
                    <div className="flex justify-between gap-2">
                      <SearchableAsyncSelect
                        value={data.patient ? { value: data.patient, label: data.patient.name } : null}
                        maxMenuHeight={180}
                        className="w-2/5 text-sm"
                        loadOptions={loadPatients}
                        placeholder='Select patient...'
                        noOptionsMessage={() => "Patient not found"}
                        onChange={newValue => {
                          selectPatient(newValue)
                        }}
                      />
                      <SearchableAsyncSelect
                        maxMenuHeight={180}
                        value={data.doctor ? {
                          value: data.doctor,
                          label: data.doctor.name
                        } : null}
                        loadOptions={loadDoctors}
                        className="w-3/5 text-sm"
                        placeholder='Select doctor...'
                        noOptionsMessage={() => "Doctor not found"}
                        onChange={(newValue) => {
                          selectDoctor(newValue)
                        }}
                      />
                    </div>
                    {isExternal &&
                      <div className='flex justify-between gap-2'>
                        <CreateableSearchableSelect
                          className='text-sm w-3/5'
                          isClearable
                          options={externalDoctorOptions}
                          value={data.externalDoctor._id ? {
                            label: data.externalDoctor.name,
                            value: data.externalDoctor._id,
                          } : null}
                          placeholder="Doctor name..."
                          onChange={(newValue, actionMeta) => {
                            selectExternalDoctor(newValue, actionMeta)
                          }}
                        />
                        <Input
                          className='w-2/5'
                          disabled={extDrExist}
                          value={data.externalDoctor.institution}
                          onChange={(e) => {
                            handleInstitutionTextInput(e.target.value)
                          }}
                          placeholder='Institution name...'
                        />
                      </div>}
                  </div>

                  {categories?.length ? (
                    <PrimitivesTabs.Root
                      className="flex flex-col"
                      value={tab}
                      onValueChange={handleTabChange}
                    >
                      <PrimitivesTabs.List
                        className="flex bg-white rounded gap-2 text-sm font-bold p-1 mb-2 text-teal-50 overflow-x-scroll"
                        aria-label="Select laboratory test"
                      >
                        {categories.map((category => (
                          <PrimitivesTabs.Trigger
                            key={category._id}
                            value={category._id}
                            className="px-2 uppercase py-1 rounded duration-150 select-none outline-none ring-offset-2 ring-teal-400 cursor-default bg-teal-800 hover:bg-teal-600 data-[state=active]:bg-teal-600 focus:ring-2"
                          >
                            {category.name}
                          </PrimitivesTabs.Trigger>
                        )))}
                      </PrimitivesTabs.List>
                      {categories.map((category => (
                        <PrimitivesTabs.Content
                          className="outline-none"
                          key={category._id}
                          value={category._id}
                        >
                          <animated.div style={spring} className="p-2 rounded text-sm flex flex-wrap gap-y-[2px] outline-none bg-white max-h-[150px] overflow-y-auto">
                            {category.tests!.length
                              ? category.tests!.map(test => (
                                <label
                                  key={test._id as string}
                                  className="flex items-center gap-2 shrink-0 grow-0 basis-1/2"
                                >
                                  <Checkbox
                                    checked={data.tests.some(dataTest => dataTest._id === test._id)}
                                    onChange={(e) => {
                                      handleTestsCheckboxInput(test, e.target.checked)
                                    }}
                                  />
                                  <span>{test.name as string}</span>
                                </label>
                              )) : (
                                <div className='mx-auto text-gray-400'>No test found on this category.</div>
                              )}
                          </animated.div>
                        </PrimitivesTabs.Content>)
                      ))}
                    </PrimitivesTabs.Root>
                  ) : null}
                </div>

                <Input className='bg-gray-100 shadow-none text-gray-400' disabled value={data.payment_method ? data.payment_method : 'Payment method'} />

                <div className="flex flex-col text-sm">
                  <div className="font-bold text-base text-teal-50 flex justify-between bg-teal-800 rounded-sm px-2 py-1">
                    <div className=''>
                      Order Summary
                    </div>
                    <label className="flex items-center gap-2 text-xs rounded-sm">
                      <span className=''>Mark as <i>CITO</i></span>
                      <Checkbox checked={data.is_cito} onChange={(e) => { handleCITOCheckboxInput(e.target.checked) }} />
                    </label>
                  </div>
                  {data.tests.length
                    ? (
                      <div className='px-2.5 pb-2.5 pt-1.5 bg-white'>
                        {data.tests.map(test => (
                          <div
                            key={test._id}
                            className="flex gap-1 items-center justify-between"
                          >
                            <div>{test.name}</div>
                            <div className='font-bold'>{test.price.toLocaleString('id-ID', {
                              style: 'currency',
                              currency: 'IDR',
                              maximumFractionDigits: 0,
                            })}</div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className='text-gray-500 text-center bg-white pb-2.5 pt-1.5'>No selected test.</div>
                    )}
                </div>

                <Textarea
                  rows={2}
                  value={data.note}
                  placeholder="Add note..."
                  className="w-full resize-none"
                  onChange={(e) => { handleNoteTextInput(e.target.value) }}
                />
              </div>

              <div className='flex items-center px-6 py-3 gap-3 shadow-[0px_0px_13px_7px_rgba(240,_253,_250,_1)] mt-auto'>
                {data.tests.length > 0 &&
                  <div className='font-bold text-[1.05rem] flex gap-1 text-teal-800'>
                    Total {data.tests.reduce((accumulator, dataTest) => (
                      accumulator + (dataTest.price)
                    ), 0)
                      .toLocaleString('id-ID', {
                        style: 'currency',
                        currency: 'IDR',
                        maximumFractionDigits: 0,
                      })
                    }
                  </div>}
                <DangerButton
                  className='py-2 px-3 ml-auto'
                  disabled={deleteOnProcess}
                  type="button"
                  onClick={deleteOrder}
                >
                  Delete
                </DangerButton>
                <DialogClose aria-label="Close" asChild>
                  <SecondaryButton
                    className='py-2 px-3'
                  >
                    Cancel
                  </SecondaryButton>
                </DialogClose>
                <PrimaryButton
                  disabled={processing}
                  className='py-2 px-3'
                >
                  {processing ? <>Processing...<UpdateIcon className='animate-spin ml-2' /></> : 'Update'}
                </PrimaryButton>
              </div>

            </form>
          </DialogContent>
      })}
    </Dialog >
  )
}

export default EditOrderModal