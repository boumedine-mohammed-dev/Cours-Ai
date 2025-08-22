import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import Appsidebar from "./_componants/Appsidebar"
import Header from './_componants/Header'
function DashpoardProvider({ children }) {
    return (
        <div>
            <SidebarProvider>
                <Appsidebar />
                <div className="w-full" >
                    <Header />
                    {children}
                </div>


            </SidebarProvider>
        </div>
    )
}
export default DashpoardProvider