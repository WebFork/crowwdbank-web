import axios from "axios";
import StartUpDetails from "./StartUpDetails";

async function StartupDetails({ params }: { params: { id: string } }) {
    const data = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/fetch/with_id?project_id=${params.id}`)
    const startupData = data.data.project;
    console.log(startupData);
    return (
        <StartUpDetails startupData={startupData} />
    );
}

export default StartupDetails;
