import ApplicantJobCardContainer from "@/components/dashboard/ApplicantJobCardContainer";

const ApplicantFindJobsPage = async () => {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-gray-900">Find Your Next Dream Job</h1>
                <p className="mt-2 text-sm text-gray-500">
                    Browse latest job openings from top companies.
                </p>
            </div>
            <ApplicantJobCardContainer />
        </div>
    )
}

export default ApplicantFindJobsPage;