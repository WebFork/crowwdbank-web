import Navbar from "@/components/navbar";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <Navbar />
            <main>
                {children}
            </main>
        </>
    );
}

export default MainLayout;
