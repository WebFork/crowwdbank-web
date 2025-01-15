import { currentUser } from "@clerk/nextjs/server";
import Onboarding from "./_components/OnboardingPage";
import Dashboard from "./_components/Dashboard";
import axios from "axios";

const DashboardPage = async () => {
    const user = await currentUser();

    if(!user) {
        return (
            <div>
                Loading...
            </div>
        );
    }

    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/onboarding/complete`, {
            ext_id: user.id,
        });
        const onboarding_complete = response.data.onboarding_complete;

        if (onboarding_complete) {
            return (
                <Dashboard />
            );
        } else {
            return (
                <Onboarding UserId={user.id} />
            );
        }
    } catch (error) {
        console.error(error);
    }
};

export default DashboardPage;
