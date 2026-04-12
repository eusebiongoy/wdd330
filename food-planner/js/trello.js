import { loadTrelloMap, saveTrelloMap } from "./storage.js";

const API_KEY = "YOUR_API_KEY";
const TOKEN = "YOUR_TOKEN";
const LIST_ID = "YOUR_LIST_ID";

let trelloMap = loadTrelloMap();

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
// FORMAT PLANNER (CLEAN OUTPUT)
// =====================
function formatPlanner(planner) {
    let text = "";

    for (let day in planner) {
        const meals = planner[day];

        text += `📅 ${day.toUpperCase()}\n`;

        if (meals.length === 0) {
            text += "- No meals planned\n\n";
        } else {
            meals.forEach(m => {
                text += `- 🍽 ${m.title}\n`;
            });
            text += "\n";
        }
    }

    return text;
}

// =====================
// SYNC TO TRELLO
// =====================
export async function sendPlannerToTrello(planner) {
    const content = formatPlanner(planner);

    // ONE CLEAN CARD INSTEAD OF MANY
    if (trelloMap["weekly"]) {
        await updateCard(trelloMap["weekly"], content);
    } else {
        const card = await createCard(
            "📊 Weekly Meal Planner",
            content
        );

        trelloMap["weekly"] = card.id;
        saveTrelloMap(trelloMap);
    }
}