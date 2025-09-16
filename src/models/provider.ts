import { User } from "@/models/user";
import { ProviderEmailAddress } from "@/models/email";
import { ProviderAddress } from "@/models/address";

// Provider extends User with additional fields specific to service providers.
// Fields:
// - providerId (replaces userId): string
// - serviceRadius (required): number
// - canVisitClientHome (required): boolean
// - virtualHelpOffered (required): boolean
// - businessName (optional): string
export interface Provider extends Omit<User, 
  'username'
  | 'emailAddresses'
  | 'address'
  > {
  providerName: string | null;
  emailAddresses: ProviderEmailAddress[];
  address?: ProviderAddress;
  serviceRadius: number;
  canVisitClientHome: boolean;
  virtualHelpOffered: boolean;
  businessName?: string;
}
