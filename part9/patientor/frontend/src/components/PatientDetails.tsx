import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Female, Male, Transgender } from '@mui/icons-material';

import { apiBaseUrl } from "../constants";
import { Patient, Gender } from "../types";

import patientService from "../services/patients";

const PatientDetails = () => {
  const [patient, setPatient] = useState<Patient>();

  const { id } = useParams();

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

  if (!patient) {
    return null;
  }

  return (
    <div>
      <h2>{patient.name}</h2>
      {patient.gender === Gender.Male ? <Male></Male> : ''}
      {patient.gender === Gender.Female ? <Female></Female> : ''}
      {patient.gender === Gender.Other ? <Transgender></Transgender> : ''}
      <p>ssn: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>
    </div>
  );

}

export default PatientDetails;