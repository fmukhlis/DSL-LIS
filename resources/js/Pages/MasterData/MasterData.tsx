import PrimaryAnchor from "@/Components/PrimaryAnchor"
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout"

const MasterData = () => {
    return (
        <AuthenticatedLayout>
            <div className="flex justify-center gap-5 p-7">
                <PrimaryAnchor
                    href={route('test.management')}
                    className="p-7 !text-base"
                >
                    Test Management
                </PrimaryAnchor>
            </div>
        </AuthenticatedLayout>
    )
}

export default MasterData