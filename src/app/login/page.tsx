import React from "react";
import LoginForm from "@/components/auth/LoginForm";

const LoginPage: React.FC = () => {
    return (
        <main className="min-h-screen bg-muted/30 flex items-center justify-center px-4 py-10">
            <div className="w-full max-w-md rounded-xl border bg-background p-6 shadow-sm sm:p-8">
                <LoginForm />
            </div>
        </main>
    )
}

export default LoginPage;