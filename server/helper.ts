export const generateUUID = () => {
    const hash1 = Number((Math.random()*1000000).toFixed(0)).toString(16);
    const hash2 = Number((Math.random()*1000000).toFixed(0)).toString(16);
    const hash3 = Number((Math.random()*1000000).toFixed(0)).toString(16);
    return `${hash1}-${hash2}-${hash3}`;
}