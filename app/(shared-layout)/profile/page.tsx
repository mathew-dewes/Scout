
import { Suspense } from "react";
import Profile from "./_components/Profile";
import LoadingProfile from "./_components/LoadingProfile";


export default async function ProfilePage() {

    return (
        <div>
            <Suspense fallback={
                <LoadingProfile />
            }>
                <Profile />
            </Suspense>


        </div>
    )
}