import { useState } from 'react'

// Internal
import SecondaryButton from "@/Components/SecondaryButton"
import SearchableSelect from "@/Components/SearchableSelect"
import SearchableAsyncSelect from "@/Components/SearchableAsyncSelect"
import Checkbox from "@/Components/Checkbox"

// Radix UI
import * as PrimitivesTabs from '@radix-ui/react-tabs'
import {
  Dialog,
  DialogTitle,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/Components/Dialog"
import Textarea from "@/Components/Textarea"

const doctors: { value: string, label: string }[] = [
  { value: 'IDMNF', label: 'Dr. Muhammad Novani Fajar, S.Kom.', },
  { value: 'IDMSJ', label: 'Dr. Muhammad Syahrul Majid, S.Kom.', },
  { value: 'IDFMI', label: 'Dr. Fajar Mukhlis Imananda, S.Kom.', }
]

const tests: Record<string, { id: number, name: string, price: number }[]>[] = [
  {
    Hematology: [
      {
        id: 1,
        name: 'Complete Blood Count',
        price: 50000,
      },
      {
        id: 2,
        name: 'Hemoglobin',
        price: 25000,
      },
      {
        id: 3,
        name: 'Leukosit',
        price: 79000,
      }
    ]
  },
  {
    Chemical: [
      {
        id: 4,
        name: 'Albumin',
        price: 23000,
      },
      {
        id: 5,
        name: 'Bilirubin',
        price: 92000,
      }
    ]
  },
  {
    Microbiology: [
      {
        id: 6,
        name: 'Urine',
        price: 93000,
      },
      {
        id: 7,
        name: 'Faeces',
        price: 74000,
      }
    ]
  }, {
    Lorem: [
      {
        id: 8,
        name: 'Lorem Ipsum',
        price: 28000,
      },
      {
        id: 9,
        name: 'Dolor Sit',
        price: 55000,
      }
    ]
  },
  {
    Ipsum: [
      {
        id: 10,
        name: 'Lorem Ipsum',
        price: 84000,
      },
      {
        id: 11,
        name: 'Dolor Sit',
        price: 96000,
      }
    ]
  },
  {
    Dolor: [
      {
        id: 12,
        name: 'Lorem Ipsum',
        price: 57000,
      },
      {
        id: 13,
        name: 'Dolor Sit',
        price: 19000,
      }
    ]
  }
]

const CreateOrderModal = (props: { availableTests: unknown }) => {
  const [testsOrdered, setTestsOrdered] = useState<string[]>([])


  let typingTimeout: ReturnType<typeof setTimeout>

  const loadOptions = (inputValue: string) => {
    return new Promise<{ value: string, label: string }[]>((resolve) => {
      if (typingTimeout) {
        clearTimeout(typingTimeout)
      }
      typingTimeout = setTimeout(async () => {
        try {
          const response = await fetch('https://reqres.in/api/users')
          if (!response.ok) {
            throw new Error(`Http error. (${response.status})`)
          }
          const data: { value: string, label: string }[] = (await response.json()).data.map((item: Record<string, string>) => ({
            value: item.id,
            label: item.first_name,
          }))
          resolve(data.filter((i) => i.label.toLowerCase().includes(inputValue.toLowerCase())))
        } catch (error) {
          console.log(error)
        }
      }, 500)
    })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <SecondaryButton
          className="px-3 py-2"
        >
          Make new order
        </SecondaryButton>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle className="font-extrabold tracking-wide uppercase text-teal-800 mb-3">Order Test</DialogTitle>
        <div className="flex flex-col gap-2">
          <div className="flex justify-between gap-3">
            <SearchableAsyncSelect
              name="patient"
              className="w-1/2 text-sm"
              loadOptions={loadOptions}
              placeholder='Select patient...'
            />
            <SearchableSelect
              name="doctor"
              placeholder='Select doctor...'
              className="w-1/2 text-sm"
              options={doctors}
              noOptionsMessage={() => "Doctor not found"}
            />
          </div>
          <div>
            <PrimitivesTabs.Root className="flex flex-col" defaultValue="Hematology">
              <PrimitivesTabs.List
                className="flex gap-2 text-sm font-bold p-1 pb-3 mb-0.5 text-teal-50 overflow-x-auto"
                aria-label="Select laboratory test"
              >
                {tests.map((test => (
                  <PrimitivesTabs.Trigger
                    key={Object.keys(test)[0]}
                    value={Object.keys(test)[0]}
                    className="
                      px-2 uppercase py-1 rounded duration-150 select-none outline-none ring-offset-2 ring-teal-400 cursor-default
                      bg-teal-800 
                      hover:bg-teal-600
                      data-[state=active]:bg-teal-600
                      focus:ring-2 
                    "
                  >
                    {Object.keys(test)[0]}
                  </PrimitivesTabs.Trigger>
                )))}
              </PrimitivesTabs.List>
              {tests.map((test => (
                <PrimitivesTabs.Content className="outline-none" value={Object.keys(test)[0]} key={Object.keys(test)[0]}>

                  <div className="p-2 rounded text-sm flex flex-wrap gap-y-[2px] outline-none bg-white max-h-[150px] overflow-y-auto mb-3">
                    {Object.values(test)[0].map((t) => (
                      <label className="flex items-center gap-2 shrink-0 grow-0 basis-1/2" key={t.id}>
                        <Checkbox value={t.id} onChange={(e) => setTestsOrdered(to => [...to, e.target.value])} />
                        <span>{t.name}</span>
                      </label>
                    ))}
                  </div>

                  <Textarea
                    className="w-full resize-none mb-3"
                    rows={3}
                    placeholder="Add note..."
                  />

                  {testsOrdered.length > 0 &&
                    <div className="flex flex-col text-sm gap-1">
                      <div className="font-bold">Order Summary</div>
                      <div>
                        {testsOrdered.map(testOrdered => (
                          <div className="flex items-center justify-between">
                            <span></span>
                            <span>Rp50.000</span>
                          </div>
                        ))}
                        <div className="flex items-center justify-between">
                          <span>Test Name</span>
                          <span>Rp50.000</span>
                        </div>
                      </div>
                      <label className="text-xs font-bold flex items-center justify-between">
                        <span>Celeritas Intra Tempore Operatur (CITO) ?</span>
                        <Checkbox />
                      </label>
                    </div>
                  }
                </PrimitivesTabs.Content>)
              ))}
            </PrimitivesTabs.Root>
          </div>
        </div>

      </DialogContent>
    </Dialog>
  )
}

export default CreateOrderModal