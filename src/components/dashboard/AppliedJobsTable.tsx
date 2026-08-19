"use client";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { type ApplicantApplication } from "@/app/dashboard/applicant/ApplicantJobDataAction";
import { getStatusVariant } from "./ApplicantAppliedJobCard";

const AppliedJobsTable = ({jobsData}:{jobsData:ApplicantApplication[]}) => {
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
                        {jobsData.map((application:ApplicantApplication) => (
                            <TableRow key={application.jobs.id}>
                                <TableCell>
                                    <div className="space-y-2">
                                        <div>
                                            <h3 className="font-medium text-gray-900">{application.jobs.title}</h3>
                                            <div className="mt-1 flex items-center gap-1.5 text-sm text-gray-500">
                                                <MapPin className="h-3.5 w-3.5" />
                                                {application.jobs.location}
                                            </div>
                                        </div>
                                        <div className="flex flex-wrap gap-1.5">
                                            <Badge variant="outline" className="capitalize">{application.jobs.jobType}</Badge>
                                            <Badge variant="outline" className="capitalize">{application.jobs.workType}</Badge>
                                            <Badge variant="outline" className="capitalize">{application.jobs.jobLevel}</Badge>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell className="whitespace-nowrap text-sm text-gray-600">
                                    {application.jobs.createdAt.toISOString()}
                                </TableCell>
                                <TableCell>
                                    <Badge variant="outline" className={`shrink-0 capitalize ${getStatusVariant(application.applications.status)}`}>
                                        {application.applications.status}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-right">
                                    <Button variant="outline" size="sm">
                                        <Link href={`/dashboard/applicant/find-jobs/${application.jobs.id}`}>
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