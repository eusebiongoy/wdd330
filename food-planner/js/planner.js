export function renderPlanner() {
    const plannerGrid = document.getElementById('planner-grid');
    const days = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];

    plannerGrid.innerHTML = '';
    days.forEach(day => {
        const dayCell = document.createElement('div');
        dayCell.className = 'planner-day';
        dayCell.textContent = day;
        plannerGrid.appendChild(dayCell);
    });
}

export function renderPlanner() {
    console.log("Render weekly planner");
}