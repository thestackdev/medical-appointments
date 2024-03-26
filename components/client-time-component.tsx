"use client";

import moment from "moment";

export default function ClientTimeComponent({
  appointmentDate,
}: {
  appointmentDate: Date;
}) {
  return (
    <div>
      <h2 className="text-lg font-bold">Time</h2>
      <p>{moment(appointmentDate).format("hh:mm A")}</p>
    </div>
  );
}
