export function truncate(str: string, len: number): string {
  return str.length > len ? str.slice(0, len - 1) + '…' : str
}
