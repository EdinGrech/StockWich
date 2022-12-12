//on screen resize, set canvas dimentions
onload = () => { resizeBy(); };
window.addEventListener('resize', () => { resizeBy(); }, false);


function resizeBy(){
    const canvas = document.getElementById('sandwichCanvas');
    const div = document.getElementById('sandwichDiv');
    //console.log(window.innerWidth);
    if (window.innerWidth < 514) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerWidth;
    }
    else
    {
        canvas.width = 500;
        canvas.height = 500;
    }
};



const sandwich = new rive.Rive({
    src: 'riv/sandwich__.riv',
    canvas: document.getElementById('sandwichCanvas'),
    autoplay: true,
    animations: "assemble",
    stateMachines: "State Machine 1",
    fit: rive.Fit.cover,
    onLoad: (_) =>
    {
        const inputs = sandwich.stateMachineInputs("State Machine 1");
        //console.log(inputs); //undefined??????
        const Filling_tog = inputs.find(i => i.name === "Filling_tog");
        const Bread_tog = inputs.find(i => i.name === "Bread_tog");

        /*
            quick test to see if the inputs are working
        */
        document.getElementById('getStarted').onclick = (e) => {
            e.preventDefault();
            Filling_tog.fire();
            document.getElementById("toastFormToggler").classList.remove("hide");
            document.getElementById("toastFormToggler").classList.add("show");
        }

        document.getElementById("toastFormCloser").onclick = (e) => {
            e.preventDefault();
            Filling_tog.fire();
        }

        document.getElementById("newsletterSub").onclick = (e) => {
            e.preventDefault();
            Bread_tog.fire();
        }
    }
});


