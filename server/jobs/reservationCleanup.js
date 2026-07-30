import cron from "node-cron";

import Reservation from "#models/Reservation.js";

import Ticket from "#models/Ticket.js";

cron.schedule("* * * * *", async () => {

  const expiredReservations = await Reservation.find({
      status: "LOCKED",
      expiresAt: {
        $lt: new Date(),
      },
    });

  for (const reservation of expiredReservations) {

    const ticket = await Ticket.findById(reservation.ticketId);

    if (ticket) {

      ticket.availableSeats += reservation.quantity;

      await ticket.save();
    }

    reservation.status = "EXPIRED";

    await reservation.save();
  }

});