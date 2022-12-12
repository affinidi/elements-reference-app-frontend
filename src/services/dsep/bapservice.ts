import * as url from "url";
import axios from 'axios';
import { useQuery } from "@tanstack/react-query";


export type ErrorResponse = {
    name: string
    traceId: string
    message: string
    details: {
        field: string
        issue: string
        location: string
    }
}

export const useMakeQueryToBap = (operation: string, transaction_Id: string, message_id: string) => {
    const BapSearchUrl = process.env.REACT_APP_BAPSEARCHURL //|| 'https://localhost:27742/BAP'
    //console.log("env variable BapSearchUrl:     " + BapSearchUrl);
    const url = `${BapSearchUrl}/retrieve/operation=${operation}&transationid=${transaction_Id}&messageid=${message_id}`
    
    const fetchdata = async (): Promise<Job[]> => {
        const response = await axios.get(url)
        return response.data
    }

    return useQuery<Job[], ErrorResponse>(["jobs"], fetchdata);
}

export const SearchJobs =  async (locations: string[], transactionId: string) : Promise<any> => {

    const BAapSearchUrl = process.env.REACT_APP_BAPSEARCHURL
    const url = `${BAapSearchUrl}/searchdsep`
    console.log(url);
    const dataPayload = {
        locations: locations,
        transactionId: transactionId
    }
    let promise = new Promise((resolve, reject) => {
        axios.post<string>(
            url,
            dataPayload,
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            },
        ).then((data) =>{
            resolve(data);
        })
       
    })
    return promise;
   

}

export const SelectJob =  async (jobID: string, transactionId: string) : Promise<any> => {
   
        const BAapSearchUrl = process.env.REACT_APP_BAPSEARCHURL
        const url = `${BAapSearchUrl}/selectdsep`
        console.log(url);
        const dataPayload = {
            jobid: jobID,
            transactionId: transactionId
        }
        let promise = new Promise((resolve, reject) => {
            axios.post<string>(
                url,
                dataPayload,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                },
            ).then((data) =>{
                resolve(data);
            })
           
        })
        return promise;
       
    
    }

export interface result{
    messageid:string
}

export interface Address {
    "@type": string;
    name: string;
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    addressCountry: string;
    postalCode: string;
}

export interface BaseSalary {
    "@type": string;
    currency: string;
    value: Value;
}

export interface HiringOrganization {
    "@type": string;
    name: string;
    url: string;
    address: Address;
}

export interface Identifier {
    "@type": string;
    name: string;
    value: string;
}

export interface InCodeSet {
    "@type": string;
    name: string;
    dateModified: string;
    url: string;
}

export interface JobLocation {
    "@type": string;
    name: string;
    address: Address;
}

export interface OccupationalCategory {
    "@type": string;
    inCodeSet: InCodeSet;
    codeValue: string;
    name: string;
    url: string;
}

export interface Job {
    id: string;
    "@context": string;
    "@type": string;
    title: string;
    datePosted: string;
    validThrough: string;
    description: string;
    hiringOrganization: HiringOrganization;
    jobLocation: JobLocation;
    employmentType: string[];
    baseSalary: BaseSalary;
    identifier: Identifier;
    occupationalCategory: OccupationalCategory;
    responsibilities: string[];
    skills: string[];
}

export interface Value {
    "@type": string;
    minValue: number;
    maxValue: number;
    unitText: string;
}

