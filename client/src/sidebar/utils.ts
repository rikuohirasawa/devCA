export const decodeTechnologyName = (technology: string) => {
    let decoded: string = decodeURIComponent(technology);
    if (decoded.toLowerCase().includes('developer')) {
        decoded = decoded.replace('developer', '');
    } else if (decoded.toLowerCase().includes('language')) {
        decoded = decoded.replace('language', '');
    };
    return decoded.charAt(0).toUpperCase() + decoded.slice(1);
}