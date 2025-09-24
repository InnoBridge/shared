import { Event } from '@/models/event';
import { User } from '@/models/user';
import { Provider } from '@/models/provider';
import { EmailAddress, ProviderEmailAddress } from '@/models/email';
import { BaseAddress, Address, ProviderAddress } from '@/models/address';
import { randomUUID } from 'crypto';


const mapEventToUser = (event: Event): User => {
    const data = event.data;

    const createdAt = data.created_at ? Number(data.created_at) : Date.now();
    const updatedAt = data.updated_at ? Number(data.updated_at) : Date.now();

    const emailAddress = mapEventToEmailAddresses(event);
    const address = mapEventToAddress(event);
    const phoneNumber = mapEventToPhoneNumber(event);
    const languages = mapEventToLanguages(event);

    return {
        id: data.id as string,
        username: data.username as string | null,
        firstName: data.first_name as string | null,
        lastName: data.last_name as string | null,
        imageUrl: data.image_url as string,
        emailAddresses: emailAddress,
        phoneNumber: phoneNumber,
        languages: languages,
        address: address,
        passwordEnabled: Boolean(data.password_enabled),
        twoFactorEnabled: Boolean(data.two_factor_enabled),
        backupCodeEnabled: Boolean(data.backup_code_enabled),
        createdAt: createdAt,
        updatedAt: updatedAt
    } as User;
};

const mapEventToEmailAddresses = (event: Event): EmailAddress[] => {
    const data = event.data;
    const emailAddresses = data.email_addresses as Record<string, string>[];
    return emailAddresses.map((emailAddress) => {
        return {
            id: emailAddress.id,
            userId: data.id as string,
            emailAddress: emailAddress.email_address
        } as EmailAddress;
    });
};


const mapEventToAddress = (event: Event): Address | undefined => {
    const unsafeMetadata = event.data.unsafe_metadata;
    if (!unsafeMetadata || typeof unsafeMetadata !== 'object' || Array.isArray(unsafeMetadata)) return undefined;

    const baseAddress = (unsafeMetadata as Record<string, any>).address as BaseAddress | undefined;
    if (baseAddress) {
        return {
            id: randomUUID(),
            userId: String(event.data.id),
            ...baseAddress
        } as Address;
    }
    return undefined;
};

const mapEventToProvider = (event: Event): Provider => {
    const data = event.data;
    
    const createdAt = data.created_at ? Number(data.created_at) : Date.now();
    const updatedAt = data.updated_at ? Number(data.updated_at) : Date.now();

    const providerEmailAddress = mapEventToProviderEmailAddresses(event);
    const address = mapEventToProviderAddress(event);
    const phoneNumber = mapEventToPhoneNumber(event);
    const languages = mapEventToLanguages(event);
    const serviceRadius = mapEventToServiceRadius(event);
    const canVisitClientHome = mapEventToCanVisitClientHome(event);
    const virtualHelpOffered = mapEventToVirtualHelpOffered(event);
    const businessName = mapEventToBusinessName(event);

    return {
        id: data.id as string,
        providerName: data.username as string || null,
        firstName: data.first_name as string || null,
        lastName: data.last_name as string || null,
        imageUrl: data.image_url as string,
        emailAddresses: providerEmailAddress,
        phoneNumber: phoneNumber,
        languages: languages,
        address: address,
        passwordEnabled: Boolean(data.password_enabled),
        twoFactorEnabled: Boolean(data.two_factor_enabled),
        backupCodeEnabled: Boolean(data.backup_code_enabled),
        serviceRadius: serviceRadius,
        canVisitClientHome: canVisitClientHome,
        virtualHelpOffered: virtualHelpOffered,
        businessName: businessName,
        createdAt: createdAt,
        updatedAt: updatedAt,
    }
};

const mapEventToProviderEmailAddresses = (event: Event): ProviderEmailAddress[] => {
    const data = event.data;
    const providerEmailAddresses = data.email_addresses as Record<string, string>[];
    return providerEmailAddresses.map(ea => ({
        id: ea.id,
        providerId: data.id,
        emailAddress: ea.email_address
    } as ProviderEmailAddress));
};

const mapEventToPhoneNumber = (event: Event): string | null => {
    const unsafeMetadata = event.data.unsafe_metadata;
    if (!unsafeMetadata || typeof unsafeMetadata !== 'object' || Array.isArray(unsafeMetadata)) return null;

    const phoneNumberData = (unsafeMetadata as Record<string, any>).phoneNumber;
    return String(phoneNumberData ?? null);
};

const mapEventToLanguages = (event: Event): string[] => {
    const unsafeMetadata = event.data.unsafe_metadata;
    if (!unsafeMetadata || typeof unsafeMetadata !== 'object' || Array.isArray(unsafeMetadata)) return [];

    const raw = (unsafeMetadata as Record<string, any>).languages;
    if (!raw) return [];
    if (Array.isArray(raw)) return raw.map(String);
    if (typeof raw === 'string') {
        try {
            const parsed = JSON.parse(raw);
            return Array.isArray(parsed) ? parsed.map(String) : [String(parsed)];
        } catch {
            // fallback: accept comma-separated string like "english,mandarin"
            const trimmed = raw.trim();
            return trimmed.length ? trimmed.split(',').map(s => s.trim()).filter(Boolean) : [];
        }
    }
    return [];
};

const mapEventToProviderAddress = (event: Event): ProviderAddress | undefined => {
    const unsafeMetadata = event.data.unsafe_metadata;
    if (!unsafeMetadata || typeof unsafeMetadata !== 'object' || Array.isArray(unsafeMetadata)) return undefined;

    const baseAddress = (unsafeMetadata as Record<string, any>).address as BaseAddress | undefined;
    if (baseAddress) {
        return {
            id: randomUUID(),
            providerId: String(event.data.id),
            ...baseAddress
        } as ProviderAddress;
    }
    return undefined;
};

const mapEventToServiceRadius = (event: Event): number => {
    const unsafeMetadata = event.data.unsafe_metadata;
    if (!unsafeMetadata || typeof unsafeMetadata !== 'object' || Array.isArray(unsafeMetadata)) return 0;

    const serviceRadiusData = (unsafeMetadata as Record<string, any>).serviceRadius;
    if (!serviceRadiusData || isNaN(Number(serviceRadiusData))) {
        throw new Error('Invalid serviceRadius value');
    }
    const serviceRadius = Number(serviceRadiusData);
    if (serviceRadius < 0) {
        throw new Error('serviceRadius cannot be negative');
    }
    return serviceRadius;
};

const mapEventToCanVisitClientHome = (event: Event): boolean => {
    const unsafeMetadata = event.data.unsafe_metadata;
    if (!unsafeMetadata || typeof unsafeMetadata !== 'object' || Array.isArray(unsafeMetadata)) return false;

    const canVisitClientHomeData = (unsafeMetadata as Record<string, any>).canVisitClientHome;
    return Boolean(canVisitClientHomeData);
};

const mapEventToVirtualHelpOffered = (event: Event): boolean => {
    const unsafeMetadata = event.data.unsafe_metadata;
    if (!unsafeMetadata || typeof unsafeMetadata !== 'object' || Array.isArray(unsafeMetadata)) return false;

    const virtualHelpOfferedData = (unsafeMetadata as Record<string, any>).virtualHelpOffered;
    return Boolean(virtualHelpOfferedData);
};

const mapEventToBusinessName = (event: Event): string | undefined => {
  const unsafeMetadata = event.data.unsafe_metadata;
  if (!unsafeMetadata || typeof unsafeMetadata !== 'object' || Array.isArray(unsafeMetadata)) return undefined;

  const businessNameData = (unsafeMetadata as Record<string, any>).businessName;
  if (!businessNameData || typeof businessNameData !== 'string') return undefined;
  const trimmed = businessNameData.trim();
  return trimmed.length ? trimmed : undefined;
};

export {
    mapEventToUser,
    mapEventToEmailAddresses,
    mapEventToAddress,
    mapEventToProvider,
    mapEventToProviderEmailAddresses,
    mapEventToPhoneNumber,
    mapEventToLanguages,
    mapEventToProviderAddress,
    mapEventToServiceRadius,
    mapEventToCanVisitClientHome,
    mapEventToVirtualHelpOffered,
    mapEventToBusinessName
}