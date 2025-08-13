export default function PlanManagerLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="h-full flex flex-col">
            <div className="flex-1 min-h-0">
                {children}
            </div>
        </div>
    );
}