'use client';

import { MapPin, BriefcaseBusiness, Banknote, Building2, GraduationCap, Clock3, CalendarDays,Tags } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { currencySymbols } from "@/drizzle/table_schema/jobsTableSchema";
import getPublishedTime from "@/lib/getPublishedTime";
import { type ApplicantApplication } from "@/app/dashboard/applicant/ApplicantJobDataAction";
import { APPLICATION_STATUS } from "@/drizzle/table_schema/applicationsTableSchema";

type Status = typeof APPLICATION_STATUS[number] | undefined;

export const getStatusVariant = (status:Status) => {
    switch(status){
        case "pending": return "bg-yellow-50 text-yellow-700 border-yellow-200";
        case "reviewing": return "bg-yellow-50 text-yellow-700 border-yellow-200";
        case "shortlisted": return "bg-yellow-50 text-yellow-700 border-yellow-200";
        case "selected": return "bg-green-50 text-green-700 border-green-200";
        case "rejected": return "bg-red-50 text-red-700 border-red-200";
        default: return "bg-gray-50 text-gray-700 border-gray-200";
    }
}

const ApplicantAppliedJobCard = ({application}: {application: ApplicantApplication}) => {
    const { applications, jobs, employers } = application;
    const currency = currencySymbols[jobs.salaryCurrency ?? "INR"];
    return (
        <Card className="group transition-shadow hover:shadow-md">
            <CardHeader className="pb-4">
                <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                        <CardTitle className="text-lg font-semibold leading-6">
                            {jobs.title}
                        </CardTitle>
                        <div className="mt-2 flex items-center gap-2 text-sm text-gray-600">
                            <Building2 className="h-4 w-4 shrink-0" />
                            <span>{employers.company_name}</span>
                        </div>
                    </div>
                    <Badge variant="outline" className={`shrink-0 capitalize ${getStatusVariant(applications.status)}`}>
                        {applications.status}
                    </Badge>
                </div>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        {jobs.location && (
                            <div className="flex items-center gap-3">
                                <div className="flex h-9 w-9 items-center justify-center rounded-md bg-blue-50 text-blue-600">
                                    <MapPin className="h-4 w-4" />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500">Location</p>
                                    <p className="text-sm font-medium text-gray-900 capitalize">
                                        {jobs.location}
                                    </p>
                                </div>
                            </div>
                        )}
                        {jobs.minSalary !== null &&
                            jobs.maxSalary !== null && (
                                <div className="flex items-center gap-3">
                                    <div className="flex h-9 w-9 items-center justify-center rounded-md bg-green-50 text-green-600">
                                        <Banknote className="h-4 w-4" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500">Salary</p>
                                        <p className="text-sm font-semibold text-gray-900">
                                            {currency}{" "}
                                            {jobs.minSalary.toLocaleString()}
                                            {" - "}
                                            {currency}{" "}
                                            {jobs.maxSalary.toLocaleString()}
                                            {jobs.salaryPeriod && (
                                                <span className="ml-1 text-xs font-normal text-gray-500">
                                                    / {jobs.salaryPeriod}
                                                </span>
                                            )}
                                        </p>
                                    </div>
                                </div>
                            )}
                    </div>
                    <div className="flex flex-wrap gap-x-5 gap-y-3 border-t pt-4">
                        {jobs.jobType && (
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                <BriefcaseBusiness className="h-4 w-4" />
                                <span className="capitalize">
                                    {jobs.jobType}
                                </span>
                            </div>
                        )}
                        {jobs.workType && (
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                <Clock3 className="h-4 w-4" />
                                <span className="capitalize">
                                    {jobs.workType}
                                </span>
                            </div>
                        )}
                        {jobs.jobLevel && (
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                <BriefcaseBusiness className="h-4 w-4" />
                                <span className="capitalize">
                                    {jobs.jobLevel}
                                </span>
                            </div>
                        )}
                        {jobs.minEducation && (
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                <GraduationCap className="h-4 w-4" />
                                <span className="capitalize">
                                    {jobs.minEducation}
                                </span>
                            </div>
                        )}
                    </div>
                    {jobs.experience && (
                        <div>
                            <p className="mb-1 text-xs text-gray-500">
                                Experience
                            </p>
                            <p className="text-sm text-gray-700">
                                {jobs.experience}
                            </p>
                        </div>
                    )}
                    {jobs.tags && (
                        <div className="flex items-start gap-3">
                            <Tags className="mt-1 h-4 w-4 shrink-0 text-gray-500" />
                            <div className="flex flex-wrap gap-2">
                                {jobs.tags.split(",").map((tag) => (
                                        <Badge
                                            key={tag.trim()}
                                            variant="secondary"
                                            className="font-normal"
                                        >
                                            {tag.trim()}
                                        </Badge>
                                    ))}
                            </div>
                        </div>
                    )}
                    <div className="flex flex-wrap items-center gap-4 border-t pt-4">
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                            <CalendarDays className="h-4 w-4" />
                            <span>
                                Applied {getPublishedTime(applications.createdAt)}
                            </span>
                        </div>
                        {jobs.expiresAt && (
                            <>
                                <span className="text-gray-300">•</span>
                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                    <CalendarDays className="h-4 w-4" />
                                    <span>
                                        Expires{" "}
                                        {getPublishedTime(jobs.expiresAt)}
                                    </span>
                                </div>
                            </>
                        )}
                    </div>
                    <div className="flex justify-end border-t pt-4">
                        <Button size="sm">
                            <Link
                                href={`/dashboard/applicant/find-jobs/${jobs.id}`}
                            >
                                View Job
                            </Link>
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default ApplicantAppliedJobCard;