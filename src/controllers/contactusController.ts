import { Request, Response } from "express";
import { ContactFormData } from "./../types/contactus";
import { contactus, getContactQuote } from "./../services/contactUsService";

export const contactUs = async (req: Request, res: Response) => {
  const {
    firstName,
    lastName,
    email,
    phoneNumber,
    reason,
    message,
  }: ContactFormData = req.body;

  const data = {
    firstName,
    lastName,
    email,
    phoneNumber,
    reason,
    message,
  };

  try {
    const response = await contactus(data);

    const { id, createdAt, ...responseToSend } = response;

    res.status(200).json({
      data: [responseToSend],
      success: true,
      message: "Form submitted!",
    });
  } catch (error: any) {
    console.error("Error logging in user:", error);
    res.status(401).json({
      success: false,
      message: "Failed to Submit",
      error: error.message,
    });
  }
};

export const getContactUs = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const contactQuote = await getContactQuote();

    // Check if the contactQuote is empty or null
    if (
      !contactQuote?.contactQuote ||
      contactQuote?.contactQuote?.length === 0
    ) {
      res.status(200).json({
        success: true,
        message: "No contact quotes found",
        data: {
          totalContactQuote: contactQuote?.totalContactQuote,
          searchContactQuote: contactQuote?.searchContactQuote,
          contactQuote: [],
        },
      });
      return;
    }

    const sanitizedContactQuote = await Promise.all(
      contactQuote?.contactQuote?.map(async (contactQuote: any) => {
        const { id, createdAt, ...contactQuoteToSend } = contactQuote;

        return {
          ...contactQuoteToSend,
        };
      })
    );

    // If contactQuote is not empty, return the quotes
    res.status(200).json({
      success: true,
      message: "Contact Quotes fetched successfully",
      data: {
        totalContactQuote: contactQuote?.totalContactQuote,
        searchContactQuote: contactQuote?.searchContactQuote,
        contactQuote: sanitizedContactQuote,
      },
    });
  } catch (error: any) {
    console.error("Error fetching contact quotes:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch contact",
      error: error.message,
    });
  }
};
