import JobPostCardContainer from "@/components/dashboard/JobPostCardContainer";

const EmployerAllJobsPage = async () => {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-gray-900">My Job Posts</h1>
                <p className="mt-2 text-sm text-gray-500">
                    Manage and view all the jobs you have posted.
                </p>
            </div>
            <JobPostCardContainer />
        </div>
    )
}

export default EmployerAllJobsPage;