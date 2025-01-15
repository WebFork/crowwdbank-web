import Navbar from "@/components/navbar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <main>
                {children}
            </main>
        </>
    );
}

export default DashboardLayout;
