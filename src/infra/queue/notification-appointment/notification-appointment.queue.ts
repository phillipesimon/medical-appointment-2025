import * as fastq from "fastq";
import type { queueAsPromised } from "fastq";
import {
  notificationAppointmentWorker,
  NotificationTask,
} from "./notification-appointment.worker";

const queueAppointmentNotification: fastq.queueAsPromised<NotificationTask> =
  fastq.promise(notificationAppointmentWorker, 1);

export { queueAppointmentNotification };
