import ClientComponent from "./ClientComponent"
import { Suspense } from "react"


export default function Page() {
    return (
        <Suspense fallback={<p>Loading Feed...</p>}>
            <ClientComponent />
        </Suspense>
    )
}