import { FormEvent, useEffect, useState } from "react"

// Inertia JS
import { useForm, usePage } from "@inertiajs/react"

// Internal
import { DoctorModelProps, PatientModelProps, RegisteredDoctorProps, RegisteredPatientProps, TestModelProps, UserModelProps } from "@/Types"

// React Select
import { ActionMeta } from "react-select"

// Faker JS
import { faker } from "@faker-js/faker"

const useEditOrderModal = ({ can, defaultData, externalDoctors, processedRegID }: {
  can: {
    selectExternalDoctor: boolean
    viewDetail: boolean
  },
  defaultData: {
    note?: string
    tests: TestModelProps[]
    is_cito: boolean
    patient: RegisteredPatientProps
    doctor: RegisteredDoctorProps
    externalDoctor?: DoctorModelProps
    payment_method: 'BPJS' | 'Insurance' | 'Self-Payment'
  }
  externalDoctors: DoctorModelProps[]
  processedRegID: string[]
}) => {

  const { data, setData, errors, clearErrors, reset, processing, patch, transform } = useForm<{
    note: string
    tests: TestModelProps[]
    is_cito: boolean
    patient: RegisteredPatientProps | null
    doctor: RegisteredDoctorProps | null
    externalDoctor: DoctorModelProps
    payment_method: 'BPJS' | 'Insurance' | 'Self-Payment' | ''
  }>({
    note: defaultData?.note ?? '',
    tests: defaultData.tests,
    doctor: defaultData.doctor,
    externalDoctor: defaultData.externalDoctor ?? {
      _id: '',
      institution: '',
      name: '',
    },
    patient: defaultData.patient,
    is_cito: defaultData.is_cito,
    payment_method: defaultData.payment_method
  })

  const deleteForm = useForm()

  const [isExternal, setIsExternal] = useState(false)
  const [extDrExist, setExtDrExist] = useState(true)
  const [isOpen, setIsOpen] = useState(false)

  let typingTimeoutPatient: ReturnType<typeof setTimeout>
  let typingTimeoutDoctor: ReturnType<typeof setTimeout>

  const loadPatients = (inputValue: string) => {
    return new Promise<{
      label: string,
      value: RegisteredPatientProps,
    }[]>((resolve) => {
      if (typingTimeoutPatient) {
        clearTimeout(typingTimeoutPatient)
      }
      typingTimeoutPatient = setTimeout(async () => {
        try {
          const response: { data: RegisteredPatientProps[] } = await window.axios.get(
            route('fetch.registered.patients')
          )
          const registeredPatients = response.data.filter(
            registeredPatient =>
              // Exclude the current registration ID from processedRegID array
              !(processedRegID.filter(regID => regID !== defaultData.patient.registration_id)
                .includes(registeredPatient.registration_id))
          ).map(
            registeredPatient => ({
              value: registeredPatient,
              label: registeredPatient.name,
            })
          )

          resolve(registeredPatients.filter(
            registeredPatient => (
              String(registeredPatient.value.patient_id).includes(inputValue) ||
              registeredPatient.value.name.toLowerCase().includes(inputValue.toLowerCase())
            )
          ))
        } catch (error) {
          console.log(error)
        }
      }, 500)
    })
  }

  const loadDoctors = (inputValue: string) => {
    return new Promise<{
      label: string,
      value: RegisteredDoctorProps,
    }[]>(resolve => {
      if (typingTimeoutDoctor) {
        clearTimeout(typingTimeoutDoctor)
      }

      typingTimeoutDoctor = setTimeout(() => {
        window.axios.get(route('fetch.doctors'))
          .then((response: { data: RegisteredDoctorProps[] }) => {
            const registeredDoctors = response.data.map(registeredDoctor => ({
              label: registeredDoctor.name,
              value: registeredDoctor,
            }))

            resolve(
              can.selectExternalDoctor ? [
                {
                  label: 'External doctor...',
                  value: {
                    name: 'External doctor...',
                    department: 'External doctor...',
                  },
                },
                ...registeredDoctors.filter(
                  registeredDoctor => (
                    registeredDoctor.value.name.toLowerCase().includes(inputValue.toLowerCase())
                  )
                ),
              ] : [
                ...registeredDoctors.filter(
                  registeredDoctor => (
                    registeredDoctor.value.name.toLowerCase().includes(inputValue.toLowerCase())
                  )
                ),
              ])
          })
          .catch(error => { console.log(error) })
      }, 500)
    })
  }

  const selectPatient = (newValue: {
    value: RegisteredPatientProps
    label: string
  } | null) => {
    setData(data => ({
      ...data,
      patient: newValue ? newValue.value : null,
      payment_method: faker.helpers.arrayElement(['BPJS', 'Insurance', 'Self-Payment'])
    }))
  }

  const selectDoctor = (newValue: {
    value: RegisteredDoctorProps
    label: string
  } | null) => {
    setData('doctor', newValue ? newValue.value : null)
  }

  const externalDoctorOptions = externalDoctors.map(externalDoctor => ({
    value: externalDoctor._id,
    label: externalDoctor.name,
  }))

  const selectExternalDoctor = (
    newValue: {
      value: string
      label: string
    } | null,
    actionMeta: ActionMeta<{
      value: string
      label: string
    }>
  ) => {
    if (actionMeta.action === 'create-option') {
      setExtDrExist(false)
      setData(data => ({
        ...data,
        externalDoctor: {
          _id: '',
          institution: '',
          name: newValue!.value,
        }
      }))
    } else {
      setExtDrExist(true)
      const selectedExternalDoctor = externalDoctors.find(doctor => doctor._id === newValue?.value)
      setData(data => ({
        ...data,
        externalDoctor: {
          _id: newValue ? newValue.value : '',
          institution: selectedExternalDoctor ? selectedExternalDoctor.institution : '',
          name: selectedExternalDoctor ? selectedExternalDoctor.name : '',
        }
      }))
    }
  }

  const handleInstitutionTextInput = (newValue: string) => {
    setData(data => ({
      ...data,
      externalDoctor: {
        ...data.externalDoctor,
        institution: newValue,
      }
    }))
  }

  const handleTestsCheckboxInput = (test: TestModelProps, isChecked: boolean) => {
    if (isChecked) {
      setData('tests', [...data.tests, test])
    } else {
      setData('tests', data.tests.filter(dataTest => dataTest._id !== test._id))
    }
  }

  const handleCITOCheckboxInput = (isChecked: boolean) => {
    setData('is_cito', isChecked)
  }

  const handleNoteTextInput = (newValue: string) => {
    setData('note', newValue)
  }

  const submitForm = (e: FormEvent) => {
    e.preventDefault()
    clearErrors()
    patch(
      route('order.detail', { registration_id: defaultData.patient.registration_id }),
      {
        onSuccess: () => {
          setIsOpen(false)
        }
      }
    )
  }

  const deleteOrder = (e: FormEvent) => {
    e.preventDefault()
    deleteForm.delete(route('order.detail', { registration_id: defaultData.patient.registration_id }),
      {
        onSuccess: () => {
          setIsOpen(false)
        }
      }
    )
  }

  useEffect(() => {
    if (!isOpen) {
      reset()
      clearErrors()
    }
  }, [isOpen])

  useEffect(() => {
    if (data.doctor && data.doctor.name === 'External doctor...') {
      setIsExternal(true)
    } else {
      setIsExternal(false)
      setData('externalDoctor', {
        _id: '',
        institution: '',
        name: '',
      })
    }
  }, [data.doctor])

  return ({
    data,
    deleteOnProcess: deleteForm.processing,
    deleteOrder,
    errors,
    extDrExist,
    externalDoctorOptions,
    handleCITOCheckboxInput,
    handleInstitutionTextInput,
    handleNoteTextInput,
    handleTestsCheckboxInput,
    isExternal,
    isOpen,
    loadDoctors,
    loadPatients,
    processing,
    selectDoctor,
    selectExternalDoctor,
    selectPatient,
    setIsOpen,
    submitForm
  })
}

export default useEditOrderModal