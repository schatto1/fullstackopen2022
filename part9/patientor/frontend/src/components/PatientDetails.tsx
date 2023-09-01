import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Female, Male, Transgender, LocalHospital, Work, Vaccines } from '@mui/icons-material';

import { apiBaseUrl } from "../constants";
import { Patient, Gender, Entry, Diagnosis, HospitalEntry, OccupationalHealthcareEntry, HealthCheckEntry } from "../types";

import patientService from "../services/patients";
import diagnosesService from "../services/diagnoses"

const assertNever = (x: never) => {
  throw new Error("Unexpected object: " + x);
}

const HospitalEntryDetails: React.FC<{ entry: HospitalEntry, diagnoses: Diagnosis[] }> = ({ entry, diagnoses }) => {
  return (
    <div>
      <p>Date: {entry.date} <LocalHospital /></p>
      <p>Description: {entry.description}</p>
      <p>Discharge date: {entry.discharge.date}</p>
      <p>Discharge criteria: {entry.discharge.date}</p>
      <ul>
        Diagnoses
        {entry.diagnosisCodes?.map((code: string) => (
          <li key={code}>
            <span>{code}: </span>
            <span>{diagnoses.filter((diagnosis) => diagnosis.code === code)[0].name}</span>
          </li>
        ))}
      </ul>
      <hr/>
    </div>
  )
}

const OccupationalHealthcareEntryDetails: React.FC<{ entry: OccupationalHealthcareEntry, diagnoses: Diagnosis[] }> = ({ entry, diagnoses }) => {
  return (
    <div>
      <p>Date: {entry.date} <Work /></p>
      <p>Description: {entry.description}</p>
      <p>Employer: {entry.employerName}</p>
      {entry.sickLeave
        ? <p>Sick leave: {entry.sickLeave.startDate} to {entry.sickLeave.endDate}</p>
        : ''
      }
      <ul>
        Diagnoses
        {entry.diagnosisCodes?.map((code: string) => (
          <li key={code}>
            <span>{code}: </span>
            <span>{diagnoses.filter((diagnosis) => diagnosis.code === code)[0].name}</span>
          </li>
        ))}
      </ul>
      <hr/>
    </div>
  )
}

const HealthCheckEntryDetails: React.FC<{ entry: HealthCheckEntry, diagnoses: Diagnosis[] }> = ({ entry, diagnoses }) => {
  return (
    <div>
      <p>Date: {entry.date} <Vaccines /></p>
      <p>Description: {entry.description}</p>
      <p>Health check rating: {entry.healthCheckRating}</p>
      <ul>
        Diagnoses
        {entry.diagnosisCodes?.map((code: string) => (
          <li key={code}>
            <span>{code}: </span>
            <span>{diagnoses.filter((diagnosis) => diagnosis.code === code)[0].name}</span>
          </li>
        ))}
      </ul>
      <hr/>
    </div>
  )
}

const EntryDetails: React.FC<{ entry: Entry, diagnoses: Diagnosis[] }> = ({ entry, diagnoses }) => {
  switch (entry.type) {
    case "Hospital":
      return <HospitalEntryDetails entry={entry} diagnoses={diagnoses}/>
    case "OccupationalHealthcare":
      return <OccupationalHealthcareEntryDetails entry={entry} diagnoses={diagnoses}/>
    case "HealthCheck":
      return <HealthCheckEntryDetails entry={entry} diagnoses={diagnoses}/>
    default:
      return assertNever(entry);
  }
}

const PatientDetails = () => {
  const [patient, setPatient] = useState<Patient>();
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>();

  console.log("patient", patient)

  const { id } = useParams();

  useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchAllDiagnoses = async () => {
      const diagnoses = await diagnosesService.getAll();
      setDiagnoses(diagnoses);
    };
    void fetchAllDiagnoses();
  }, []);

  useEffect(() => {
    if (id) {
      void axios.get<void>(`${apiBaseUrl}/ping`);

      const fetchPatientDetail = async () => {
        const patient = await patientService.getPatient(id);
        setPatient(patient);
      };
      void fetchPatientDetail();
    }
  }, [id]);

  if (!patient || !diagnoses) {
    return null;
  }

  console.log("diagnoses", diagnoses)

  return (
    <div>
      <h1>
        {patient.name}&nbsp;
        {patient.gender === Gender.Male ? <Male /> : ''}
        {patient.gender === Gender.Female ? <Female /> : ''}
        {patient.gender === Gender.Other ? <Transgender /> : ''}
      </h1>
      <p>ssn: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>
      <h2>entries</h2>
      {patient.entries.map((entry: Entry) => (
        <EntryDetails entry={entry} diagnoses={diagnoses} />
      ))}
    </div>
  );

}

export default PatientDetails;