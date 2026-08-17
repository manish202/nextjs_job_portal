import {EmployerJobPostingAddForm} from "@/components/dashboard/EmployerJobPostingForm";

const EmployerJobPostingPage = () => {
    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Post A New Job</h1>
            <EmployerJobPostingAddForm />
        </div>
    )
}

export default EmployerJobPostingPage;