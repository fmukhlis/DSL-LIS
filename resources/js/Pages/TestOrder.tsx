import { useState } from "react"

// Inertia
import { Head } from "@inertiajs/react"

// TanStack Table
import { ColumnDef } from "@tanstack/react-table"


// Internal
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout"
import PrimaryButton from "@/Components/PrimaryButton"
import SecondaryButton from "@/Components/SecondaryButton"
import { UpdateIcon } from "@radix-ui/react-icons"

const TestOrder = (props) => {
    const data = [
        {
          "id": 1,
          "name": "John Doe",
          "email": "johndoe@example.com",
          "phone": "123-456-7890"
        },
        {
          "id": 2,
          "name": "Jane Smith",
          "email": "janesmith@example.com",
          "phone": "987-654-3210"
        },
        {
          "id": 3,
          "name": "Michael Johnson",
          "email": "michaeljohnson@example.com",
          "phone": "555-123-4567"
        },
        {
          "id": 4,
          "name": "Emily Wilson",
          "email": "emilywilson@example.com",
          "phone": "999-888-7777"
        },
        {
          "id": 5,
          "name": "Daniel Lee",
          "email": "daniellee@example.com",
          "phone": "444-555-6666"
        },
        {
          "id": 6,
          "name": "Olivia Martinez",
          "email": "oliviamartinez@example.com",
          "phone": "777-999-1111"
        },
        {
          "id": 7,
          "name": "William Thompson",
          "email": "williamthompson@example.com",
          "phone": "222-333-4444"
        }
      ]

    return (
        <AuthenticatedLayout>
            <Head title="Test Order"/>
            <div className="py-3 max-w-6xl w-full mx-auto">
                <div className="flex">
                    <SecondaryButton
                      className="px-3 py-2"
                    >
                        Make new order
                    </SecondaryButton>
                    <PrimaryButton
                      className="px-3 py-2 ml-auto"
                    >
                      Refresh <UpdateIcon className="ml-1" />
                    </PrimaryButton>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}


export default TestOrder