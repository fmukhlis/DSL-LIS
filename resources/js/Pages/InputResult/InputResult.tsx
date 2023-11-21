import { useState } from "react"

// Inertia
import { Head } from "@inertiajs/react"

// Internal
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout"

const InputResult = ({ orders }) => {
  console.log(orders)

  return (
    <AuthenticatedLayout>
      <Head title="Input Result" />
      HelloWorld
    </AuthenticatedLayout>
  )
}

export default InputResult