import { useMemo, useState } from 'react';
import { Link, Outlet, useLocation, useParams } from 'react-router-dom';
import sets from "../data/dummy.json";

export default function MainLayout() {
    const [sidebar, setSidebar] = useState(false);
    const toggleSidebar  = () => setSidebar(!sidebar);
    const closeSidebar = () => setSidebar(false);
    
    const { id } = useParams();
    const { pathname } = useLocation();
    const setId = id;

    const selectedSet = useMemo(
        () => (setId == null ? null : sets.find((s) => s.id == setId) ?? null),
        [setId]
    );
    
    const header = useMemo(() => {
        const isDashboard = pathname === "/";
        const isSetList = pathname.startsWith("/SetList");
        const isTest = pathname.includes("/test");
        const isSelectedSet = !!id && !isTest;

        if (isDashboard) return { backOrMenu: "menu" as const, title: "Dashboard" };
        if (isSetList) return { backOrMenu: "menu" as const, title: "Your Flashcard Sets" };
        if (isSelectedSet) return { backOrMenu: "back" as const, title: selectedSet?.name ?? "Title" };
        if (isTest) return { backOrMenu: "back" as const, title: "Playing" };

        return { backOrMenu: "menu" as const, title: "" };
        
    }, [pathname, id, selectedSet]);
    
    return (
    <div className="flex flex-col h-screen overflow-hidden">

        {/* Sidebar Overlay */}
        {sidebar && (
            <div className='fixed inset-0 bg-black/70 z-[998]'>
                <ul className='animate-fade-right fixed flex flex-col w-[200px] rounded-r-xl top-0 left-0 z-[999] h-full bg-blue-600 shadow-2xl pt-4'>
                    <li className='flex w-full px-3'>
                        <button onClick={closeSidebar} className='p-1 border-2 border-transparent hover:border-orange-300 rounded-xl'>
                            <img src='/menu.png' width='35'/>
                        </button>
                    </li>

                    <li className='flex w-full px-2'>
                        <Link 
                            to="/" 
                            className='flex flex-row items-center w-full p-2 border-2 border-transparent hover:border-orange-300 rounded-xl'
                            onClick={closeSidebar}
                        >
                            <img src='/dashboard.png' width='35'/>
                            <h2 className='pl-3'>Dashboard</h2>
                        </Link>
                    </li>

                    <li className='flex w-full px-2 pt-2'>
                        <Link 
                            to="/SetList" 
                            className='flex flex-row items-center w-full p-2 border-2 border-transparent hover:border-orange-300 rounded-xl'
                            onClick={closeSidebar}
                        >
                            <img src='/card_stack.png' width='35'/>
                            <h2 className='pl-3'>Cards</h2>
                        </Link>
                    </li>
                </ul>
            </div>
        )}

        {/* Fixed Header */}
        <nav className='h-20 shrink-0 bg-blue-600 flex items-center pl-[5px] drop-shadow-md z-50'>
            <div className='flex items-center justify-center w-[60px]'>
                {header.backOrMenu === "menu" && (
                    <button 
                        onClick={toggleSidebar}
                        className='p-1 border-2 border-transparent hover:border-orange-300 rounded-xl'
                    >
                        <img src='/menu.png' width='35'/>
                    </button>
                )}

                {header.backOrMenu === "back" && (
                    <Link 
                        to="/SetList"
                        className='p-1 border-2 border-transparent hover:border-orange-300 rounded-xl'
                    >
                        <img src='/arrow_back.png' width='35'/>
                    </Link>
                )}
            </div>

            <h1 className='pl-2 text-xl font-bold truncate max-w-[70%]'>
                {header.title}
            </h1>
        </nav>

        {/* Scrollable Content Area */}
        <main
            key={pathname}
            className='flex-1 overflow-y-auto scrollbar-gutter-stable animate-fade-right'
        >
            <div className='flex justify-center p-4'>
                <Outlet />
            </div>
        </main>

    </div>
    )
}

