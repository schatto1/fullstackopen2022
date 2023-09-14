/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NewPatient, Gender, Entry, HealthCheckEntry, OccupationalHealthcareEntry, HospitalEntry, EntryType, HealthCheckRating, SickLeave, Discharge, Diagnosis } from './types';

import { v1 as uuid } from 'uuid';

export const toNewPatient = (object: unknown): NewPatient => {
  if ( !object || typeof object !== 'object' ) {
    throw new Error('Incorrect or missing data');
  }

  if ('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object)  {
    const newPatient: NewPatient = {
      name: parseString(object.name),
      dateOfBirth: parseDate(object.dateOfBirth),
      ssn: parseString(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseString(object.occupation),
      entries: []
    };
  
    return newPatient;
  }

  throw new Error('Incorrect data: some fields are missing');
};

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseString = (text: unknown): string => {
  if (!text || !isString(text)) {
    throw new Error('Incorrect or missing text');
  }

  return text;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
      throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender).map(v => v.toString()).includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
      throw new Error('Incorrect gender: ' + gender);
  }
  return gender;
};

const isEntryType = (param: any): param is EntryType => {
  return Object.values(EntryType).includes(param);
};

const parseEntryType = (entryType: any): EntryType => {
  if (!entryType || !isEntryType(entryType)) {
    throw new Error(
      "Entry type missing or incorrect format" + `${entryType as string}`
    );
  }
  return entryType;
};

const isRating = (param: any): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param);
};

const parseRating = (rating: any): HealthCheckRating => {
  if (!rating || !isRating(rating)) {
    throw new Error(
      "HealthCheckRating missing or incorrect value" + `${rating as string}`
    );
  }
  return rating;
};

const parseSickLeave = (leave: any): SickLeave | undefined => {
  if (leave) {
    if (
      !isString(leave.startDate) ||
      !isString(leave.endDate) ||
      !isDate(leave.startDate) ||
      !isDate(leave.endDate)
    ) {
      throw new Error(
        "Provided sick leave is missing a value or has the wrong format." +
          `${leave.startDate as string} ${leave.endDate as string}`
      );
    } else {
      return { startDate: leave.startDate, endDate: leave.endDate };
    }
  } else {
    return undefined;
  }
};

const parseDischarge = (discharge: any): Discharge => {
  if (!discharge) {
    throw new Error("Discharge mus be provided.");
  }
  if (
    !discharge.date ||
    !discharge.criteria ||
    !isString(discharge.date) ||
    !isDate(discharge.date) ||
    !isString(discharge.criteria)
  ) {
    throw new Error(
      "Discharge must have both a date and a criteria. Both must be valid." +
        `${discharge.date as string} ${discharge.criteria}`
    );
  }
  return { date: discharge.date, criteria: discharge.criteria };
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> =>  {
  if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
    // we will just trust the data to be in correct form
    return [] as Array<Diagnosis['code']>;
  }

  return object.diagnosisCodes as Array<Diagnosis['code']>;
};

export const toNewEntry = (object: any): Entry => {
  const baseEntry = {
    description: parseString(object.description),
    date: parseDate(object.date),
    specialist: parseString(object.specialist),
    type: parseEntryType(object.type),
    diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
  };
  switch (object.type) {
    case "HealthCheck":
      const newHealthCheck: HealthCheckEntry = {
        ...baseEntry,
        id: String(uuid()),
        type: "HealthCheck",
        healthCheckRating: parseRating(object.healthCheckRating),
      };
      return newHealthCheck;
    case "OccupationalHealthcare":
      const newOccupationalEntry: OccupationalHealthcareEntry = {
        ...baseEntry,
        id: String(uuid()),
        type: "OccupationalHealthcare",
        employerName: parseString(object.employer),
        sickLeave: parseSickLeave(object.sickLeave),
      };
      return newOccupationalEntry;
    case "Hospital":
      const newHospitalEntry: HospitalEntry = {
        ...baseEntry,
        id: String(uuid()),
        type: "Hospital",
        discharge: parseDischarge(object.discharge),
      };
      return newHospitalEntry;
    default:
      throw new Error("Please provide a valid entry type");
  }
};