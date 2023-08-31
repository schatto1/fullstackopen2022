import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Female, Male, Transgender } from '@mui/icons-material';

import { apiBaseUrl } from "../constants";
import { Patient, Gender, Entry, Diagnosis } from "../types";

import patientService from "../services/patients";
import diagnosesService from "../services/diagnoses"

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
        {patient.gender === Gender.Male ? <Male></Male> : ''}
        {patient.gender === Gender.Female ? <Female></Female> : ''}
        {patient.gender === Gender.Other ? <Transgender></Transgender> : ''}
      </h1>
      <p>ssn: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>
      <h2>entries</h2>
      {patient.entries.map((entry: Entry) => (
        <div key={entry.id}>
          <p>{entry.date} {entry.description}</p>
          <ul>
            {entry.diagnosisCodes?.map((code: string) => (
              <li key={code}>
                <span>{code}: </span>
                <span>{diagnoses.filter((diagnosis) => diagnosis.code === code)[0].name}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );

}

export default PatientDetails;