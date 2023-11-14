import PrimaryAnchor from "@/Components/PrimaryAnchor"
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout"
import { Head } from "@inertiajs/react"

const MasterData = () => {
    return (
        <AuthenticatedLayout>
            <Head title="Master Data" />
            <div className="flex justify-center gap-5 p-7">
                <PrimaryAnchor
                    href={route('test.management')}
                    className="p-7 !text-base"
                >
                    Test Management
                </PrimaryAnchor>
                <PrimaryAnchor
                    href={route('staff.management')}
                    className="p-7 !text-base"
                >
                    Staff Management
                </PrimaryAnchor>
            </div>
        </AuthenticatedLayout>
    )
}

export default MasterData