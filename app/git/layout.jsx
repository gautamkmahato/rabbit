
import Sidebar from "./_components/Sidebar";


export default function RootLayout({ children }) {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar stays fixed/sticky on left */}
      <Sidebar />

      {/* Main content scrolls independently */}
      <main className="flex-1 overflow-y-auto">
        <header className="hidden md:flex sticky top-0 z-50 justify-end items-center border-b border-zinc-100 px-6 py-2 gap-1 h-14">
          {/* <SignedOut>
            <SignInButton />
            <SignUpButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn> */}
        </header>


            {children}
        
      </main>
    </div>
  );
}
