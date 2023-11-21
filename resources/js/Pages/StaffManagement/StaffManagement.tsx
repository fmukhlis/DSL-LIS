
// Internal
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout"

// Inertia JS
import { Head } from "@inertiajs/react"
import AddDoctor from "./AddDoctor"
import CreateDepartment from "./CreateDepartment"
import CreateSpecialization from "./CreateSpecialization"
import AddAnalyst from "./AddAnalyst"

const StaffManagement = ({
    doctors,
    analysts,
    departments,
    specializations,
}: {
    doctors: Record<string, unknown>[]
    analysts: Record<string, unknown>[]
    departments: Record<string, unknown>[]
    specializations: Record<string, unknown>[]
}) => {
    return (
        <AuthenticatedLayout className='bg-teal-50 min-h-screen'>
            <Head title="Home" />
            <div className='flex gap-7 max-w-6xl mx-auto p-7 flex-col items-center'>
                <CreateDepartment className="w-full max-w-md" />
                <CreateSpecialization className="w-full max-w-md" />
                <AddDoctor
                    doctors={doctors}
                    departments={departments}
                    className='w-full max-w-md'
                    specializations={specializations}
                />
                <AddAnalyst analysts={analysts} className="w-full max-w-md" />

            </div>
        </AuthenticatedLayout>
    )
}

export default StaffManagement