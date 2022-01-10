let intro = document.querySelector(".intro");
let logo = document.querySelector(".logo-header");
let logoSpan = document.querySelectorAll(".logo");

window.addEventListener("DOMContentLoaded", ()=>{

    setTimeout(()=>{

        logoSpan.forEach((span, idx)=>{
            setTimeout(()=>{
                span.classList.add("active");
            }, (idx + 1) * 800)
        });

        setTimeout(()=>{
            logoSpan.forEach((span, idx)=>{

                setTimeout(()=>{
                    span.classList.remove("active");
                    span.classList.add("fade");
                }, (idx + 1) * 2000)
            })
        },2000)

        setTimeout(()=>{
            intro.style.top = "-110vh";
        },2300)
    })
})