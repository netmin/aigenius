const LandingLayout = ({children}: {children: React.ReactNode}) => {
    return (
        <main className="h-full bg-[#111827] overflow-auto">
            <div className="h-full mx-auto max-w-screen-xl w-full">
                {children}
            </div>

        </main>
    )
}

export default LandingLayout