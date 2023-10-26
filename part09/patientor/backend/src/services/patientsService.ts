import patients from '../../data/patients';

import { Patient, NonSensitivePatient, NewPatient, Entry, NewEntry } from '../types';

import { v1 as uuid } from 'uuid';

const getPatients = () : Patient[] => {
  return patients;
};

const findPatientById = (id: string): Patient | undefined => {
  const patient = patients.find(d => d.id === id);
  return patient;
};

const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
    entries
  }));
};

const addPatient = ( patient: NewPatient ): Patient => {
  const newPatient = {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    id: String(uuid()),
    ...patient
  };

  patients.push(newPatient);
  return newPatient;
};

const addEntry = ( id: string, entry: NewEntry ): Entry => {

  const patientIndex = patients.findIndex(d => d.id ===id);

  if (patientIndex === -1) {
    throw new Error("Patient does not exist");
  }

  const newEntry = {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    id: String(uuid()),
    ...entry
  };

  patients[patientIndex].entries.push(newEntry);
  return newEntry;
};

export default {
  getPatients,
  getNonSensitivePatients,
  addPatient,
  findPatientById,
  addEntry
};