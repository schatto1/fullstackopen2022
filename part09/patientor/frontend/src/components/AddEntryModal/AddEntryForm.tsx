import { useState, SyntheticEvent } from "react";

import {  TextField, InputLabel, MenuItem, Select, Grid, Button, SelectChangeEvent } from '@mui/material';

import { EntryWithoutId, Diagnosis, EntryType, HealthCheckRating } from "../../types";

interface Props {
  onCancel: () => void;
  onSubmit: (values: EntryWithoutId) => void;
  diagnoses: Diagnosis[];
}

interface EntryOptions {
  value: EntryType;
  label: string;
}

interface HealthCheckRatingOptions {
  value: HealthCheckRating;
  label: number;
}

const entryOptions: EntryOptions[] = Object.values(EntryType).map(v => ({
  value: v, label: v.toString()
}));

const healthCheckRatingOptions: HealthCheckRatingOptions[] = Object.values(HealthCheckRating).map(v => ({
  value: v, label: Number(v)
}));

const AddEntryForm = ({ onCancel, onSubmit, diagnoses }: Props) => {
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [diagnosisCodes, setDiagnosisCodes] = useState<Diagnosis[]>([]);
  const [type, setType] = useState<EntryType>(EntryType.HealthCheck);
  const [healthCheckRating, setHealthCheckRating] = useState(HealthCheckRating.Healthy);
  const [dischargeDate, setDischargeDate] = useState('');
  const [dischargeCriteria, setDischargeCriteria] = useState('');
  const [employerName, setEmployerName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const additionalFields = (type: EntryType) => {
    switch (type) {
      case "HealthCheck":
        return (
          <>
            <InputLabel style={{ marginTop: 20 }}>Health Check Rating</InputLabel>
            <Select
              label="HealthCheckRating"
              fullWidth
              value={healthCheckRating}
              onChange={onHealthCheckRatingChange}
            >
            {healthCheckRatingOptions.map(option =>
              <MenuItem
                key={option.label}
                value={option.value}
              >
                {option.label
              }</MenuItem>
            )}
            </Select>
          </>
        );
      case "Hospital":
        return (
          <>
            <TextField
              label="Discharge date"
              placeholder="YYYY-MM-DD"
              fullWidth
              value={dischargeDate}
              type='date'
              InputLabelProps={{ shrink: true }}
              onChange={({ target }) => setDischargeDate(target.value)}
            />
            <TextField
              label="Discharge criteria"
              placeholder="Criteria for discharge"
              fullWidth
              value={dischargeCriteria}
              onChange={({ target }) => setDischargeCriteria(target.value)}
            />
          </>
        );
      case "OccupationalHealthcare":
        return (
          <>
            <TextField
              label="Employer"
              placeholder="Employer's name"
              fullWidth
              value={employerName}
              onChange={({ target }) => setEmployerName(target.value)}
            />
            <TextField
              label="Sick leave start"
              name="sickLeave.startDate"
              fullWidth
              value={startDate}
              type='date'
              InputLabelProps={{ shrink: true }}
              onChange={({ target }) => setStartDate(target.value)}
            />
            <TextField
              label="Sick leave end"
              name="sickLeave.endDate"
              fullWidth
              value={endDate}
              type='date'
              InputLabelProps={{ shrink: true }}
              onChange={({ target }) => setEndDate(target.value)}
            />
          </>
        );
      default:
        break;
    }
  };

  const onTypeChange = (event: SelectChangeEvent<string>) => {
    event.preventDefault();
    if ( typeof event.target.value === "string") {
      const value = event.target.value;
      const type = Object.values(EntryType).find(g => g.toString() === value);
      if (type) {
        setType(type);
      }
    }
  };

  const onHealthCheckRatingChange = (event: SelectChangeEvent<string>) => {
    event.preventDefault();
    if ( typeof event.target.value === "string") {
      const value = event.target.value;
      const healthCheckRating = Object.values(HealthCheckRating).find(g => g.toString() === value);
      if (healthCheckRating) {
        setHealthCheckRating(healthCheckRating);
      }
    }
  };

  const onDiagnosisChange = (event: SelectChangeEvent<typeof diagnosisCodes>) => {
    const {
      target: { value },
    } = event;
    if (typeof value !== "string" ) {
      setDiagnosisCodes(
        value
        // On autofill we get a stringified value.
        // typeof value === 'string' ? value.split(',') : value,
      );
    } 
  };

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();
    switch (type) {
      case "HealthCheck":
        onSubmit({
          description,
          date,
          specialist,
          diagnosisCodes,
          healthCheckRating
        });
        break;
      case "Hospital":
        const discharge = {
          date: dischargeDate,
          criteria: dischargeCriteria
        }
        onSubmit({
          description,
          date,
          specialist,
          diagnosisCodes,
          discharge
        });
        break;
      case "OccupationalHealthcare":
        const sickLeave = {
          startDate: startDate,
          endDate: endDate
        }
        onSubmit({
          description,
          date,
          specialist,
          diagnosisCodes,
          employerName,
          sickLeave
        });
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <form onSubmit={addEntry}>
        <TextField
          label="Description"
          fullWidth 
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />
        <TextField
          label="Date"
          placeholder="YYYY-MM-DD"
          fullWidth
          value={date}
          type='date'
          InputLabelProps={{ shrink: true }}
          onChange={({ target }) => setDate(target.value)}
        />
        <TextField
          label="Specialist"
          fullWidth
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
        />
        {/* <TextField
          label="Diagnosis codes"
          fullWidth
          value={diagnosisCodes}
          onChange={({ target }) => setDiagnosisCodes(target.value)}
        /> */}

        <InputLabel style={{ marginTop: 20 }}>Diagnosis codes</InputLabel>
        <Select
          multiple
          label="Diagnosis codes"
          fullWidth
          value={diagnosisCodes}
          onChange={onDiagnosisChange}
        >
        {diagnoses.map(diagnosis =>
          <MenuItem
            key={diagnosis.code}
            value={diagnosis.name}
          >
            {diagnosis.code}, {diagnosis.name}</MenuItem>
        )}
        </Select>
        <InputLabel style={{ marginTop: 20 }}>Entry Type</InputLabel>
        <Select
          label="EntryType"
          fullWidth
          value={type}
          onChange={onTypeChange}
        >
        {entryOptions.map(option =>
          <MenuItem
            key={option.label}
            value={option.value}
          >
            {option.label
          }</MenuItem>
        )}
        </Select>
        {additionalFields(type)}
        <Grid>
          <Grid item>
            <Button
              color="secondary"
              variant="contained"
              style={{ float: "left" }}
              type="button"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button
              style={{
                float: "right",
              }}
              type="submit"
              variant="contained"
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default AddEntryForm;