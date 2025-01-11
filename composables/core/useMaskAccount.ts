// ~/composables/useMaskAccount.ts
export function useMaskAccount() {
    /**
     * Masks an account number to only show the last 4 digits.
     * @param accountNumber - The account number to mask.
     * @returns The masked account number.
     */
    const maskAccount = (accountNumber: string | number): string => {
      const accountStr = String(accountNumber);
      if (accountStr.length <= 4) {
        return accountStr; // No need to mask if the length is 4 or less
      }
      const maskedPart = accountStr.slice(0, -4).replace(/\d/g, '*');
      const visiblePart = accountStr.slice(-4);
      return `${maskedPart}${visiblePart}`;
    };
  
    return { maskAccount };
  }
  