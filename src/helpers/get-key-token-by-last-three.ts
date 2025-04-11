export const getKeyTokenByLastThree = (tokenStore: string): string | null => {
  const lastThree = tokenStore?.slice(-3);
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);

    if (key?.endsWith(lastThree!)) {
      return key;
    }
  }
  return null;
};
