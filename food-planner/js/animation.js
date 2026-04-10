export function fadeIn(element) {
    element.style.opacity = 0;
    element.style.transition = "opacity 0.3s ease";

    setTimeout(() => {
        element.style.opacity = 1;
    }, 10);
}

export function buttonClickEffect(button) {
    button.style.transform = "scale(0.95)";

    setTimeout(() => {
        button.style.transform = "scale(1)";
    }, 100);
}