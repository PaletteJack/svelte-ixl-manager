const { randomBytes } = await import ('node:crypto')

export const downloadBlob = (blob, filename) => {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.style.display = "none";
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
}

export function arraysEqual(arr1, arr2) {
    const sorted1 = [...arr1].sort();
    const sorted2 = [...arr2].sort();
    return sorted1.length === sorted2.length && sorted1.every((val, index) => val === sorted2[index]);
}

export const generateUsername = (first, last) => {
    const id = randomBytes(2).toString('hex')
    const username = `${first[0].toLowerCase()}${last.slice(0,5).toLowerCase}${id}`;
    return username
}