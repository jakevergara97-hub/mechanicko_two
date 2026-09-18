export function toTitleCase(word){
    return word
        .trim()
        .split(" ")
        .map((c) => c[0].toUpperCase() + c.slice(1))
        .join(" ");
}