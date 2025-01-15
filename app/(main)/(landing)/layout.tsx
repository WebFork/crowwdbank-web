import Navbar from "@/components/navbar";

const LandingLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <Navbar />
            <main>
                {children}
            </main>
        </>
    );
}

export default LandingLayout;
