

export async function fetchData() {
    try {
        console.log("starting to fetch");
        const fetchModule = await import('node-fetch');
        const fetch = fetchModule.default;
        const response = await fetch("https://dummyjson.com/products/1");
        console.log("finished fetching");
        const data = await response.json();
        console.log("Data fetched:", data);
        return 2;
    } catch (error) {
        console.error("Failed to fetch data:", error);
        return 1;
    }
}

export function logme(num) {
    console.log(num);
}