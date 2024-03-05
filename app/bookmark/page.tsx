import ClientComponent from "./ClientComponent"
import { Suspense } from "react"


export const metadata = {
    title : "NextToon | 북마크",
}



export default function Page() {
    return (
        <Suspense fallback={<p>Loading Feed...</p>}>
            <ClientComponent />
        </Suspense>
    )
}