import { currentUser } from "@clerk/nextjs/server";
import Onboarding from "./_components/OnboardingPage";
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
        // const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/onboarding/complete`, {
        //     ext_id: user.id,
        // });
        // console.log(response.data);
        const onboarding_complete = false;

        if (onboarding_complete) {
            return (
                <div>
                    Dashboard
                </div>
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
