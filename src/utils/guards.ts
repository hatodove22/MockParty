export const blockedPurpose = 'Request production development';

export function canAdvancePurpose(purpose: string) {
  return purpose !== blockedPurpose;
}
