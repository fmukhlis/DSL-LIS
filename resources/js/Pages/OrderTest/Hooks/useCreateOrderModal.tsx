import { FormEvent, useEffect, useState } from "react"

// Inertia JS
import { useForm, usePage } from "@inertiajs/react"

// Internal
import { DoctorModelProps, PatientModelProps, RegisteredDoctorProps, RegisteredPatientProps, TestModelProps, UserModelProps } from "@/Types"

// React Select
import { ActionMeta } from "react-select"

// Faker JS
import { faker } from "@faker-js/faker"

const useCreateOrderModal = ({ can, externalDoctors, processedRegID }: {
  can: {
    selectExternalDoctor: boolean
    viewDetail: boolean
  },
  externalDoctors: DoctorModelProps[]
  processedRegID: string[]
}) => {

  const { data, setData, errors, clearErrors, reset, processing, post } = useForm<{
    note: string
    tests: TestModelProps[]
    is_cito: boolean
    patient: RegisteredPatientProps | null
    doctor: RegisteredDoctorProps | null
    externalDoctor: DoctorModelProps
    payment_method: 'BPJS' | 'Insurance' | 'Self-Payment' | ''
  }>({
    note: '',
    tests: [],
    doctor: null,
    externalDoctor: {
      _id: '',
      institution: '',
      name: '',
    },
    patient: null,
    is_cito: false,
    payment_method: ''
  })

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
            registeredPatient => !(processedRegID.includes(registeredPatient.registration_id))
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
    if (!isOpen) {
      setExtDrExist(true)
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

export default useCreateOrderModal