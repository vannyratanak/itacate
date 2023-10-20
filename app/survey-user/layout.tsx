
export default function Layout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
          
            <div className="relative max-h-full">
                {children}
                {/* <div className=" max-h-full flex items-center justify-center min-h-screen flex-col ">
                   {children}
                </div> */}
                
            </div>
        </>
    );
}