import Link from "next/link";

// pages/login.tsx
export default function Login() {
    const GITHUB_AUTH_URL = `https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}&scope=repo%20read:user`;
  
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <Link href={GITHUB_AUTH_URL}>
          <button className="bg-black text-white px-6 py-2 rounded">Login with GitHub</button>
        </Link>
      </div>
    );
  }
  