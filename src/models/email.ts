interface EmailAddress {
  id: string;
  userId?: string; 
  emailAddress: string;
};

interface ProviderEmailAddress extends Omit<EmailAddress, 'userId'> {
  providerId?: string;
}

export {
    EmailAddress,
    ProviderEmailAddress
};