import { generateUUID } from "../../../utils/generateUUID";

type AppointmentProps = {
  patientId: string;
  doctorId: string;
  date: Date;
};

export class Appointment {
  patientId: string;
  doctorId: string;
  id?: string;
  date: Date;
  note?: string;
  idFinished?: boolean;

  private constructor(props: AppointmentProps) {
    this.id = generateUUID();
    this.patientId = props.patientId;
    this.doctorId = props.doctorId;
    this.date = props.date;
  }

  static create(data: AppointmentProps) {
    const appointment = new Appointment(data);
    return appointment;
  }
}
