import { loadTrelloMap, saveTrelloMap } from "./storage.js";

const API_KEY = "YOUR_TRELLO_API_KEY";
const TOKEN = "YOUR_TRELLO_TOKEN";
const LIST_ID = "YOUR_LIST_ID";

let trelloMap = loadTrelloMap(); 
// format: { monday: cardId, tuesday: cardId ... }

// =====================
// CREATE CARD
// =====================
async function createCard(title, desc) {
    const res = await fetch(
        `https://api.trello.com/1/cards?key=${API_KEY}&token=${TOKEN}`,
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: title,
                desc: desc,
                idList: LIST_ID
            })
        }
    );

    return res.json();
}

// =====================
// UPDATE CARD
// =====================
async function updateCard(cardId, desc) {
    await fetch(
        `https://api.trello.com/1/cards/${cardId}?key=${API_KEY}&token=${TOKEN}`,
        {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                desc
            })
        }
    );
}

// =====================
// SMART SYNC
// =====================
export async function sendPlannerToTrello(planner) {
    for (let day in planner) {
        const meals = planner[day];

        const description = meals.length
            ? meals.map(m => `🍽 ${m.title}`).join("\n")
            : "No meals planned";

        // IF CARD EXISTS → UPDATE
        if (trelloMap[day]) {
            await updateCard(trelloMap[day], description);
        }
        // ELSE → CREATE ONCE
        else {
            const card = await createCard(
                `${day.toUpperCase()} Planner`,
                description
            );

            trelloMap[day] = card.id;
            saveTrelloMap(trelloMap);
        }
    }
}