// Inertia JS
import {
    Head, Link,
} from '@inertiajs/react'

// Internal

export default function Home() {
    return (
        <>
            <Head title="Home" />
            <Link href={route('login')} >Login</Link>
        </>
    );
}
