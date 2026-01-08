import { IMailProvider } from "../../../../infra/providers/mail/mail.proviider";
import { formatDate } from "../../../../utils/date";
import { IAppointmentRepository } from "../../repositories/appointment.repository";

export class CreateNotificationAppointmentUseCase {
  constructor(
    private appointmentRepository: IAppointmentRepository,
    private mailProvider: IMailProvider
  ) {}

  async execute() {
    const appointments =
      await this.appointmentRepository.findAllTodayIncludePatients();
    appointments.forEach(async (appointment) => {
      const emailPatient = appointment.patient.email;
      const date = appointment.date;

      await this.mailProvider.sendMail({
        to: emailPatient,
        from: "Agendamento de Consulta <noreplay@agendamedico.com.br>",
        html: `Olá! <br/>
        não se esqueça da sua consulta hoje às ${formatDate(date, "HH:mm")}`,
        subject: "Lembrete de agendamento de consulta.",
      });
    });
    return appointments;
  }
}
