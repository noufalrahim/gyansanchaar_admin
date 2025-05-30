import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Toaster } from "@/components/ui/sonner";
import { AppSideBar } from "@/components/AppSidebar";

interface LayoutProps {
    children?: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {

    return (
        <>
            {
                // isMobileView ? (
                //     <div className='min-h-screen w-full flex flex-col'>
                //         {!isLoginPage && <AppBar departmentName={userData?.department?.departmentName}/>}
                //         <div className='flex-grow flex px-5 pb-20 bg-secondary-main'>
                //             {children}
                //         </div>
                //         {!isLoginPage && <BottomNavBar userRole={userRole} />}
                //     </div>
                // ) :
                //  (
                    <SidebarProvider>
                        <AppSideBar/>
                        <Toaster closeButton position="top-right" richColors theme='light' />
                        <main className='w-full px-5 bg-secondary-main pb-20 relative'>
                            <SidebarTrigger />
                            {children}
                        </main>
                    </SidebarProvider>
                // )
            }
        </>
    )
}
