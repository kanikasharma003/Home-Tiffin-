const INQUIRY_KEY = "tiffin_inquiries";

// Get all inquiries
export const getInquiries = () => {
  try {
    const data = localStorage.getItem(INQUIRY_KEY);

    if (!data) {
      return [];
    }

    return JSON.parse(data);
  } catch (error) {
    console.error("Error loading inquiries:", error);
    return [];
  }
};


// Save inquiries
export const saveInquiries = (inquiries) => {
  localStorage.setItem(
    INQUIRY_KEY,
    JSON.stringify(inquiries)
  );
};


// Add new inquiry
export const addInquiry = (inquiry) => {
  const oldInquiries = getInquiries();

  const newInquiry = {
    id: `INQ-${Date.now().toString().slice(-6)}`,

    customerId: `CUS-${Date.now().toString().slice(-6)}`,

    fullName: inquiry.fullName,

    email: inquiry.email,

    phone: inquiry.phone || "",

    type: inquiry.type || "General Query",

    message: inquiry.message,

    status: "New",

    receivedAt: new Date().toISOString(),

    customerSince: "N/A",
  };

  const updatedInquiries = [
    newInquiry,
    ...oldInquiries,
  ];

  saveInquiries(updatedInquiries);

  return newInquiry;
};


// Update inquiry
export const updateInquiry = (id, data) => {
  const inquiries = getInquiries();

  const updated = inquiries.map((item) => {
    if (item.id === id) {
      return {
        ...item,
        ...data,
      };
    }

    return item;
  });

  saveInquiries(updated);

  return updated;
};


// Delete inquiry
export const deleteInquiry = (id) => {
  const inquiries = getInquiries();

  const updated = inquiries.filter(
    (item) => item.id !== id
  );

  saveInquiries(updated);

  return updated;
};