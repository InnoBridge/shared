import { ProviderEmailAddress } from "@/models/email";
import { ProviderAddress } from "@/models/address";

interface User {
  id: string;
  providername: string | null;
  firstName: string | null;
  lastName: string | null;
  imageUrl: string | null;
  emailAddresses: ProviderEmailAddress[];
  phoneNumber: string | null;
  languages: string[];
  address?: ProviderAddress;
  passwordEnabled: boolean;
  twoFactorEnabled: boolean;
  backupCodeEnabled: boolean;
  createdAt: number;
  updatedAt: number;
};

export {
    User
};