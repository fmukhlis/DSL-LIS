import { useState } from "react"

// Inertia
import { Head } from "@inertiajs/react"

// Internal
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout"

const ValidateResult = () => {
  return (
    <AuthenticatedLayout>
        <Head title="Validate Result"/>
        HelloWorld
    </AuthenticatedLayout>
  )
}

export default ValidateResult