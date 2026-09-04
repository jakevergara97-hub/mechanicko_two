export function toTitleCase(words){
    return words
        .trim()
        .split(" ")
        .map((c) => c[0].toUpperCase() + c.slice(1))
        .join(" ");
}