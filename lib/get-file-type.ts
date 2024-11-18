export type fileType = 'image'|'pdf'|'unknown';

export const getFileType = async (signedUrl: string): Promise<fileType> => {
    const response = await fetch(signedUrl, { method: 'HEAD' });
    const contentType = response.headers.get('Content-Type');

    if (contentType?.startsWith('image/')) {
        return 'image';
    } else if (contentType?.startsWith('application/pdf')) {
        return 'pdf';
    } else {
        return 'unknown';
    }
}