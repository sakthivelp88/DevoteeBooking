export const validateBooking = (contact, devotees) => {
  if (!contact.mobile.trim()) {
    return "Mobile number is required.";
  }

  if (!contact.email.trim()) {
    return "Email address is required.";
  }

  if (!contact.address.trim()) {
    return "Address is required.";
  }

  for (let i = 0; i < devotees.length; i++) {
    const devotee = devotees[i];

    if (!devotee.name.trim()) {
      return `Please enter the name for Devotee ${i + 1}.`;
    }

    if (!devotee.age || Number(devotee.age) <= 0) {
      return `Please enter a valid age for Devotee ${i + 1}.`;
    }

    if (!devotee.gender) {
      return `Please select the gender for Devotee ${i + 1}.`;
    }
  }

  return null;
};