export function slicer(str: string | undefined, k: number) {
  if (!str) {
    return '';
  }
  return str.length > k ? str.slice(0, k) + '...' : str;
}
