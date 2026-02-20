export default function Footer() {
    return (
        <footer className="bg-card border-t border-border py-12 pb-24 md:pb-12 mt-auto">
            <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-foreground">🏠 RentInIreland</span>
                </div>

                <div className="text-sm text-muted-foreground text-center md:text-right">
                    <p>© 2026 Powered by{" "}
                        <a
                            href="https://clockhash.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-bold text-primary hover:underline underline-offset-4"
                        >
                            ClockHash
                        </a>
                    </p>
                </div>
            </div>
        </footer>
    );
}
