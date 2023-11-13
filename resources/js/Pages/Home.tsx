// Inertia JS
import {
    Head,
} from '@inertiajs/react'

// Internal

export default function Home({ categories }: { categories: Record<string, unknown>[] }) {

    return (
        <>
            <Head title="Home" />
        </>
    );
}
