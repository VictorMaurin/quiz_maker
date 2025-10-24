export const shuffle = (array: Array<string>) => {
    const newArray = [...array];
    let currentIndex = newArray.length;
    while (currentIndex != 0) {

        const randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [newArray[currentIndex], newArray[randomIndex]] = [
        newArray[randomIndex], newArray[currentIndex]];
    }
    return newArray;
}