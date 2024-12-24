const exec = {};

document.addEventListener("DOMContentLoaded", async () => {
    const command = document.getElementById("userInput");
    const output = document.getElementById("output");

    const createNewLine = async(userInput) => {
        const exec = document.createElement("div");
        exec.className = "exec";
        output.appendChild(exec);
        const user = document.createElement("span");
        user.className = "user";
        exec.appendChild(user);
        var t = document.createElement("span");
        t.style.color = "#8AE234", t.innerHTML = "phone64bit@ubuntu";
        user.appendChild(t);
        t = document.createElement("span");
        t.style.color = "#ffffff", t.innerHTML = " :";
        user.appendChild(t);
        t = document.createElement("span");
        t.style.color = "#729FCF", t.innerHTML = " ~";
        user.appendChild(t);
        t = document.createElement("span");
        t.style.color = "#ffffff", t.innerHTML = " $";
        user.appendChild(t);
        const input = document.createElement("span");
        input.className = "userInput", input.innerHTML = ` ${userInput}`, input.style.marginLeft = "6px";
        exec.appendChild(input);
    }

    const echo = async(out, color) => {
        const display = document.createElement("p");
        display.innerHTML = out;
        display.setAttribute("style", `font-family: "Ubuntu", serif;font-weight: 500;color:${color};font-size:12px;margin-left:4px;`);
        output.appendChild(display);
    }

    command.focus();

    fetch("./command.json")
    .then((res) => res.json())
    .then((d) => {
        d.forEach(data => {
            exec[data.name] = data.des;
        })
    });

    document.addEventListener("keydown", async(e) => {
        command.removeAttribute("placeholder");
        if(e.key === "Enter") {
            const userInput = command.value.split(/\s+/);
            const cmd = userInput[0];
            const args = userInput.slice(1);
            await createNewLine(command.value);
            command.value = "";
            if(cmd != "") {
                if(cmd=="clear") {
                    output.innerHTML = "";
                } else if(exec[cmd] != undefined) {
                    await echo(exec[cmd], "#ffffff");
                } else {
                    await echo(`Command '${cmd}' not found<br>Try: help`, "#EF2929");
                }
            }
        }
    });
});