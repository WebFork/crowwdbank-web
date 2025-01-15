import { currentUser } from "@clerk/nextjs/server";
import Onboarding from "./_components/OnboardingPage";

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
        // const response = await axios.get(`${process.env.API_URL}/onboarding/complete`, {
        //     headers: {
        //         'Content-Type': 'application/json',
        //         "x-api-key": process.env.API_KEY,
        //     },
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
