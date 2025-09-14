import { User } from "./user";

// Provider extends User with additional fields specific to service providers.
// Fields:
// - serviceRadius (required): number
// - canVisitClientHome (required): boolean
// - virtualHelpOffered (required): boolean
// - businessName (optional): string
export interface Provider extends User {
  serviceRadius: number;
  canVisitClientHome: boolean;
  virtualHelpOffered: boolean;
  businessName?: string | null;
}
