import OnboardingPage from "./_components/OnboardingPage";

const DashboardPage = async () => {
    try {
        // const response = await axios.get(`${process.env.API_URL}/onboarding/complete`, {
        //     headers: {
        //         'Content-Type': 'application/json',
        //         "x-api-key": process.env.API_KEY,
        //     },
        // });
        // console.log(response.data);
        const onboarding_complete = false;

        if(onboarding_complete) {
            return (
                <div>
                    Dashboard
                </div>
            );
        } else {
            return (
                <OnboardingPage />
            );
        }
    } catch(error) {
        console.error(error);
    }
};

export default DashboardPage;
