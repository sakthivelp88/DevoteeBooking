export const buildSearch = (search) => {
  if (!search.trim()) return null;

  return {
    $match: {
      $or: [
        // Temple
        {
          "temple.name": {
            $regex: search,
            $options: "i",
          },
        },

        // Darshan Type
        {
          "darshanType.name": {
            $regex: search,
            $options: "i",
          },
        },

        // Status
        {
          status: {
            $regex: search,
            $options: "i",
          },
        },

        // Slot Start
        {
          slotStart: {
            $regex: search,
            $options: "i",
          },
        },

        // Slot End
        {
          slotEnd: {
            $regex: search,
            $options: "i",
          },
        },

        // Date
        {
          $expr: {
            $regexMatch: {
              input: {
                $dateToString: {
                  format: "%Y-%m-%d",
                  date: "$date",
                },
              },
              regex: search,
              options: "i",
            },
          },
        },

        // Price
        {
          $expr: {
            $regexMatch: {
              input: { $toString: "$price" },
              regex: search,
              options: "i",
            },
          },
        },

        // Total Seats
        {
          $expr: {
            $regexMatch: {
              input: { $toString: "$totalSeats" },
              regex: search,
              options: "i",
            },
          },
        },

        // Available Seats
        {
          $expr: {
            $regexMatch: {
              input: { $toString: "$availableSeats" },
              regex: search,
              options: "i",
            },
          },
        },
      ],
    },
  };
};