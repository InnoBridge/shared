import { User } from "@/models/user";

// Provider extends User with additional fields specific to service providers.
// Fields:
// - providerId (replaces userId): string
// - serviceRadius (required): number
// - canVisitClientHome (required): boolean
// - virtualHelpOffered (required): boolean
// - businessName (optional): string
export interface Provider extends Omit<User, 'userId'> {
  providerId: string;
  serviceRadius: number;
  canVisitClientHome: boolean;
  virtualHelpOffered: boolean;
  businessName?: string;
}
