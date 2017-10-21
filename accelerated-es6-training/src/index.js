const btn = document.querySelector('button');

const afn = () => console.log(this);

function fn() {
    console.log(this);
}

fn();  // Window object
afn(); // Window object

btn.addEventListener('click', fn);  // HTML button element
btn.addEventListener('click', afn); // Window object