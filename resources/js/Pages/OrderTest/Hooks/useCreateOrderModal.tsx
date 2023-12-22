import { FormEvent, useEffect, useState } from "react"

// Inertia JS
import { useForm } from "@inertiajs/react"

// Internal
import { CategoryModelProps, DoctorModelProps, TestModelProps } from "@/Types"

// React Select
import { ActionMeta } from "react-select"

// Faker JS
import { faker } from "@faker-js/faker"

const useCreateOrderModal = ({ categories, externalDoctors }: {
  categories: CategoryModelProps[]
  externalDoctors: DoctorModelProps[]
}) => {
  const { data, setData, errors, clearErrors, reset, processing, post, transform } = useForm<{
    note: string
    tests: TestModelProps[]
    is_cito: boolean
    patient: {
      id: number
      name: string
      email: string
    } | null
    doctor: Omit<DoctorModelProps, '_id'> | null
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
  const [isOpen, setIsOpen] = useState(false)

  let typingTimeoutPatient: ReturnType<typeof setTimeout>
  let typingTimeoutDoctor: ReturnType<typeof setTimeout>

  const loadPatients = (inputValue: string) => {
    return new Promise<{
      value: {
        id: number
        name: string
        email: string
      },
      label: string,
    }[]>((resolve) => {
      if (typingTimeoutPatient) {
        clearTimeout(typingTimeoutPatient)
      }
      typingTimeoutPatient = setTimeout(async () => {
        try {
          const response = await fetch('https://reqres.in/api/users')
          if (!response.ok) {
            throw new Error(`Http error. (${response.status})`)
          }
          const originalData: Record<string, any> = await response.json()
          const data = (originalData.data as Record<string, unknown>[]).map(item => ({
            value: {
              id: item.id as number,
              name: `${item.first_name} ${item.last_name}`,
              email: item.email as string
            },
            label: `${item.first_name} ${item.last_name}`,
          }))
          resolve(data.filter(
            d => (
              String(d.value.id).includes(inputValue) ||
              d.value.name.toLowerCase().includes(inputValue.toLowerCase())
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
      value: Omit<DoctorModelProps, '_id'>,
      label: string,
    }[]>(resolve => {
      if (typingTimeoutDoctor) {
        clearTimeout(typingTimeoutDoctor)
      }

      typingTimeoutDoctor = setTimeout(() => {
        fetch(route('fetch.doctors'))
          .then(response => {
            if (!response.ok) {
              throw new Error(`Http error. (${response.status})`)
            }
            return response.json()
          })
          .then((originalData: {
            name: string
            department: string
          }[]) => {
            const data = originalData.map(od => ({
              label: od.name,
              value: od,
            }))
            resolve([
              {
                label: 'External doctor...',
                value: {
                  name: 'External doctor...',
                  department: 'External doctor...',
                },
              },
              ...data.filter(
                d => (
                  d.value.name.toLowerCase().includes(inputValue.toLowerCase())
                )
              ),
            ])
          })
          .catch(error => { console.log(error) })
      }, 500)
    })
  }

  const selectPatient = (newValue: {
    value: {
      id: number
      name: string
      email: string
    }
    label: string
  } | null) => {
    setData(data => ({
      ...data,
      patient: newValue ? newValue.value : null,
      payment_method: faker.helpers.arrayElement(['BPJS', 'Insurance', 'Self-Payment'])
    }))
  }

  const selectDoctor = (newValue: {
    value: Omit<DoctorModelProps, '_id'>
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
      setData(data => ({
        ...data,
        externalDoctor: {
          _id: '',
          institution: '',
          name: newValue!.value,
        }
      }))
    } else {
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

  // transform((data) => ({
  //   ...data,
  //   // doctor: data.doctor ? (data.doctor as Record<string, string>).value : null,
  //   // patient: data.patient ? data.patient.value as Record<string, unknown> : null,
  //   tests: data.tests.map(dataTest => (dataTest as Record<string, unknown>)._id),
  // }))


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