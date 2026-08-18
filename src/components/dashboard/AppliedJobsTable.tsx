import Link from "next/link";
import { MapPin } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const appliedJobs = [
    {
        id: 1,
        title: "Frontend Developer",
        location: "Ahmedabad, Gujarat",
        jobType: "remote",
        workType: "full-time",
        jobLevel: "mid-level",
        dateApplied: "Feb 02, 2026",
        status: "pending",
    },
    {
        id: 2,
        title: "React JS Developer",
        location: "Rajkot, Gujarat",
        jobType: "hybrid",
        workType: "full-time",
        jobLevel: "junior",
        dateApplied: "Feb 05, 2026",
        status: "shortlisted",
    },
    {
        id: 3,
        title: "Next.js Developer",
        location: "Surat, Gujarat",
        jobType: "remote",
        workType: "contract",
        jobLevel: "senior-level",
        dateApplied: "Feb 08, 2026",
        status: "rejected",
    },
];

const getStatusVariant = (status: string) => {
    switch(status){
        case "shortlisted": return "default";
        case "rejected": return "destructive";
        case "pending": return "secondary";
        default: return "ghost";
    }
};

const AppliedJobsTable = () => {
    return (
        <div className="rounded-xl border bg-white shadow-sm">
            <div className="border-b px-6 py-5">
                <h2 className="text-lg font-semibold">Recently Applied</h2>
                <p className="mt-1 text-sm text-gray-500">
                    Your recently applied jobs and application status.
                </p>
            </div>
            <div className="overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="min-w-[320px]">Job</TableHead>
                            <TableHead className="whitespace-nowrap">Date Applied</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {appliedJobs.map((job) => (
                            <TableRow key={job.id}>
                                <TableCell>
                                    <div className="space-y-2">
                                        <div>
                                            <h3 className="font-medium text-gray-900">{job.title}</h3>
                                            <div className="mt-1 flex items-center gap-1.5 text-sm text-gray-500">
                                                <MapPin className="h-3.5 w-3.5" />
                                                {job.location}
                                            </div>
                                        </div>
                                        <div className="flex flex-wrap gap-1.5">
                                            <Badge variant="outline" className="capitalize">{job.jobType}</Badge>
                                            <Badge variant="outline" className="capitalize">{job.workType}</Badge>
                                            <Badge variant="outline" className="capitalize">{job.jobLevel}</Badge>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell className="whitespace-nowrap text-sm text-gray-600">
                                    {job.dateApplied}
                                </TableCell>
                                <TableCell>
                                    <Badge variant={getStatusVariant(job.status)} className="capitalize">
                                        {job.status}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-right">
                                    <Button variant="outline" size="sm">
                                        <Link href={`/dashboard/applicant/find-jobs/${job.id}`}>
                                            View Details
                                        </Link>
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default AppliedJobsTable;