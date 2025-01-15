import axios from "axios";
import StartUpDetails from "./StartUpDetails";



async function StartupDetails({ params }: any) {
    const paramsAwaited = await params;
    const data = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/fetch/with_id?project_id=${paramsAwaited.id}`)
    const startupData = data.data.project;
    return (
        <StartUpDetails startupData={startupData} />
    );
}

export default StartupDetails;
