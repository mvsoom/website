// Detect if the children of .container are wrapped
const containers = document.querySelectorAll('.container');

const observer = new ResizeObserver(entries => {
    entries.forEach(entry => {
        const container = entry.target;
        const children = Array.from(container.children);

        if (children.length >= 2) {
            const firstChildTop = children[0].offsetTop;
            const secondChildTop = children[1].offsetTop;

            if (firstChildTop !== secondChildTop) {
                container.classList.add('wrapped');
            } else {
                container.classList.remove('wrapped');
            }
        }
    });
});

containers.forEach(container => observer.observe(container));