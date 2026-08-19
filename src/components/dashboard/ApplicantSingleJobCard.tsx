"use client";
import { type SingleApplicantJob } from "@/app/dashboard/applicant/ApplicantJobDataAction";
import {
    ArrowLeft, Banknote, BriefcaseBusiness, Building2, CalendarDays, GraduationCap, Globe, MapPin, Users,
} from "lucide-react";
import React, { useState } from "react";
import ApplyNowPopupForm from "./ApplyNowPopupForm";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { currencySymbols } from "@/drizzle/table_schema/jobsTableSchema";

interface InfoItemType{
    icon: React.ReactNode;
    label: string;
    value: string;
    capitalize?: boolean;
}

const InfoItem = ({icon,label,value,capitalize = false,}:InfoItemType) => {
    return (
        <div className="flex items-start gap-3">
            <div className="mt-0.5 text-gray-500">{icon}</div>
            <div>
                <p className="text-xs text-gray-500">{label}</p>
                <p className={`text-sm font-medium text-gray-900 ${capitalize ? "capitalize" : "" }`}>
                    {value}
                </p>
            </div>
        </div>
    );
};

const ApplicantSingleJobCard = ({job,jobApplicationData}:{job:SingleApplicantJob,jobApplicationData:any}) => {
    const currency = currencySymbols[job.salaryCurrency ?? "INR"];
    const [showForm,setShowForm] = useState(false);
    const toggleForm = () => setShowForm(old => !old);
    return (
        <div className="mx-auto max-w-6xl space-y-6">
            <Button variant="ghost" className="px-0">
                <Link href="/dashboard/applicant/find-jobs">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                </Link>
            </Button>
            <Card>
                <CardContent className="p-6">
                    <div className="flex flex-col justify-between gap-5 md:flex-row">
                        <div>
                            <div className="mb-3 flex flex-wrap gap-2">
                                {job.workType && (
                                    <Badge variant="outline" className="capitalize">{job.workType}</Badge>
                                )}
                                {job.jobType && (
                                    <Badge variant="outline" className="capitalize">{job.jobType}</Badge>
                                )}
                                {job.jobLevel && (
                                    <Badge variant="outline" className="capitalize">{job.jobLevel}</Badge>
                                )}
                            </div>
                            <h1 className="text-2xl font-bold md:text-3xl">{job.title}</h1>
                            {job.companyName && (
                                <p className="mt-2 flex items-center gap-2 text-gray-600">
                                    <Building2 className="h-4 w-4" /> {job.companyName}
                                </p>
                            )}
                        </div>
                        {jobApplicationData?.data ? (
                            <Button disabled={true} size="lg">Already Applied</Button>
                        ) : (
                            <Button onClick={toggleForm} size="lg">Apply Now</Button>
                        )}
                    </div>
                </CardContent>
            </Card>
            <div className="grid gap-6 lg:grid-cols-3">
                <div className="space-y-6 lg:col-span-2">
                    <Card>
                        <CardHeader><CardTitle>Job Overview</CardTitle></CardHeader>
                        <CardContent className="grid gap-5 sm:grid-cols-2">
                            {job.location && (
                                <InfoItem
                                    icon={<MapPin className="h-5 w-5" />}
                                    label="Location"
                                    value={job.location}
                                />
                            )}
                            {job.jobType && (
                                <InfoItem
                                    icon={<BriefcaseBusiness className="h-5 w-5" />}
                                    label="Job Type"
                                    value={job.jobType}
                                    capitalize
                                />
                            )}
                            {job.workType && (
                                <InfoItem
                                    icon={<BriefcaseBusiness className="h-5 w-5" />}
                                    label="Work Type"
                                    value={job.workType}
                                    capitalize
                                />
                            )}
                            {job.jobLevel && (
                                <InfoItem
                                    icon={<GraduationCap className="h-5 w-5" />}
                                    label="Job Level"
                                    value={job.jobLevel}
                                    capitalize
                                />
                            )}
                            {(job.minSalary !== null && job.maxSalary !== null) && (
                                <InfoItem
                                    icon={<Banknote className="h-5 w-5" />}
                                    label="Salary"
                                    value={`${currency} ${
                                        job.minSalary?.toLocaleString() ?? "0"
                                    } - ${currency} ${
                                        job.maxSalary?.toLocaleString() ?? "0"
                                    }${
                                        job.salaryPeriod ? ` / ${job.salaryPeriod}` : ""
                                    }`}
                                />
                            )}
                            {job.minEducation && (
                                <InfoItem
                                    icon={<GraduationCap className="h-5 w-5" />}
                                    label="Education"
                                    value={job.minEducation}
                                    capitalize
                                />
                            )}
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader><CardTitle>Job Description</CardTitle></CardHeader>
                        <CardContent>
                            <div className="whitespace-pre-line text-sm leading-7 text-gray-600">
                                {job.description}
                            </div>
                        </CardContent>
                    </Card>
                    {job.experience && (
                        <Card>
                            <CardHeader><CardTitle>Experience Required</CardTitle></CardHeader>
                            <CardContent>
                                <p className="whitespace-pre-line text-sm leading-7 text-gray-600">
                                    {job.experience}
                                </p>
                            </CardContent>
                        </Card>
                    )}
                    {job.tags && (
                        <Card>
                            <CardHeader><CardTitle>Skills & Tags</CardTitle></CardHeader>
                            <CardContent>
                                <div className="flex flex-wrap gap-2">
                                    {job.tags.split(",").map((tag) => (
                                            <Badge key={tag} variant="secondary">
                                                {tag.trim()}
                                            </Badge>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </div>
                <div className="space-y-6">
                    <Card>
                        <CardHeader><CardTitle>About the Company</CardTitle></CardHeader>
                        <CardContent className="space-y-5">
                            <div className="flex items-center gap-4">
                                {job.avatarUrl ? (
                                    <img
                                        src={job.avatarUrl}
                                        alt={job.companyName ?? "Company"}
                                        className="h-14 w-14 rounded-lg object-cover"
                                    />
                                ) : (
                                    <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-gray-100">
                                        <Building2 className="h-6 w-6 text-gray-500" />
                                    </div>
                                )}
                                <div>
                                    <h3 className="font-semibold">
                                        {job.companyName}
                                    </h3>
                                    {job.organizationType && (
                                        <p className="text-sm capitalize text-gray-500">
                                            {job.organizationType}
                                        </p>
                                    )}
                                </div>
                            </div>
                            {job.employerDesc && (
                                <p className="whitespace-pre-line text-sm leading-6 text-gray-600">
                                    {job.employerDesc}
                                </p>
                            )}
                            <div className="space-y-4 border-t pt-4">
                                {job.employerLocation && (
                                    <InfoItem
                                        icon={<MapPin className="h-4 w-4" />}
                                        label="Location"
                                        value={job.employerLocation}
                                    />
                                )}
                                {job.teamSize && (
                                    <InfoItem
                                        icon={<Users className="h-4 w-4" />}
                                        label="Team Size"
                                        value={job.teamSize}
                                    />
                                )}
                                {job.yearOfEstablishment && (
                                    <InfoItem
                                        icon={<CalendarDays className="h-4 w-4" />}
                                        label="Established"
                                        value={String(
                                            job.yearOfEstablishment
                                        )}
                                    />
                                )}
                                {job.websiteUrl && (
                                    <div className="flex items-center gap-3">
                                        <Globe className="h-4 w-4 text-gray-500" />
                                        <a
                                            href={job.websiteUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-sm text-blue-600 hover:underline"
                                        >
                                            Visit Website
                                        </a>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-5">
                            {jobApplicationData?.data ? (
                                <Button disabled={true} size="lg">Already Applied</Button>
                            ) : (
                                <Button onClick={toggleForm} className="w-full" size="lg">Apply for this Job</Button>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
            {showForm && <ApplyNowPopupForm toggleForm={toggleForm} jobId={job.id} />}
        </div>
    )
}

export default ApplicantSingleJobCard;