// Inertia JS
import {
    Head,
} from '@inertiajs/react'

// Internal
import AddTest from './AddTest'
import AddParameter from './AddParameter'
import CreateCategory from './CreateCategory'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import AddUnit from './AddUnit'

export default function MasterData({
    tests,
    units,
    categories,
    parameters,
}: {
    units: Record<string, unknown>[]
    tests: Record<string, unknown>[]
    categories: Record<string, unknown>[]
    parameters: Record<string, unknown>[]
}) {
    return (
        <AuthenticatedLayout className='bg-teal-50 min-h-screen'>
            <Head title="Home" />
            <div className='flex items-center flex-col gap-7 max-w-6xl mx-auto py-5'>
                <CreateCategory className='w-[23rem]' />
                <AddTest className='w-[23rem]'
                    tests={tests}
                    categories={categories}
                />
                <AddParameter
                    tests={tests}
                    className='w-[23rem]'
                    categories={categories}
                    parameters={parameters}
                />
                <AddUnit
                    units={units}
                    className='w-[23rem]'
                    parameters={parameters}
                />
            </div>
        </AuthenticatedLayout>
    );
}