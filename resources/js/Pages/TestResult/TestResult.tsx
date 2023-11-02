import { useState } from "react"

// Inertia
import { Head } from "@inertiajs/react"

// Internal
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout"

const TestResult = () => {
  return (
    <AuthenticatedLayout>
        <Head title="Test Result"/>
        HelloWorld
    </AuthenticatedLayout>
  )
}

export default TestResult