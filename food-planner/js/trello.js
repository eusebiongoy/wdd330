const API_KEY = "YOUR_TRELLO_API_KEY";
const TOKEN = "YOUR_TRELLO_TOKEN";
const LIST_ID = "YOUR_LIST_ID";

/**
 * Create a Trello card
 */
export async function createCard(title, description) {
    const url = `https://api.trello.com/1/cards?key=${API_KEY}&token=${TOKEN}`;

    const res = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: title,
            desc: description,
            idList: LIST_ID
        })
    });

    return res.json();
}

/**
 * Send full planner to Trello
 */
export async function sendPlannerToTrello(planner) {
    for (let day in planner) {
        const meals = planner[day];

        const description = meals.length
            ? meals.map(m => `🍽 ${m.title}`).join("\n")
            : "No meals planned";

        await createCard(
            `${day.toUpperCase()} Planner`,
            description
        );
    }
}